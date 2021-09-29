import { unlinkSync } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Kendaraan } from "../entities/Kendaraan";
import { KendaraanOperational } from "../entities/KendaraanOperational";
import { isAuth } from "./../middlewares/isAuth";
import { isOperator } from "./../middlewares/isOperator";
import { uploadFile } from "./../utils/UploadFile";
import { KendaraanOperationalInput } from "./inputs/KendaraanOperationalInput";
import { KendaraanOperationalPaginateInput } from "./inputs/KendaraanOperationalPaginateInput";
import { KendaraanLoader } from "./loaders/KendaraanLoader";
import { KendaraanOperationalPaginated } from "./responses/KendaraanOperationalPaginated";
import { KendaraanOperationalResponse } from "./responses/KendaraanOperationalResponse";
import { kendaraanOperationalValidation } from "./validations/kendaraanOperatinalValidation";

@Resolver(KendaraanOperational)
export class KendaraanOperationalResolver {
  @FieldResolver(() => String)
  fileDisposisiUrl(@Root() root: KendaraanOperational) {
    return process.env.BACKEND_URL + "/static/" + root.fileDisposisi;
  }

  @FieldResolver(() => String)
  fileSuratPermohonanUrl(@Root() root: KendaraanOperational) {
    return process.env.BACKEND_URL + "/static/" + root.fileSuratPermohonan;
  }

  @FieldResolver(() => Kendaraan)
  kendaraan(@Root() root: KendaraanOperational) {
    return KendaraanLoader().load(root.kendaraanId);
  }

  @FieldResolver(() => KendaraanOperational)
  tanggalMulai(@Root() root: KendaraanOperational) {
    return new Date(root.tanggalMulai);
  }

  @FieldResolver(() => KendaraanOperational)
  tanggalSelesai(@Root() root: KendaraanOperational) {
    return new Date(root.tanggalSelesai);
  }

  @Mutation(() => KendaraanOperationalResponse)
  async createKendaraanOperational(
    @Arg("payload") payload: KendaraanOperationalInput,
    @Arg("fileFotoProfilPegawai", () => GraphQLUpload, { nullable: true })
    fileFotoProfilPegawai: FileUpload,
    @Arg("fileDisposisi", () => GraphQLUpload) fileDisposisi: FileUpload,
    @Arg("fileSuratPermohonan", () => GraphQLUpload)
    fileSuratPermohonan: FileUpload
  ): Promise<KendaraanOperationalResponse> {
    const errors = await kendaraanOperationalValidation(payload);
    if (errors) {
      return { errors };
    }

    if (fileDisposisi) {
      const { createReadStream, filename } = fileDisposisi;
      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.fileDisposisi,
        });

        if (!upload) {
          return {
            errors: [
              {
                field: "fileDisposisi",
                message: "File disposisi gagal disimpan",
              },
            ],
          };
        }
      }
    } else {
      return {
        errors: [
          {
            field: "fileDisposisi",
            message: "File disposisi tidak boleh kosong",
          },
        ],
      };
    }

    if (fileSuratPermohonan) {
      const { createReadStream, filename } = fileDisposisi;
      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.fileSuratPermohonan,
        });

        if (!upload) {
          return {
            errors: [
              {
                field: "fileSuratPermohonan",
                message: "File surat permohonan gagal disimpan",
              },
            ],
          };
        }
      }
    } else {
      return {
        errors: [
          {
            field: "fileSuratPermohonan",
            message: "File surat permohonan tidak boleh kosong",
          },
        ],
      };
    }

    if (payload.jenisPeminjam === "Pegawai") {
      if (fileFotoProfilPegawai) {
        const { createReadStream, filename } = fileFotoProfilPegawai;
        if (filename) {
          const upload = await uploadFile({
            createReadStream,
            filename: payload.fotoProfilPegawai,
          });

          if (!upload) {
            return {
              errors: [
                {
                  field: "fileFotoProfilPegawai",
                  message: "Foto profil pegawai gagal disimpan",
                },
              ],
            };
          }
        }
      }
    }
    const kendaraanOperational = await KendaraanOperational.create({
      ...payload,
    }).save();

    return { kendaraanOperational };
  }

  @Query(() => KendaraanOperationalPaginated)
  @UseMiddleware(isAuth)
  async kendaraanOperationals(
    @Arg("options") options: KendaraanOperationalPaginateInput
  ): Promise<KendaraanOperationalPaginated> {
    const realLimit = Math.min(50, options.limit);
    const offset = options.page * options.limit - options.limit;
    let params = [];
    params.push(realLimit);
    params.push(offset);

    let whereColumns = [];
    let whereColumnQuery = "";
    if (options.filter) {
      if (options.filter.columns) {
        whereColumns = options.filter.columns.map((column) => {
          if (column.operation === "LIKE") {
            params.push(`%${column.value}%`);
          } else if (column.operation === "=") {
            params.push(column.value);
          }
          return `"${column.name}" ${column.operation} $${params.length}`;
        });
        whereColumnQuery = whereColumns.join(" AND ");
      }
    }

    const data = await getConnection().query(
      `
      SELECT *
      FROM kendaraan_operational
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $1
      OFFSET $2
      `,
      params
    );

    const { total } = await getConnection()
      .getRepository(KendaraanOperational)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => KendaraanOperational, { nullable: true })
  @UseMiddleware(isAuth)
  kendaraanOperational(
    @Arg("id", () => Int) id: number
  ): Promise<KendaraanOperational | undefined> {
    return KendaraanOperational.findOne({ id });
  }

  @Mutation(() => KendaraanOperationalResponse)
  @UseMiddleware(isOperator)
  async updateKendaraanOperational(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: KendaraanOperationalInput,
    @Arg("fileFotoProfilPegawai", () => GraphQLUpload, { nullable: true })
    fileFotoProfilPegawai: FileUpload,
    @Arg("fileDisposisi", () => GraphQLUpload, { nullable: true })
    fileDisposisi: FileUpload,
    @Arg("fileSuratPermohonan", () => GraphQLUpload, { nullable: true })
    fileSuratPermohonan: FileUpload
  ): Promise<KendaraanOperationalResponse> {
    const errors = await kendaraanOperationalValidation(payload, id);
    if (errors) {
      return { errors };
    }

    if (fileDisposisi) {
      const { createReadStream, filename } = fileDisposisi;

      if (filename) {
        const upload = await uploadFile({
          createReadStream: createReadStream,
          filename: payload.fileDisposisi,
        });

        if (!upload) {
          return {
            errors: [
              {
                field: "fileDisposisi",
                message: "File disposisi gagal disimpan",
              },
            ],
          };
        }
      }
    }

    if (fileSuratPermohonan) {
      const { createReadStream, filename } = fileSuratPermohonan;

      if (filename) {
        const upload = await uploadFile({
          createReadStream: createReadStream,
          filename: payload.fileSuratPermohonan,
        });

        if (!upload) {
          return {
            errors: [
              {
                field: "fileSuratPermohonan",
                message: "File surat permohonan gagal disimpan",
              },
            ],
          };
        }
      }
    }

    if (payload.jenisPeminjam === "Pegawai") {
      if (fileFotoProfilPegawai) {
        const { createReadStream, filename } = fileFotoProfilPegawai;
        if (filename) {
          const upload = await uploadFile({
            createReadStream,
            filename: payload.fotoProfilPegawai,
          });

          if (!upload) {
            return {
              errors: [
                {
                  field: "fileFotoProfilPegawai",
                  message: "Foto profil pegawai gagal disimpan",
                },
              ],
            };
          }
        }
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(KendaraanOperational)
      .set({ ...payload })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return { kendaraanOperational: result.raw[0] };
  }

  @Mutation(() => Boolean)
  async deleteKendaraanOperational(
    @Arg("id", () => Int) id: number
  ): Promise<Boolean> {
    try {
      const kendaraanOperational = await KendaraanOperational.findOne({ id });
      await KendaraanOperational.delete({ id });
      if (kendaraanOperational) {
        unlinkSync(
          `${__dirname}/../../uploads/${kendaraanOperational.fotoProfilPegawai}`
        );
        unlinkSync(
          `${__dirname}/../../uploads/${kendaraanOperational.fileDisposisi}`
        );
        unlinkSync(
          `${__dirname}/../../uploads/${kendaraanOperational.fileSuratPermohonan}`
        );
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

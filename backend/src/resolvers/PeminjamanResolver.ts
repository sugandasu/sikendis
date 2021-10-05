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
import { MAX_TABLE_LIMIT } from "../constants";
import { Kendaraan } from "../entities/Kendaraan";
import { Peminjaman } from "../entities/Peminjaman";
import { Pengguna } from "../entities/Pengguna";
import { isAuth } from "./../middlewares/isAuth";
import { isOperator } from "./../middlewares/isOperator";
import { uploadFile } from "./../utils/UploadFile";
import { PaginatedInput } from "./inputs/PaginatedInput";
import { PeminjamanInput } from "./inputs/PeminjamanInput";
import { KendaraanLoader } from "./loaders/KendaraanLoader";
import { PenggunaLoader } from "./loaders/PenggunaLoader";
import { PeminjamanPaginated } from "./responses/PeminjamanPaginated";
import { PeminjamanResponse } from "./responses/PeminjamanResponse";
import { peminjamanValidation } from "./validations/peminjamanValidation";

@Resolver(Peminjaman)
export class PeminjamanResolver {
  @FieldResolver(() => String)
  fileDisposisiUrl(@Root() root: Peminjaman) {
    return process.env.BACKEND_URL + "/static/" + root.fileDisposisi;
  }

  @FieldResolver(() => String)
  fileSuratPermohonanUrl(@Root() root: Peminjaman) {
    return process.env.BACKEND_URL + "/static/" + root.fileSuratPermohonan;
  }

  @FieldResolver(() => Kendaraan)
  kendaraan(@Root() peminjaman: Peminjaman) {
    return KendaraanLoader().load(peminjaman.kendaraanId);
  }

  @FieldResolver(() => Pengguna)
  pengguna(@Root() peminjaman: Peminjaman) {
    return PenggunaLoader().load(peminjaman.penggunaId);
  }

  @FieldResolver(() => Peminjaman)
  tanggalMulai(@Root() peminjaman: Peminjaman) {
    return new Date(peminjaman.tanggalMulai);
  }

  @FieldResolver(() => Peminjaman)
  tanggalSelesai(@Root() peminjaman: Peminjaman) {
    return new Date(peminjaman.tanggalSelesai);
  }

  @Mutation(() => PeminjamanResponse)
  async createPeminjaman(
    @Arg("payload") payload: PeminjamanInput,
    @Arg("fileDisposisi", () => GraphQLUpload)
    { createReadStream: disposisiStream, filename: fileDisposisi }: FileUpload,
    @Arg("fileSuratPermohonan", () => GraphQLUpload)
    {
      createReadStream: permohonanStream,
      filename: fileSuratPermohonan,
    }: FileUpload
  ): Promise<PeminjamanResponse> {
    const errors = await peminjamanValidation(payload);
    if (errors) {
      return { errors };
    }

    if (fileDisposisi) {
      const upload = await uploadFile({
        createReadStream: disposisiStream,
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
      const upload = await uploadFile({
        createReadStream: permohonanStream,
        filename: payload.fileSuratPermohonan,
      });

      if (!upload) {
        return {
          errors: [
            {
              field: "fileSuratPermohonan",
              message: "File surat permohonan tidak boleh kosong",
            },
          ],
        };
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

    const peminjaman = await Peminjaman.create({ ...payload }).save();

    return { peminjaman };
  }

  @Query(() => PeminjamanPaginated)
  @UseMiddleware(isAuth)
  async peminjamans(
    @Arg("options") options: PaginatedInput
  ): Promise<PeminjamanPaginated> {
    const realLimit = Math.min(MAX_TABLE_LIMIT, options.limit);
    const offset = options.page * options.limit - options.limit;
    let params = [];
    params.push(realLimit);
    params.push(offset);
    if (options.filter) {
      params.push(options.filter);
    }

    const data = await getConnection().query(
      `
      SELECT *
      FROM peminjaman
      ${options.filter ? `` : ``}
      LIMIT $1
      OFFSET $2
      `,
      params
    );
    const { total } = await getConnection()
      .getRepository(Peminjaman)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => Peminjaman, { nullable: true })
  @UseMiddleware(isAuth)
  peminjaman(
    @Arg("id", () => Int) id: number
  ): Promise<Peminjaman | undefined> {
    return Peminjaman.findOne({ id });
  }

  @Mutation(() => PeminjamanResponse)
  @UseMiddleware(isOperator)
  async updatePeminjaman(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: PeminjamanInput,
    @Arg("fileDisposisi", () => GraphQLUpload, { nullable: true })
    fileDisposisi: FileUpload,
    @Arg("fileSuratPermohonan", () => GraphQLUpload, { nullable: true })
    fileSuratPermohonan: FileUpload
  ): Promise<PeminjamanResponse> {
    const errors = await peminjamanValidation(payload, id);
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
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Peminjaman)
      .set({ ...payload })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return { peminjaman: result.raw[0] };
  }

  @Mutation(() => Boolean)
  async deletePeminjaman(@Arg("id", () => Int) id: number): Promise<Boolean> {
    try {
      const peminjaman = await Peminjaman.findOne({ id });
      await Peminjaman.delete({ id });
      if (peminjaman) {
        unlinkSync(`${__dirname}/../../uploads/${peminjaman.fileDisposisi}`);
        unlinkSync(
          `${__dirname}/../../uploads/${peminjaman.fileSuratPermohonan}`
        );
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

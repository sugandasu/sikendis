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
import { PeminjamanOperasional } from "../entities/PeminjamanOperasional";
import { isAuth } from "../middlewares/isAuth";
import { isOperator } from "../middlewares/isOperator";
import { uploadFile } from "../utils/UploadFile";
import { PeminjamanOperasionalInput } from "./inputs/PeminjamanOperasionalInput";
import { PeminjamanOperasionalPaginate } from "./inputs/PeminjamanOperasionalPaginate";
import { KendaraanLoader } from "./loaders/KendaraanLoader";
import { PeminjamanOperasionalPaginated } from "./responses/PeminjamanOperasionalPaginated";
import { PeminjamanOperasionalResponse } from "./responses/PeminjamanOperasionalResponse";
import { peminjamanOperasionalValidation } from "./validations/peminjamanOperasionalValidation";

@Resolver(PeminjamanOperasional)
export class PeminjamanOperasionalResolver {
  @FieldResolver(() => String)
  fileSuratDisposisiUrl(@Root() root: PeminjamanOperasional) {
    return root.fileSuratDisposisi
      ? process.env.BACKEND_URL + "/static/" + root.fileSuratDisposisi
      : "";
  }

  @FieldResolver(() => String)
  fileSuratPermohonanUrl(@Root() root: PeminjamanOperasional) {
    return root.fileSuratPermohonan
      ? process.env.BACKEND_URL + "/static/" + root.fileSuratPermohonan
      : "";
  }

  @FieldResolver(() => Kendaraan)
  kendaraan(@Root() root: PeminjamanOperasional) {
    return KendaraanLoader().load(root.kendaraanId);
  }

  @FieldResolver(() => Date)
  tanggalMulai(@Root() root: PeminjamanOperasional) {
    return new Date(root.tanggalMulai);
  }

  @FieldResolver(() => Date)
  tanggalSelesai(@Root() root: PeminjamanOperasional) {
    return new Date(root.tanggalSelesai);
  }

  @Mutation(() => PeminjamanOperasionalResponse)
  async createPeminjamanOperasional(
    @Arg("payload") payload: PeminjamanOperasionalInput,
    @Arg("fileSuratDisposisi", () => GraphQLUpload, { nullable: true })
    fileSuratDisposisi: FileUpload,
    @Arg("fileSuratPermohonan", () => GraphQLUpload, { nullable: true })
    fileSuratPermohonan: FileUpload
  ): Promise<PeminjamanOperasionalResponse> {
    const errors = await peminjamanOperasionalValidation(payload);
    if (errors) {
      return { errors };
    }

    if (fileSuratDisposisi) {
      const { createReadStream, filename } = fileSuratDisposisi;
      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.fileSuratDisposisi,
        });

        if (!upload) {
          return {
            errors: [
              {
                field: "fileSuratDisposisi",
                message: "File surat disposisi gagal disimpan",
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
    }

    const peminjamanOperasional = await PeminjamanOperasional.create({
      ...payload,
    }).save();

    return { peminjamanOperasional };
  }

  @Query(() => PeminjamanOperasionalPaginated)
  @UseMiddleware(isAuth)
  async peminjamanOperasionals(
    @Arg("options") options: PeminjamanOperasionalPaginate
  ): Promise<PeminjamanOperasionalPaginated> {
    const realLimit = Math.min(MAX_TABLE_LIMIT, options.limit);
    const offset = options.page * options.limit - options.limit;

    let params: any = [];

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

    if (realLimit === 0) {
      const data = await getConnection().query(
        `
      SELECT *
      FROM peminjaman_operasional
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      `,
        params
      );

      const { total } = await getConnection()
        .getRepository(PeminjamanOperasional)
        .createQueryBuilder()
        .select("COUNT(id)", "total")
        .getRawOne();

      return { data, total, ...options };
    }

    params.push(realLimit);
    params.push(offset);

    const data = await getConnection().query(
      `
      SELECT *
      FROM peminjaman_operasional
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $${params.length - 1}
      OFFSET $${params.length}
      `,
      params
    );

    const { total } = await getConnection()
      .getRepository(PeminjamanOperasional)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => PeminjamanOperasional, { nullable: true })
  @UseMiddleware(isAuth)
  peminjamanOperasional(
    @Arg("id", () => Int) id: number
  ): Promise<PeminjamanOperasional | undefined> {
    return PeminjamanOperasional.findOne({ id });
  }

  @Mutation(() => PeminjamanOperasionalResponse)
  @UseMiddleware(isOperator)
  async updatePeminjamanOperasional(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: PeminjamanOperasionalInput,
    @Arg("fileSuratDisposisi", () => GraphQLUpload, { nullable: true })
    fileSuratDisposisi: FileUpload,
    @Arg("fileSuratPermohonan", () => GraphQLUpload, { nullable: true })
    fileSuratPermohonan: FileUpload
  ): Promise<PeminjamanOperasionalResponse> {
    const errors = await peminjamanOperasionalValidation(payload);
    if (errors) {
      return { errors };
    }

    if (fileSuratDisposisi) {
      const { createReadStream, filename } = fileSuratDisposisi;

      if (filename) {
        const upload = await uploadFile({
          createReadStream: createReadStream,
          filename: payload.fileSuratDisposisi,
        });

        if (!upload) {
          return {
            errors: [
              {
                field: "fileSuratDisposisi",
                message: "File surat disposisi gagal disimpan",
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

    const result = await getConnection()
      .createQueryBuilder()
      .update(PeminjamanOperasional)
      .set({ ...payload })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return { peminjamanOperasional: result.raw[0] };
  }

  @Mutation(() => Boolean)
  async deletePeminjamanOperasional(
    @Arg("id", () => Int) id: number
  ): Promise<Boolean> {
    try {
      const peminjamanOperasional = await PeminjamanOperasional.findOne({ id });
      await PeminjamanOperasional.delete({ id });
      if (peminjamanOperasional) {
        unlinkSync(
          `${__dirname}/../../uploads/${peminjamanOperasional.fileSuratDisposisi}`
        );
        unlinkSync(
          `${__dirname}/../../uploads/${peminjamanOperasional.fileSuratPermohonan}`
        );
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

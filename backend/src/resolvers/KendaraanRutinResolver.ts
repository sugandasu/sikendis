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
import { isAuth } from "../middlewares/isAuth";
import { isOperator } from "../middlewares/isOperator";
import { Kendaraan } from "./../entities/Kendaraan";
import { KendaraanRutin } from "./../entities/KendaraanRutin";
import { Pengguna } from "./../entities/Pengguna";
import { uploadFile } from "./../utils/UploadFile";
import { KendaraanRutinInput } from "./inputs/KendaraanRutinInput";
import { KendaraanRutinPaginateInput } from "./inputs/KendaraanRutinPaginateInput";
import { KendaraanLoader } from "./loaders/KendaraanLoader";
import { PenggunaLoader } from "./loaders/PenggunaLoader";
import { KendaraanRutinPaginated } from "./responses/KendaraanRutinPaginated";
import { KendaraanRutinResponse } from "./responses/KendaraanRutinResponse";
import { kendaraanRutinValidation } from "./validations/kendaraanRutinValidation";

@Resolver(KendaraanRutin)
export class KendaraanRutinResolver {
  @FieldResolver(() => String)
  fileBapUrl(@Root() root: KendaraanRutin) {
    return process.env.BACKEND_URL + "/static/" + root.fileBap;
  }

  @FieldResolver(() => Kendaraan)
  kendaraan(@Root() root: KendaraanRutin) {
    return KendaraanLoader().load(root.kendaraanId);
  }

  @FieldResolver(() => Pengguna)
  pengguna(@Root() root: KendaraanRutin) {
    return PenggunaLoader().load(root.penggunaId);
  }

  @FieldResolver(() => KendaraanRutin)
  tanggalBap(@Root() root: KendaraanRutin) {
    return new Date(root.tanggalBap);
  }

  @Mutation(() => KendaraanRutinResponse)
  @UseMiddleware(isOperator)
  async createKendaraanRutin(
    @Arg("payload") payload: KendaraanRutinInput,
    @Arg("fileBap", () => GraphQLUpload, { nullable: true }) fileBap: FileUpload
  ): Promise<KendaraanRutinResponse> {
    const errors = await kendaraanRutinValidation(payload);
    if (errors) {
      return { errors };
    }

    if (fileBap) {
      const { createReadStream, filename } = fileBap;
      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.fileBap,
        });

        if (!upload) {
          return {
            errors: [{ field: "fileBap", message: "File BAP gagal disimpan" }],
          };
        }
      }
    } else {
      return {
        errors: [{ field: "fileBap", message: "File BAP tidak boleh kosong" }],
      };
    }

    const kendaraanRutin = await KendaraanRutin.create({ ...payload }).save();

    return { kendaraanRutin };
  }

  @Query(() => KendaraanRutinPaginated)
  @UseMiddleware(isAuth)
  async kendaraanRutins(
    @Arg("options") options: KendaraanRutinPaginateInput
  ): Promise<KendaraanRutinPaginated> {
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
      FROM kendaraan_rutin
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $1
      OFFSET $2
      `,
      params
    );

    const { total } = await getConnection()
      .getRepository(KendaraanRutin)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => KendaraanRutin, { nullable: true })
  @UseMiddleware(isAuth)
  kendaraanRutin(
    @Arg("id", () => Int) id: number
  ): Promise<KendaraanRutin | undefined> {
    return KendaraanRutin.findOne({ id });
  }

  @Mutation(() => KendaraanRutinResponse)
  @UseMiddleware(isOperator)
  async updateKendaraanRutin(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: KendaraanRutinInput,
    @Arg("fileBap", () => GraphQLUpload, { nullable: true })
    fileBap: FileUpload | null
  ): Promise<KendaraanRutinResponse> {
    const errors = await kendaraanRutinValidation(payload);
    if (errors) {
      return { errors };
    }

    const kendaraanRutin = await KendaraanRutin.findOne({ id });
    if (!kendaraanRutin) {
      return {
        errors: [
          {
            field: "id",
            message: "Kendaraan Rutin tidak ditemukan",
          },
        ],
      };
    }

    if (fileBap) {
      const { createReadStream, filename } = fileBap;
      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.fileBap,
        });

        if (upload) {
          unlinkSync(`${__dirname}/../../uploads/${kendaraanRutin.fileBap}`);
        } else {
          return {
            errors: [{ field: "fileBap", message: "File BAP gagal disimpan" }],
          };
        }
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(KendaraanRutin)
      .set({ ...payload })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return { kendaraanRutin: result.raw[0] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isOperator)
  async deleteKendaraanRutin(
    @Arg("id", () => Int) id: number
  ): Promise<Boolean> {
    try {
      const kendaraanRutin = await KendaraanRutin.findOne({ id });
      await KendaraanRutin.delete({ id });
      if (kendaraanRutin) {
        unlinkSync(`${__dirname}/../../uploads/${kendaraanRutin.fileBap}`);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

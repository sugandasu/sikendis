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
import { MAX_TABLE_LIMIT } from "./../constants";
import { Kendaraan } from "./../entities/Kendaraan";
import { Pengguna } from "./../entities/Pengguna";
import { PenggunaRutin } from "./../entities/PenggunaRutin";
import { uploadFile } from "./../utils/UploadFile";
import { PenggunaRutinInput } from "./inputs/PenggunaRutinInput";
import { PenggunaRutinPaginate } from "./inputs/PenggunaRutinPaginate";
import { KendaraanLoader } from "./loaders/KendaraanLoader";
import { PenggunaLoader } from "./loaders/PenggunaLoader";
import { PenggunaRutinPaginated } from "./responses/PenggunaRutinPaginated";
import { PenggunaRutinResponse } from "./responses/PenggunaRutinResponse";
import { penggunaRutinValidation } from "./validations/penggunaRutinValidation";

@Resolver(PenggunaRutin)
export class PenggunaRutinResolver {
  @FieldResolver(() => String)
  fileBapUrl(@Root() root: PenggunaRutin) {
    return process.env.BACKEND_URL + "/static/" + root.fileBap;
  }

  @FieldResolver(() => Kendaraan)
  kendaraan(@Root() root: PenggunaRutin) {
    return KendaraanLoader().load(root.kendaraanId);
  }

  @FieldResolver(() => Pengguna)
  pengguna(@Root() root: PenggunaRutin) {
    return PenggunaLoader().load(root.penggunaId);
  }

  @FieldResolver(() => PenggunaRutin)
  tanggalBap(@Root() root: PenggunaRutin) {
    return new Date(root.tanggalBap);
  }

  @Mutation(() => PenggunaRutinResponse)
  @UseMiddleware(isOperator)
  async createPenggunaRutin(
    @Arg("payload") payload: PenggunaRutinInput,
    @Arg("fileBap", () => GraphQLUpload, { nullable: true }) fileBap: FileUpload
  ): Promise<PenggunaRutinResponse> {
    const errors = await penggunaRutinValidation(payload);
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

    const penggunaRutin = await PenggunaRutin.create({ ...payload }).save();

    return { penggunaRutin };
  }

  @Query(() => PenggunaRutinPaginated)
  @UseMiddleware(isAuth)
  async penggunaRutins(
    @Arg("options") options: PenggunaRutinPaginate
  ): Promise<PenggunaRutinPaginated> {
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
      FROM pengguna_rutin
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      `,
        params
      );

      const { total } = await getConnection()
        .getRepository(PenggunaRutin)
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
      FROM pengguna_rutin
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $1
      OFFSET $2
      `,
      params
    );

    const { total } = await getConnection()
      .getRepository(PenggunaRutin)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => PenggunaRutin, { nullable: true })
  @UseMiddleware(isAuth)
  penggunaRutin(
    @Arg("id", () => Int) id: number
  ): Promise<PenggunaRutin | undefined> {
    return PenggunaRutin.findOne({ id });
  }

  @Mutation(() => PenggunaRutinResponse)
  @UseMiddleware(isOperator)
  async updatePenggunaRutin(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: PenggunaRutinInput,
    @Arg("fileBap", () => GraphQLUpload, { nullable: true })
    fileBap: FileUpload | null
  ): Promise<PenggunaRutinResponse> {
    const errors = await penggunaRutinValidation(payload);
    if (errors) {
      return { errors };
    }

    const penggunaRutin = await PenggunaRutin.findOne({ id });
    if (!penggunaRutin) {
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
          unlinkSync(`${__dirname}/../../uploads/${penggunaRutin.fileBap}`);
        } else {
          return {
            errors: [{ field: "fileBap", message: "File BAP gagal disimpan" }],
          };
        }
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(PenggunaRutin)
      .set({ ...payload })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return { penggunaRutin: result.raw[0] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isOperator)
  async deletePenggunaRutin(
    @Arg("id", () => Int) id: number
  ): Promise<Boolean> {
    try {
      const penggunaRutin = await PenggunaRutin.findOne({ id });
      await PenggunaRutin.delete({ id });
      if (penggunaRutin) {
        unlinkSync(`${__dirname}/../../uploads/${penggunaRutin.fileBap}`);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

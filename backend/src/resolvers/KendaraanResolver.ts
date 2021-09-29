import { SearchByInput } from "./inputs/SearchByInput";
import { isAuth } from "./../middlewares/isAuth";
import { getConnection } from "typeorm";
import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isOperator } from "../middlewares/isOperator";
import { Kendaraan } from "./../entities/Kendaraan";
import { KendaraanInput } from "./inputs/KendaraanInput";
import { KendaraanResponse } from "./responses/KendaraanResponse";
import { kendaraanValidation } from "./validations/kendaraanValidation";
import { KendaraanPaginated } from "./responses/KendaraanPaginated";
import { KendaraanPaginateInput } from "./inputs/KendaraanPaginateInput";

@Resolver(Kendaraan)
export class KendaraanResolver {
  @Mutation(() => KendaraanResponse)
  @UseMiddleware(isOperator)
  async createKendaraan(
    @Arg("payload") payload: KendaraanInput
  ): Promise<KendaraanResponse> {
    const errors = await kendaraanValidation(payload);
    if (errors) {
      return { errors };
    }
    const kendaraan = await Kendaraan.create({ ...payload }).save();
    return { kendaraan };
  }

  @Query(() => KendaraanPaginated)
  @UseMiddleware(isAuth)
  async kendaraans(
    @Arg("options") options: KendaraanPaginateInput
  ): Promise<KendaraanPaginated> {
    const realLimit = Math.min(10, options.limit);
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
      FROM kendaraan
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $1
      OFFSET $2
      `,
      params
    );

    const { total } = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => Kendaraan, { nullable: true })
  @UseMiddleware(isAuth)
  kendaraan(@Arg("id", () => Int) id: number): Promise<Kendaraan | undefined> {
    return Kendaraan.findOne({ id });
  }

  @Mutation(() => KendaraanResponse)
  @UseMiddleware(isOperator)
  async updateKendaraan(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: KendaraanInput
  ): Promise<KendaraanResponse> {
    const errors = await kendaraanValidation(payload, id);
    if (errors) {
      return { errors };
    }

    const kendaraan = Kendaraan.findOne({ id });
    if (!kendaraan) {
      return {
        errors: [
          {
            field: "id",
            message: "Kendaraan tidak ditemukan",
          },
        ],
      };
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Kendaraan)
      .set({ ...payload })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return { kendaraan: result.raw[0] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isOperator)
  async deleteKendaraan(@Arg("id", () => Int) id: number): Promise<Boolean> {
    try {
      await Kendaraan.delete({ id });
      return true;
    } catch (error) {
      return false;
    }
  }

  @Query(() => [Kendaraan], { nullable: true })
  @UseMiddleware(isAuth)
  async kendaraansSearchBy(
    @Arg("options") options: SearchByInput
  ): Promise<Kendaraan | undefined> {
    const params = ["%" + options.value + "%", options.limit];
    const data = await getConnection().query(
      `
      SELECT *
      FROM kendaraan
      WHERE "${options.column}" LIKE $1
      LIMIT $2
      `,
      params
    );
    return data;
  }
}

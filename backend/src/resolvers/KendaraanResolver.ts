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
import { KendaraanPaginated } from "./responses/KendaraanPaginates";
import { PaginatedInput } from "./inputs/PaginatedInput";

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
    @Arg("options") options: PaginatedInput
  ): Promise<KendaraanPaginated> {
    const realLimit = Math.min(10, options.limit);
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
      FROM kendaraan
      ${
        options.filter
          ? `
      WHERE
      "tipeRoda" = $3 OR 
      kode = $3 OR 
      nama = $3 OR 
      "nomorRegister" = $3 OR
      merek = $3 OR 
      "ukuranCc" = $3 OR 
      bahan = $3 OR
      "tahunPembelian" = $3 OR
      "nomorRangka" = $3 OR
      "nomorMesin" = $3 OR
      "nomorPolisi" = $3 OR
      "nomorBpkb" = $3 OR
      "asalUsul" = $3 OR
      harga = $3 OR
      keterangan = $3
      `
          : ``
      }
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
  async kendaraanSearchBy(
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

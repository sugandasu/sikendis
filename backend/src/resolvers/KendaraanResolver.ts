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
    @Arg("limit", () => Int) limit: number
  ): Promise<KendaraanPaginated> {
    const kendaraans = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder()
      .limit(limit)
      .getMany();
    const { jumlah } = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder()
      .select("COUNT(id)", "jumlah")
      .getRawOne();
    return { kendaraans, jumlah };
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
}

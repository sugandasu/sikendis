import { isOperator } from "./../middlewares/isOperator";
import { isAuth } from "./../middlewares/isAuth";
import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Pengguna } from "../entities/Pengguna";
import { PenggunaInput } from "./inputs/PenggunaInput";
import { PenggunaPaginated } from "./responses/PenggunaPaginated";
import { PenggunaResponse } from "./responses/PenggunaResponse";
import { penggunaValidation } from "./validations/penggunaValidation";

@Resolver(Pengguna)
export class PenggunaResolver {
  @Mutation(() => PenggunaResponse)
  @UseMiddleware(isOperator)
  async createPengguna(
    @Arg("payload") payload: PenggunaInput
  ): Promise<PenggunaResponse> {
    const errors = await penggunaValidation(payload);
    if (errors) {
      return { errors };
    }
    const pengguna = await Pengguna.create({ ...payload }).save();
    return { pengguna };
  }

  @Query(() => PenggunaPaginated)
  @UseMiddleware(isAuth)
  async penggunas(
    @Arg("limit", () => Int) limit: number
  ): Promise<PenggunaPaginated> {
    const penggunas = await getConnection()
      .getRepository(Pengguna)
      .createQueryBuilder()
      .limit(limit)
      .getMany();
    const { jumlah } = await getConnection()
      .getRepository(Pengguna)
      .createQueryBuilder()
      .select("COUNT(id)", "jumlah")
      .getRawOne();
    return { penggunas, jumlah };
  }
}

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
import { PaginatedInput } from "./inputs/PaginatedInput";

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
    @Arg("options") options: PaginatedInput
  ): Promise<PenggunaPaginated> {
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
      FROM pengguna
      ${
        options.filter
          ? `
      WHERE
      nama = $3 OR 
      nip = $3 OR 
      jabatan = $3 OR 
      instansi = $3 OR
      "subBagian" = $3
      `
          : ``
      }
      LIMIT $1
      OFFSET $2
      `,
      params
    );
    const { total } = await getConnection()
      .getRepository(Pengguna)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => Pengguna, { nullable: true })
  @UseMiddleware(isAuth)
  pengguna(@Arg("id", () => Int) id: number): Promise<Pengguna | undefined> {
    return Pengguna.findOne({ id });
  }

  @Mutation(() => PenggunaResponse)
  @UseMiddleware(isOperator)
  async updatePengguna(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: PenggunaInput
  ): Promise<PenggunaResponse> {
    const errors = await penggunaValidation(payload, id);
    if (errors) {
      return { errors };
    }

    const pengguna = Pengguna.findOne({ id });
    if (!pengguna) {
      return {
        errors: [
          {
            field: "id",
            message: "Pengguna tidak ditemukan",
          },
        ],
      };
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Pengguna)
      .set({ ...payload })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return { pengguna: result.raw[0] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isOperator)
  async deletePengguna(@Arg("id", () => Int) id: number): Promise<Boolean> {
    try {
      await Pengguna.delete({ id });
      return true;
    } catch (error) {
      return false;
    }
  }
}

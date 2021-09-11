import { Arg, Mutation, Resolver } from "type-graphql";
import { Pengguna } from "../entities/Pengguna";
import { PenggunaInput } from "./inputs/PenggunaInput";
import { PenggunaResponse } from "./responses/PenggunaResponse";
import { penggunaValidation } from "./validations/penggunaValidation";

@Resolver(Pengguna)
export class PenggunaResolver {
  @Mutation(() => PenggunaResponse)
  async createPengguna(
    @Arg("payload")
    payload: PenggunaInput
  ): Promise<PenggunaResponse> {
    const errors = await penggunaValidation(payload);
    if (errors) {
      return { errors };
    }
    const pengguna = await Pengguna.create({ ...payload }).save();
    return { pengguna };
  }
}

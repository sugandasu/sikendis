import { Field, InputType } from "type-graphql";
import { TipeKendaraan, TipeRoda } from "./../../entities/Kendaraan";

@InputType()
export class KendaraanImport {
  @Field()
  tipeKendaraan: TipeKendaraan;

  @Field()
  tipeRoda: TipeRoda;

  @Field()
  fileImport: string;
}

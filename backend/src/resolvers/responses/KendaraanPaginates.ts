import { Kendaraan } from "./../../entities/Kendaraan";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class KendaraanPaginated {
  @Field(() => [Kendaraan])
  kendaraans: Kendaraan[];

  @Field(() => Int)
  jumlah: number;
}

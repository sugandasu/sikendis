import { Pengguna } from "../../entities/Pengguna";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class PenggunaPaginated {
  @Field(() => [Pengguna])
  penggunas: Pengguna[];

  @Field(() => Int)
  jumlah: number;
}

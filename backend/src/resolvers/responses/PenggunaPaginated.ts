import { Pengguna } from "../../entities/Pengguna";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class PenggunaPaginated {
  @Field(() => [Pengguna])
  data: Pengguna[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => String, { nullable: true })
  filter?: string | null;
}

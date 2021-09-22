import { ObjectType, Field, Int } from "type-graphql";
import { Peminjaman } from "src/entities/Peminjaman";

@ObjectType()
export class PeminjamanPaginated {
  @Field(() => [Peminjaman])
  data: Peminjaman[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => String, { nullable: true })
  filter?: string | null;
}

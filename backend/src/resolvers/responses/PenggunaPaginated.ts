import { GraphQLJSONObject } from "graphql-type-json";
import { Field, Int, ObjectType } from "type-graphql";
import { Pengguna } from "../../entities/Pengguna";

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

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: object | null;
}

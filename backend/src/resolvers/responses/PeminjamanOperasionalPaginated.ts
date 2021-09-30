import { GraphQLJSONObject } from "graphql-type-json";
import { PeminjamanOperasional } from "../../entities/PeminjamanOperasional";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class PeminjamanOperasionalPaginated {
  @Field(() => [PeminjamanOperasional])
  data: PeminjamanOperasional[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: object | null;
}

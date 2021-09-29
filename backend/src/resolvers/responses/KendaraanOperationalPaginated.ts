import { GraphQLJSONObject } from "graphql-type-json";
import { KendaraanOperational } from "../../entities/KendaraanOperational";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class KendaraanOperationalPaginated {
  @Field(() => [KendaraanOperational])
  data: KendaraanOperational[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: object | null;
}

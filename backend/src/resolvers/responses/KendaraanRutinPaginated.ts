import { GraphQLJSONObject } from "graphql-type-json";
import { Field, Int, ObjectType } from "type-graphql";
import { KendaraanRutin } from "./../../entities/KendaraanRutin";

@ObjectType()
export class KendaraanRutinPaginated {
  @Field(() => [KendaraanRutin])
  data: KendaraanRutin[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: object | null;
}

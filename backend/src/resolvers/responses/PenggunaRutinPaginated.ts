import { GraphQLJSONObject } from "graphql-type-json";
import { Field, Int, ObjectType } from "type-graphql";
import { PenggunaRutin } from "./../../entities/PenggunaRutin";

@ObjectType()
export class PenggunaRutinPaginated {
  @Field(() => [PenggunaRutin])
  data: PenggunaRutin[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: object | null;
}

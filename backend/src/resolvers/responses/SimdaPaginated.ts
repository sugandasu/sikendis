import { GraphQLJSONObject } from "graphql-type-json";
import { Simda } from "../../entities/Simda";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class SimdaPaginated {
  @Field(() => [Simda])
  data: Simda[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: object | null;
}

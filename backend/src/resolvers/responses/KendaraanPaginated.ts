import { GraphQLJSONObject } from "graphql-type-json";
import { Kendaraan } from "../../entities/Kendaraan";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class KendaraanPaginated {
  @Field(() => [Kendaraan])
  data: Kendaraan[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: object | null;
}

import { Field, InputType, Int } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";

export interface KendaraanRutinPaginateInputFilter {
  all?: string;
  columns?: [
    {
      name?: string;
      value?: string;
      operation?: string;
    }
  ];
}

@InputType()
export class KendaraanRutinPaginateInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: KendaraanRutinPaginateInputFilter | null;
}

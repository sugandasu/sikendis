import { Field, InputType, Int } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";

export interface KendaraanPaginateInputFilter {
  all?: string;
  columns?: [
    {
      name?: string;
      value?: string;
    }
  ];
}

@InputType()
export class KendaraanPaginateInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: KendaraanPaginateInputFilter | null;
}

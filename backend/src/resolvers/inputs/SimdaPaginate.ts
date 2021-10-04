import { GraphQLJSONObject } from "graphql-type-json";
import { Field, InputType, Int } from "type-graphql";

export interface SimdaPaginateFilter {
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
export class SimdaPaginate {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: SimdaPaginateFilter | null;
}

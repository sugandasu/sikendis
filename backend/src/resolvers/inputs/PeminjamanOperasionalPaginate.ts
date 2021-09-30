import { Field, InputType, Int } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";

export interface PeminjamanOperasionalPaginateFilter {
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
export class PeminjamanOperasionalPaginate {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  filter?: PeminjamanOperasionalPaginateFilter | null;
}

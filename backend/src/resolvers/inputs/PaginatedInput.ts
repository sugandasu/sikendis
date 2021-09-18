import { Field, InputType, Int } from "type-graphql";
@InputType()
export class PaginatedInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;

  @Field(() => String, { nullable: true })
  filter?: string | null;
}

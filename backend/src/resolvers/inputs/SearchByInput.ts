import { Field, InputType, Int } from "type-graphql";
@InputType()
export class SearchByInput {
  @Field(() => Int)
  limit: number;

  @Field()
  column: string;

  @Field(() => String, { nullable: true })
  value: string | null;
}

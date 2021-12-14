import { InputType, Field } from "type-graphql";

@InputType()
export class AkunInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password?: string;
}

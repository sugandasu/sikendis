import { User } from "../../entities/User";
import { FieldError } from "../../utils/FieldError";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

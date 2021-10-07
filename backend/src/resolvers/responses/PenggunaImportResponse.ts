import { Field, Int, ObjectType } from "type-graphql";
import { FieldError } from "../../utils/FieldError";

@ObjectType()
export class PenggunaImportResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Int, { nullable: true })
  rowCount?: number;
}

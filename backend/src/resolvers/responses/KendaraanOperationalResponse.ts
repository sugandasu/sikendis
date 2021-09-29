import { KendaraanOperational } from "src/entities/KendaraanOperational";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../utils/FieldError";

@ObjectType()
export class KendaraanOperationalResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => KendaraanOperational, { nullable: true })
  kendaraanOperational?: KendaraanOperational;
}

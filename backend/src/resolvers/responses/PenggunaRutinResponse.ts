import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../utils/FieldError";
import { PenggunaRutin } from "./../../entities/PenggunaRutin";

@ObjectType()
export class PenggunaRutinResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => PenggunaRutin, { nullable: true })
  penggunaRutin?: PenggunaRutin;
}

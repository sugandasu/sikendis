import { KendaraanRutin } from "./../../entities/KendaraanRutin";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../utils/FieldError";

@ObjectType()
export class KendaraanRutinResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => KendaraanRutin, { nullable: true })
  kendaraanRutin?: KendaraanRutin;
}

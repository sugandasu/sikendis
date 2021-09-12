import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../utils/FieldError";
import { Kendaraan } from "./../../entities/Kendaraan";

@ObjectType()
export class KendaraanResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Kendaraan, { nullable: true })
  kendaraan?: Kendaraan;
}

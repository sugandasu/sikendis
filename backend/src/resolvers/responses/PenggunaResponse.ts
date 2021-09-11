import { Field, ObjectType } from "type-graphql";
import { Pengguna } from "../../entities/Pengguna";
import { FieldError } from "../../utils/FieldError";

@ObjectType()
export class PenggunaResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Pengguna, { nullable: true })
  pengguna?: Pengguna;
}

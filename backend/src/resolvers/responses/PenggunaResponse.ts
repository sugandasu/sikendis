import { User } from "../../entities/User";
import { FieldError } from "../../utils/FieldError";
import { ObjectType, Field } from "type-graphql";
import { Pengguna } from "../../entities/Pengguna";

@ObjectType()
export class PenggunaResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Pengguna, { nullable: true })
  pengguna?: Pengguna;
}

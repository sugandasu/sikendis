import { Peminjaman } from "../../entities/Peminjaman";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../utils/FieldError";

@ObjectType()
export class PeminjamanResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Peminjaman, { nullable: true })
  peminjaman?: Peminjaman;
}

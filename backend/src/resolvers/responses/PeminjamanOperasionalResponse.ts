import { PeminjamanOperasional } from "../../entities/PeminjamanOperasional";
import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../utils/FieldError";

@ObjectType()
export class PeminjamanOperasionalResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => PeminjamanOperasional, { nullable: true })
  peminjamanOperasional?: PeminjamanOperasional;
}

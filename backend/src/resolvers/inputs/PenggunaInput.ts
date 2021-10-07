import { Field, InputType } from "type-graphql";
@InputType()
export class PenggunaInput {
  @Field()
  nip: string;

  @Field()
  nama: string;

  @Field()
  jabatan: string;

  @Field()
  instansi: string;

  @Field()
  subBagian: string;

  @Field(() => String, { nullable: true })
  fotoProfil?: string | null;
}

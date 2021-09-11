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
  subBagian: string;

  // Change to file later
  @Field()
  fotoProfil: string;
}

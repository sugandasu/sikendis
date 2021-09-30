import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PenggunaRutinInput {
  @Field(() => Int)
  kendaraanId: number;

  @Field(() => Int)
  penggunaId: number;

  @Field()
  nomorBap: string;

  @Field()
  fileBap: string;

  @Field()
  tanggalBap: Date;

  @Field(() => String, { nullable: true })
  keterangan: string | null;
}

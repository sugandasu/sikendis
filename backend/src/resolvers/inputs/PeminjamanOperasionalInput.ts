import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PeminjamanOperasionalInput {
  @Field(() => Int)
  kendaraanId!: number;

  @Field()
  instansi!: string;

  @Field()
  penanggungJawab!: string;

  @Field(() => String, { nullable: true })
  nomorSuratDisposisi: string | null;

  @Field(() => String, { nullable: true })
  fileSuratDisposisi: string | null;

  @Field(() => String, { nullable: true })
  nomorSuratPermohonan: string | null;

  @Field(() => String, { nullable: true })
  fileSuratPermohonan: string | null;

  @Field(() => Date)
  tanggalMulai!: Date;

  @Field(() => Date)
  tanggalSelesai!: Date;

  @Field()
  nomorTelepon!: string;
}

import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PeminjamanInput {
  @Field(() => Int)
  kendaraanId: number;

  @Field(() => Int)
  penggunaId: number;

  @Field()
  nomorDisposisi: string;

  @Field()
  fileDisposisi: string;

  @Field()
  nomorSuratPermohonan: string;

  @Field()
  fileSuratPermohonan: string;

  @Field()
  tanggalMulai: Date;

  @Field()
  tanggalSelesai: Date;

  @Field()
  nomorHpSupir: string;

  @Field(() => String, { nullable: true })
  keterangan: string | null;
}

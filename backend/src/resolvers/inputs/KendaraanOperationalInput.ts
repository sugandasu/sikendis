import { Field, InputType, Int } from "type-graphql";

@InputType()
export class KendaraanOperationalInput {
  @Field(() => Int)
  kendaraanId: number;

  @Field()
  jenisPeminjam!: string; // Dinas atau Pegawai

  @Field(() => String, { nullable: true })
  namaDinas: string | null;

  @Field(() => String, { nullable: true })
  nipPegawai: string | null;

  @Field(() => String, { nullable: true })
  namaPegawai: string | null;

  @Field(() => String, { nullable: true })
  jabatanPegawai: string | null;

  @Field(() => String, { nullable: true })
  instansiPegawai: string | null;

  @Field(() => String, { nullable: true })
  subBagianPegawai: string | null;

  @Field(() => String, { nullable: true })
  fotoProfilPegawai: string | null;

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
}

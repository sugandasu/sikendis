import { Field, InputType } from "type-graphql";

@InputType()
export class KendaraanInput {
  @Field()
  tipeRoda: string;

  @Field()
  kode: string;

  @Field()
  nama: string;

  // Roda 2
  @Field(() => String, { nullable: true })
  nomorRegister: string | null;

  @Field()
  merek: string;

  @Field()
  ukuranCc: string;

  @Field()
  bahan: string;

  @Field()
  tahunPembelian: string;

  @Field()
  nomorRangka: string;

  @Field()
  nomorMesin: string;

  @Field()
  nomorPolisi: string;

  @Field()
  nomorBpkb: string;

  @Field()
  asalUsul: string;

  @Field()
  harga: string;

  @Field(() => String, { nullable: true })
  keterangan: string | null;
}

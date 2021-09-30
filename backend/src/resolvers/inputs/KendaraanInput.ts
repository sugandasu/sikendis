import {
  TipeAsalUsul,
  TipeBahanBakar,
  TipeKendaraan,
  TipeRoda,
} from "./../../entities/Kendaraan";
import { Field, InputType } from "type-graphql";

@InputType()
export class KendaraanInput {
  @Field()
  tipeKendaraan: TipeKendaraan;

  @Field()
  tipeRoda: TipeRoda;

  @Field()
  kode: string;

  @Field()
  nama: string;

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

  @Field(() => String, { nullable: true })
  nomorBpkb: string | null;

  @Field()
  asalUsul: TipeAsalUsul;

  @Field()
  warna: string;

  @Field()
  bahanBakar: TipeBahanBakar;

  @Field()
  harga: string;

  @Field(() => String, { nullable: true })
  foto: string | null;

  @Field(() => String, { nullable: true })
  keterangan: string | null;
}

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
  nomorRegister?: string;

  @Field()
  merek: string;

  @Field(() => String, { nullable: true })
  ukuranCc?: string;

  @Field(() => String, { nullable: true })
  bahan?: string;

  @Field()
  tahunPembelian: string;

  @Field()
  nomorRangka: string;

  @Field()
  nomorMesin: string;

  @Field(() => String, { nullable: true })
  nomorPolisi?: string;

  @Field(() => String, { nullable: true })
  nomorBpkb?: string;

  @Field(() => String, { nullable: true })
  asalUsul?: TipeAsalUsul;

  @Field(() => String, { nullable: true })
  warna?: string;

  @Field(() => String, { nullable: true })
  bahanBakar?: TipeBahanBakar;

  @Field(() => String, { nullable: true })
  harga?: string;

  @Field(() => String, { nullable: true })
  foto?: string;

  @Field(() => String, { nullable: true })
  keterangan?: string;
}

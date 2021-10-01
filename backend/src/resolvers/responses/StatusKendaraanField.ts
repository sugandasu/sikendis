import { Field, ObjectType, registerEnumType } from "type-graphql";
import { PeminjamanOperasional } from "../../entities/PeminjamanOperasional";
import { PenggunaRutin } from "../../entities/PenggunaRutin";

export enum TipeStatusKendaraan {
  BEBAS = "Bebas",
  DIPAKAI = "Dipakai",
}

registerEnumType(TipeStatusKendaraan, {
  name: "TipeStatusKendaraan",
  description: "Tipe status kendaraan",
});

@ObjectType()
export class StatusKendaraanField {
  @Field(() => TipeStatusKendaraan)
  status!: TipeStatusKendaraan;

  @Field(() => [PenggunaRutin], { nullable: true })
  penggunaRutin?: PenggunaRutin[];

  @Field(() => [PeminjamanOperasional], { nullable: true })
  peminjamanOperasional?: PeminjamanOperasional[];

  @Field(() => PenggunaRutin, { nullable: true })
  penggunaRutinLast?: PenggunaRutin;

  @Field(() => PeminjamanOperasional, { nullable: true })
  peminjamanOperasionalLast?: PeminjamanOperasional;
}

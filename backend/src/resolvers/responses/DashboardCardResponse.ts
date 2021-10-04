import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class DashboardCardResponse {
  @Field(() => Int)
  kendaraanRutin: number;

  @Field(() => Int)
  kendaraanOperasional: number;

  @Field(() => Int)
  pengguna: number;

  @Field(() => Int)
  kendaraanOperasionalBebas: number;

  @Field(() => Int)
  peminjamanKendaraan: number;
}

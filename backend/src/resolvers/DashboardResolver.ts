import { Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Kendaraan } from "../entities/Kendaraan";
import { PeminjamanOperasional } from "../entities/PeminjamanOperasional";
import { Pengguna } from "./../entities/Pengguna";
import { DashboardCardResponse } from "./responses/DashboardCardResponse";

@Resolver()
export class DashboardResolver {
  @Query(() => DashboardCardResponse)
  async dashboardCard() {
    const { kendaraanRutin } = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder()
      .select("COUNT(id)", "kendaraanRutin")
      .where(`"tipeKendaraan" = :tipeKendaraan`, {
        tipeKendaraan: "Kendaraan Rutin",
      })
      .getRawOne();

    const { kendaraanOperasional } = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder()
      .select("COUNT(id)", "kendaraanOperasional")
      .where(`"tipeKendaraan" = :tipeKendaraan`, {
        tipeKendaraan: "Kendaraan Operasional",
      })
      .getRawOne();

    const { pengguna } = await getConnection()
      .getRepository(Pengguna)
      .createQueryBuilder()
      .select("COUNT(id)", "pengguna")
      .getRawOne();

    const { peminjamanKendaraan } = await getConnection()
      .getRepository(PeminjamanOperasional)
      .createQueryBuilder()
      .select("COUNT(id)", "peminjamanKendaraan")
      .where(
        `"tanggalMulai" <= :tanggalMulai AND "tanggalSelesai" >= :tanggalSelesai`,
        {
          tanggalMulai: new Date(),
          tanggalSelesai: new Date(),
        }
      )
      .getRawOne();

    const idsPeminjamanAktif = await getConnection()
      .getRepository(PeminjamanOperasional)
      .createQueryBuilder()
      .select("id")
      .where(
        `"tanggalMulai" <= :tanggalMulai AND "tanggalSelesai" >= :tanggalSelesai`,
        {
          tanggalMulai: new Date(),
          tanggalSelesai: new Date(),
        }
      )
      .getRawMany();

    const { kendaraanOperasionalBebas } = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder()
      .select("COUNT(id)", "kendaraanOperasionalBebas")
      .where(
        `"tipeKendaraan" = :tipeKendaraan AND id <> ALL (:idsPeminjamanAktif)`,
        {
          tipeKendaraan: "Kendaraan Operasional",
          idsPeminjamanAktif: idsPeminjamanAktif.map((p) => p.id),
        }
      )
      .getRawOne();

    return {
      kendaraanRutin,
      kendaraanOperasional,
      pengguna,
      peminjamanKendaraan,
      kendaraanOperasionalBebas,
    };
  }
}

import { getConnection } from "typeorm";
import { KendaraanInput } from "../inputs/KendaraanInput";
import { Kendaraan, TipeKendaraan, TipeRoda } from "./../../entities/Kendaraan";

export const kendaraanValidation = async (
  payload: KendaraanInput,
  skipId: number | null = null
) => {
  if (!(<any>Object).values(TipeKendaraan).includes(payload.tipeKendaraan)) {
    return [{ field: "tipeKendaraan", message: "Tipe kendaraan tidak valid" }];
  }

  if (!(<any>Object).values(TipeRoda).includes(payload.tipeRoda)) {
    return [{ field: "tipeRoda", message: "Tipe roda tidak valid" }];
  }

  if (payload.kode.trim().length === 0) {
    return [{ field: "kode", message: "Kode tidak boleh kosong" }];
  }

  if (payload.nama.trim().length === 0) {
    return [{ field: "nama", message: "Nama tidak boleh kosong" }];
  }

  if (payload.merek.trim().length === 0) {
    return [{ field: "merek", message: "Merek kendaraan tidak boleh kosong" }];
  }

  if (payload.tahunPembelian.trim().length === 0) {
    return [
      {
        field: "tahunPembelian",
        message: "Tahun pembelian tidak boleh kosong",
      },
    ];
  }

  if (payload.nomorRangka.trim().length === 0) {
    return [
      { field: "nomorRangka", message: "Nomor rangka tidak boleh kosong" },
    ];
  }

  const nomorRangka = await getConnection()
    .getRepository(Kendaraan)
    .createQueryBuilder("kendaraan")
    .where(
      `kendaraan."nomorRangka" = :nomorRangka ${
        skipId ? "AND kendaraan.id != :id" : ""
      }`,
      skipId
        ? {
            nomorRangka: payload.nomorRangka,
            id: skipId,
          }
        : {
            nomorRangka: payload.nomorRangka,
          }
    )
    .getOne();

  if (nomorRangka) {
    return [
      {
        field: "nomorRangka",
        message: "Nomor rangka telah terdaftar",
      },
    ];
  }

  if (payload.nomorMesin.trim().length === 0) {
    return [{ field: "nomorMesin", message: "Nomor mesin tidak boleh kosong" }];
  }

  const nomorMesin = await getConnection()
    .getRepository(Kendaraan)
    .createQueryBuilder("kendaraan")
    .where(
      `kendaraan."nomorMesin" = :nomorMesin ${
        skipId ? "AND kendaraan.id != :id" : ""
      }`,
      skipId
        ? {
            nomorMesin: payload.nomorMesin,
            id: skipId,
          }
        : {
            nomorMesin: payload.nomorMesin,
          }
    )
    .getOne();

  if (nomorMesin) {
    return [
      {
        field: "nomorMesin",
        message: "Nomor mesin telah terdaftar",
      },
    ];
  }

  if (payload.nomorPolisi) {
    const nomorPolisi = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder("kendaraan")
      .where(
        `kendaraan."nomorPolisi" = :nomorPolisi ${
          skipId ? "AND kendaraan.id != :id" : ""
        }`,
        skipId
          ? {
              nomorPolisi: payload.nomorPolisi,
              id: skipId,
            }
          : {
              nomorPolisi: payload.nomorPolisi,
            }
      )
      .getOne();

    if (nomorPolisi) {
      return [
        {
          field: "nomorPolisi",
          message: "Nomor polisi telah terdaftar",
        },
      ];
    }
  }

  if (payload.nomorBpkb) {
    const nomorBpkb = await getConnection()
      .getRepository(Kendaraan)
      .createQueryBuilder("kendaraan")
      .where(
        `kendaraan."nomorBpkb" = :nomorBpkb ${
          skipId ? "AND kendaraan.id != :id" : ""
        }`,
        skipId
          ? {
              nomorBpkb: payload.nomorBpkb,
              id: skipId,
            }
          : {
              nomorBpkb: payload.nomorBpkb,
            }
      )
      .getOne();

    if (nomorBpkb) {
      return [
        {
          field: "nomorBpkb",
          message: "Nomor BPKB telah terdaftar",
        },
      ];
    }
  }

  return null;
};

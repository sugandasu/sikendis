import {
  Kendaraan,
  TipeAsalUsul,
  TipeBahanBakar,
  TipeKendaraan,
  TipeRoda,
} from "./../../entities/Kendaraan";
import { KendaraanInput } from "../inputs/KendaraanInput";
import { getConnection } from "typeorm";

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

  if (payload.ukuranCc.trim().length === 0) {
    return [{ field: "ukuranCc", message: "Ukuran CC tidak boleh kosong" }];
  }

  if (payload.bahan.trim().length === 0) {
    return [{ field: "bahan", message: "Bahan tidak boleh kosong" }];
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

  if (payload.nomorPolisi.trim().length === 0) {
    return [
      { field: "nomorPolisi", message: "Nomor polisi tidak boleh kosong" },
    ];
  }

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

  if (!(<any>Object).values(TipeAsalUsul).includes(payload.asalUsul)) {
    return [{ field: "asalUsul", message: "Asal usul tidak valid" }];
  }

  if (payload.warna.trim().length === 0) {
    return [{ field: "warna", message: "Warna tidak boleh kosong" }];
  }

  if (!(<any>Object).values(TipeBahanBakar).includes(payload.bahanBakar)) {
    return [{ field: "bahanBakar", message: "Bahan bakar tidak valid" }];
  }

  if (payload.harga.trim().length === 0) {
    return [{ field: "harga", message: "Harga tidak boleh kosong" }];
  }

  return null;
};

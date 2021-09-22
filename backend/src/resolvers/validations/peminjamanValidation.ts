import { Kendaraan } from "../../entities/Kendaraan";
import { Pengguna } from "../../entities/Pengguna";
import { PeminjamanInput } from "../inputs/PeminjamanInput";

export const peminjamanValidation = async (
  payload: PeminjamanInput,
  skipId: number | undefined = undefined
) => {
  const kendaraan = await Kendaraan.findOne({
    where: { id: payload.kendaraanId },
  });
  if (!kendaraan) {
    return [
      {
        field: "kendaraanId",
        message: "Kendaraan tidak ditemukan",
      },
    ];
  }

  const pengguna = await Pengguna.findOne({
    where: { id: payload.penggunaId },
  });

  if (!pengguna) {
    return [
      {
        field: "penggunaId",
        message: "Pengguna tidak ditemukan",
      },
    ];
  }

  if (payload.nomorDisposisi.trim().length === 0) {
    return [
      {
        field: "nomorDisposisi",
        message: "Nomor disposisi tidak boleh kosong",
      },
    ];
  }

  if (!skipId) {
    if (payload.fileDisposisi.trim().length === 0) {
      return [
        {
          field: "fileDisposisi",
          message: "File disposisi tidak boleh kosong",
        },
      ];
    }
  }

  if (payload.nomorSuratPermohonan.trim().length === 0) {
    return [
      {
        field: "nomorSuratPermohonan",
        message: "Nomor surat permohonan tidak boleh kosong",
      },
    ];
  }

  if (!skipId) {
    if (payload.fileSuratPermohonan.trim().length === 0) {
      return [
        {
          field: "fileSuratPermohonan",
          message: "File surat permohonan tidak boleh kosong",
        },
      ];
    }
  }

  if (payload.tanggalMulai) {
    return [
      {
        field: "tanggalMulai",
        message: "Tanggal mulai tidak boleh kosong",
      },
    ];
  }

  if (!payload.tanggalSelesai) {
    return [
      {
        field: "tanggalSelesai",
        message: "Tanggal selesai tidak boleh kosong",
      },
    ];
  }

  if (payload.nomorHpSupir.trim().length === 0) {
    return [
      {
        field: "nomorHpSupir",
        message: "Nomor hp supir mulai tidak boleh kosong",
      },
    ];
  }

  return null;
};

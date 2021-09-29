import { Kendaraan } from "../../entities/Kendaraan";
import { KendaraanOperationalInput } from "../inputs/KendaraanOperationalInput";

export const kendaraanOperationalValidation = async (
  payload: KendaraanOperationalInput,
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

  if (
    !(payload.jenisPeminjam === "Dinas" || payload.jenisPeminjam === "Pegawai")
  ) {
    return [
      {
        field: "jenisPeminjam",
        message: "Jenis Peminjam tidak valid",
      },
    ];
  }

  if (payload.jenisPeminjam === "Dinas") {
    if (!payload.namaDinas) {
      return [
        {
          field: "namaDinas",
          message: "Nama Dinas tidak boleh kosong",
        },
      ];
    }
  }

  if (payload.jenisPeminjam === "Pegawai") {
    if (!payload.namaPegawai) {
      return [
        {
          field: "namaPegawai",
          message: "Nama Pegawai tidak boleh kosong",
        },
      ];
    }

    if (!payload.nipPegawai) {
      return [
        {
          field: "nipPegawai",
          message: "Nip Pegawai tidak boleh kosong",
        },
      ];
    }
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

  if (isNaN(payload.tanggalMulai.getTime())) {
    return [
      {
        field: "tanggalMulai",
        message: "Tanggal mulai tidak boleh kosong",
      },
    ];
  }

  if (isNaN(payload.tanggalSelesai.getTime())) {
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

import { Kendaraan } from "../../entities/Kendaraan";
import { Pengguna } from "../../entities/Pengguna";
import { PenggunaRutinInput } from "../inputs/PenggunaRutinInput";

export const penggunaRutinValidation = async (
  payload: PenggunaRutinInput,
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

  if (payload.nomorBap.trim().length === 0) {
    return [
      {
        field: "nomorBap",
        message: "Nomor BAP tidak boleh kosong",
      },
    ];
  }

  if (!skipId) {
    if (payload.fileBap.trim().length === 0) {
      return [
        {
          field: "fileBap",
          message: "File BAP tidak boleh kosong",
        },
      ];
    }
  }

  if (isNaN(payload.tanggalBap.getTime())) {
    return [
      {
        field: "tanggalBap",
        message: "Tanggal BAP tidak boleh kosong",
      },
    ];
  }

  return null;
};

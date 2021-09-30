import { Kendaraan } from "../../entities/Kendaraan";
import { PeminjamanOperasionalInput } from "../inputs/PeminjamanOperasionalInput";

export const peminjamanOperasionalValidation = async (
  payload: PeminjamanOperasionalInput
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

  if (payload.instansi.trim().length === 0) {
    return [
      {
        field: "instansi",
        message: "Instansi tidak boleh kosong",
      },
    ];
  }

  if (payload.penanggungJawab.trim().length === 0) {
    return [
      {
        field: "penanggungJawab",
        message: "Penanggung jawab tidak boleh kosong",
      },
    ];
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

  if (payload.nomorTelepon.trim().length === 0) {
    return [
      {
        field: "nomorTelepon",
        message: "Nomor telepon tidak boleh kosong",
      },
    ];
  }

  return null;
};

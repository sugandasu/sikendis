import { Pengguna } from "../../entities/Pengguna";
import { PenggunaInput } from "../inputs/PenggunaInput";
export const penggunaValidation = async (payload: PenggunaInput) => {
  if (payload.nip.trim().length === 0) {
    return [{ field: "nip", message: "Nip tidak boleh kosong" }];
  }

  const pengguna = await Pengguna.findOne({ nip: payload.nip });
  if (pengguna) {
    return [
      {
        field: "pengguna",
        message: `Pengguna dengan nip ${payload.nip} telah ada`,
      },
    ];
  }

  if (payload.nama.trim().length === 0) {
    return [{ field: "nip", message: "Nip tidak boleh kosong" }];
  }

  if (payload.jabatan.trim().length === 0) {
    return [{ field: "jabatan", message: "Jabatan tidak boleh kosong" }];
  }

  if (payload.subBagian.trim().length === 0) {
    return [{ field: "subBagian", message: "Sub bagian tidak boleh kosong" }];
  }

  if (payload.fotoProfil.trim().length === 0) {
    return [{ field: "fotoProfil", message: "Foto profil tidak boleh kosong" }];
  }

  return null;
};

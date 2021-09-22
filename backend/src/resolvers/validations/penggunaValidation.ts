import { getConnection } from "typeorm";
import { Pengguna } from "../../entities/Pengguna";
import { PenggunaInput } from "../inputs/PenggunaInput";
export const penggunaValidation = async (
  payload: PenggunaInput,
  filename: string | null = null,
  skipId: number | null = null
) => {
  if (payload.nip.trim().length === 0) {
    return [{ field: "nip", message: "Nip tidak boleh kosong" }];
  }

  const pengguna = await getConnection()
    .getRepository(Pengguna)
    .createQueryBuilder("pengguna")
    .where(
      `pengguna."nip" = :nip ${skipId ? "AND pengguna.id != :id" : ""}`,
      skipId
        ? {
            nip: payload.nip,
            id: skipId,
          }
        : {
            nip: payload.nip,
          }
    )
    .getOne();

  if (pengguna) {
    return [
      {
        field: "nip",
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

  if (filename) {
    if (payload.fotoProfil.trim().length === 0) {
      return [
        { field: "fotoProfil", message: "Foto profil tidak boleh kosong" },
      ];
    }
  }

  return null;
};

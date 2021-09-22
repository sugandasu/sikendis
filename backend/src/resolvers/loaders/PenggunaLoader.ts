import DataLoader from "dataloader";
import { Pengguna } from "../../entities/Pengguna";

export const PenggunaLoader = () => {
  return new DataLoader<number, Pengguna>(async (penggunaIds) => {
    const penggunas = await Pengguna.findByIds(penggunaIds as number[]);
    const penggunaIdToPengguna: Record<number, Pengguna> = {};
    penggunas.forEach((pengguna: Pengguna) => {
      penggunaIdToPengguna[pengguna.id] = pengguna;
    });
    return penggunaIds.map((penggunaId) => penggunaIdToPengguna[penggunaId]);
  });
};

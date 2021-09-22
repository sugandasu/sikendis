import DataLoader from "dataloader";
import { Kendaraan } from "../../entities/Kendaraan";

export const KendaraanLoader = () => {
  return new DataLoader<number, Kendaraan>(async (kendaraanIds) => {
    const kendaraans = await Kendaraan.findByIds(kendaraanIds as number[]);
    const kendaraanIdToKendaraan: Record<number, Kendaraan> = {};
    kendaraans.forEach((kendaraan: Kendaraan) => {
      kendaraanIdToKendaraan[kendaraan.id] = kendaraan;
    });
    return kendaraanIds.map(
      (kendaraanId) => kendaraanIdToKendaraan[kendaraanId]
    );
  });
};

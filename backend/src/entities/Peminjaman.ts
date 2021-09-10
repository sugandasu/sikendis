import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Kendaraan } from "./Kendaraan";
import { Pengguna } from "./Pengguna";

@Entity()
export class Peminjaman {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Kendaraan)
  @JoinColumn()
  kendaraan: Kendaraan;

  @OneToOne(() => Pengguna)
  @JoinColumn()
  pengguna: Pengguna;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

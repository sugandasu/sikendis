import { Field } from "type-graphql";
import {
  BaseEntity,
  Column,
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
export class Peminjaman extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @OneToOne(() => Kendaraan)
  @JoinColumn()
  kendaraan: Kendaraan;

  @Field()
  @OneToOne(() => Pengguna)
  @JoinColumn()
  pengguna: Pengguna;

  @Field()
  @Column()
  nomorDisposisi!: string;

  @Field()
  @Column()
  fileDisposisi!: string;

  @Field()
  @Column()
  nomorSuratPermohonan!: string;

  @Field()
  @Column()
  fileSuratPermohonan!: string;

  @Field()
  @Column({ type: "date" })
  tanggalMulai!: Date;

  @Field()
  @Column({ type: "date" })
  tanggalSelesai!: Date;

  @Field()
  @Column()
  nomorHpSupir!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  keterangan!: string | null;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Kendaraan } from "./Kendaraan";

@ObjectType()
@Entity()
export class KendaraanOperational extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  kendaraanId!: number;

  @Field()
  @ManyToOne(() => Kendaraan)
  kendaraan: Kendaraan;

  @Field()
  @Column()
  jenisPeminjam!: string; // Dinas atau Pegawai

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  namaDinas: string | null;

  // PEGAWAI
  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nipPegawai: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  namaPegawai: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  jabatanPegawai: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  instansiPegawai: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  subBagianPegawai: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  fotoProfilPegawai: string | null;

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

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

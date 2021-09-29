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
import { Pengguna } from "./Pengguna";

@ObjectType()
@Entity()
export class Peminjaman extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: false })
  kendaraanId!: number;

  @Field()
  @ManyToOne(() => Kendaraan)
  kendaraan: Kendaraan;

  @Field()
  @Column({ unique: false })
  penggunaId!: number;

  @Field()
  @ManyToOne(() => Pengguna)
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
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

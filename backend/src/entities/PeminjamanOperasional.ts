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
export class PeminjamanOperasional extends BaseEntity {
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
  instansi!: string;

  @Field()
  @Column()
  penanggungJawab!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nomorSuratDisposisi: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  fileSuratDisposisi: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nomorSuratPermohonan: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  fileSuratPermohonan: string | null;

  @Field()
  @Column({ type: "date" })
  tanggalMulai!: Date;

  @Field()
  @Column({ type: "date" })
  tanggalSelesai!: Date;

  @Field()
  @Column()
  nomorTelepon!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

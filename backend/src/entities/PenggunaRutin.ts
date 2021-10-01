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
export class PenggunaRutin extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "int" })
  kendaraanId!: number;

  @Field(() => Kendaraan)
  @ManyToOne(() => Kendaraan, (kendaraan) => kendaraan.penggunaRutin)
  kendaraan!: Kendaraan;

  @Field()
  @Column({ type: "int" })
  penggunaId!: number;

  @Field(() => Pengguna)
  @ManyToOne(() => Pengguna, (pengguna) => pengguna.penggunaRutin)
  pengguna!: Pengguna;

  @Field()
  @Column()
  nomorBap!: string;

  @Field()
  @Column()
  fileBap!: string;

  @Field()
  @Column({ type: "date" })
  tanggalBap!: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

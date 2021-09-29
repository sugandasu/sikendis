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
export class KendaraanRutin extends BaseEntity {
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

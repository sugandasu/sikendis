import { nullTransformer } from "./../utils/nullTransformer";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PeminjamanOperasional } from "./PeminjamanOperasional";
import { PenggunaRutin } from "./PenggunaRutin";

export enum TipeKendaraan {
  RUTIN = "Kendaraan Rutin",
  OPERASIONAL = "Kendaraan Operasional",
}

export enum TipeRoda {
  RODA2 = "Roda 2",
  RODA3 = "Roda 3",
  RODA4 = "Roda 4",
}

export enum TipeAsalUsul {
  PEMBELIAN = "Pembelian",
  HIBAH = "Hibah",
}

export enum TipeBahanBakar {
  BENSIN = "Bensin",
  SOLAR = "Solar",
}

@ObjectType()
@Entity()
export class Kendaraan extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "enum", enum: TipeKendaraan, default: TipeKendaraan.RUTIN })
  tipeKendaraan!: TipeKendaraan;

  @Field()
  @Column({ type: "enum", enum: TipeRoda, default: TipeRoda.RODA4 })
  tipeRoda!: TipeRoda;

  @Field()
  @Column()
  kode!: string;

  @Field()
  @Column()
  nama!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true, transformer: nullTransformer })
  nomorRegister?: string;

  @Field()
  @Column()
  merek!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true, transformer: nullTransformer })
  ukuranCc?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true, transformer: nullTransformer })
  bahan?: string;

  @Field()
  @Column()
  tahunPembelian!: string;

  @Field()
  @Column({ unique: true })
  nomorRangka!: string;

  @Field()
  @Column({ unique: true })
  nomorMesin!: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "varchar",
    unique: true,
    nullable: true,
    transformer: nullTransformer,
  })
  nomorPolisi?: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "varchar",
    unique: true,
    nullable: true,
    transformer: nullTransformer,
  })
  nomorBpkb?: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    enum: TipeAsalUsul,
    nullable: true,
    transformer: nullTransformer,
  })
  asalUsul?: TipeAsalUsul;

  @Field(() => String, { nullable: true })
  @Column({
    type: "varchar",
    nullable: true,
    transformer: nullTransformer,
  })
  warna?: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    enum: TipeBahanBakar,
    nullable: true,
    transformer: nullTransformer,
  })
  bahanBakar?: TipeBahanBakar;

  @Field(() => String, { nullable: true })
  @Column({
    type: "varchar",
    nullable: true,
    transformer: nullTransformer,
  })
  harga?: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "varchar",
    nullable: true,
    transformer: nullTransformer,
  })
  foto?: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "text",
    nullable: true,
    transformer: nullTransformer,
  })
  keterangan?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // RELATIONS
  @Field(() => [PenggunaRutin])
  @OneToMany(() => PenggunaRutin, (penggunaRutin) => penggunaRutin.kendaraan)
  penggunaRutin: PenggunaRutin[];

  @Field(() => [PeminjamanOperasional])
  @OneToMany(
    () => PeminjamanOperasional,
    (peminjamanOperasional) => peminjamanOperasional.kendaraan
  )
  peminjamanOperasional: PeminjamanOperasional[];
}

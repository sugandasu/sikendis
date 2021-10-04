import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Simda extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdBidang: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdUnit: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdSubunit: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdUpb: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nmUpb: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  noRegister: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  merk: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  type: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  cc: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  bahan: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  tglPerolehan: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nomorPabrik: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nomorRangka: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nomorMesin: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nomorBpkb: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  asalUsul: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  harga: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  keterangan: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  tahun: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  noSp2d: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  tglPembukuan: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdAset1: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdAset2: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdAset3: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdAset4: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kdAset5: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nmAset5: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  kondisi: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  uraian: string | null;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

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
export class Kendaraan extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  tipeRoda!: string;

  @Field()
  @Column()
  kode!: string;

  @Field()
  @Column()
  nama!: string;

  // Roda 2
  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  nomorRegister: string | null;

  @Field()
  @Column()
  merek!: string;

  @Field()
  @Column()
  ukuranCc!: string;

  @Field()
  @Column()
  bahan!: string;

  @Field()
  @Column()
  tahunPembelian!: string;

  @Field()
  @Column({ unique: true })
  nomorRangka!: string;

  @Field()
  @Column({ unique: true })
  nomorMesin!: string;

  @Field()
  @Column({ unique: true })
  nomorPolisi!: string;

  @Field()
  @Column({ unique: true })
  nomorBpkb!: string;

  @Field()
  @Column()
  asalUsul!: string;

  @Field()
  @Column()
  harga!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  keterangan: string | null;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

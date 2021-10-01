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
import { PenggunaRutin } from "./PenggunaRutin";

export enum Instansi {
  UMUM = "Biro Umum pada Sekretariat Daerah Provinsi Sulawesi Tengah",
  PEMERINTAHAN = "Biro Pemerintahan dan Otonomi Daerah Pada Sekretariat Daerah Provinsi Sulawei Tengah",
  ADMINISTRASI_PEMBANGUNAN = "Biro Administrasi Pembangunan Sekretariat Daerah Provinsi Sulawesi Tengah",
  HUKUM = "Biro Hukum Pada Sekretariat Daerah Provinsi Sulawesi Tengah",
  PEREKONOMIAN = "Biro Perekonomian Sekretariat Daerah Sulawesi Tengah",
  KESEJAHTERAAN = "Biro Kesejahteraan Rakyat Pada Sekretariat Daerah Provinsi Sulawesi ",
  ADMINISTRASI_SDA = "Biro Administrasi Pembangunan & Sumber Daya Alam",
  ORGANISASI = "Biro Organisasi Pada Sekretariat Daerah Provinsi Sulawesi Tengah",
  PENGADAAN_BARANG = "Biro Pengadaan Barang/ Jasa Pada Sekretariat Daerah Provinsi Sulawesi Tengah",
  ADMINISTRASI_PIMPINAN = "Biro Administrasi Pimpinan Pada Sekretariat Daerah Provinsi Sulawesi Tengah",
}

@ObjectType()
@Entity()
export class Pengguna extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  nip!: string;

  @Field()
  @Column()
  nama!: string;

  @Field()
  @Column()
  jabatan!: string;

  @Field()
  @Column()
  instansi!: string;

  @Field()
  @Column()
  subBagian!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  fotoProfil: string | null;

  @Field(() => [PenggunaRutin])
  @OneToMany(() => PenggunaRutin, (penggunaRutin) => penggunaRutin.pengguna)
  penggunaRutin: PenggunaRutin[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

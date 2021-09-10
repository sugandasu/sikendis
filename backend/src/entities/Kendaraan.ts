import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Kendaraan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  kode!: string;

  @Column()
  tipeRoda!: string;

  @Column({ nullable: true })
  nomorRegister!: string;

  @Column()
  jenis!: string;

  @Column()
  merek!: string;

  @Column()
  ukuranCc!: string;

  @Column()
  bahan!: string;

  @Column()
  tahunPembelian!: string;

  @Column({ unique: true })
  nomorRangka!: string;

  @Column({ unique: true })
  nomorMesin!: string;

  @Column({ unique: true })
  nomorPolisi!: string;

  @Column({ unique: true })
  nomorBpkp!: string;

  @Column()
  asalUsul!: string;

  @Column()
  harga!: string;

  @Column({ type: "text" })
  keterangan!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

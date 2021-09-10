import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Pengguna {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nip!: string;

  @Column()
  nama!: string;

  @Column()
  jabatan!: string;

  @Column()
  subBagian!: string;

  @Column()
  fotoProfil!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

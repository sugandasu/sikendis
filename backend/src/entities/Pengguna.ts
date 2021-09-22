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

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

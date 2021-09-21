import { Field } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nama!: string;

  @Field()
  @Column()
  namaFile!: string;

  @Field()
  @Column()
  ekstensi!: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

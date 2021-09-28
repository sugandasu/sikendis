import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1632726269230 implements MigrationInterface {
    name = 'initDb1632726269230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "kendaraan" ("id" SERIAL NOT NULL, "tipeRoda" character varying NOT NULL, "kode" character varying NOT NULL, "nama" character varying NOT NULL, "nomorRegister" character varying, "merek" character varying NOT NULL, "ukuranCc" character varying NOT NULL, "bahan" character varying NOT NULL, "tahunPembelian" character varying NOT NULL, "nomorRangka" character varying NOT NULL, "nomorMesin" character varying NOT NULL, "nomorPolisi" character varying NOT NULL, "nomorBpkb" character varying NOT NULL, "asalUsul" character varying NOT NULL, "harga" character varying NOT NULL, "keterangan" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_33bdbd86afa7a45cfab5658f31e" UNIQUE ("nomorRangka"), CONSTRAINT "UQ_ebb8851b5e78ca8b2f666b9bf6a" UNIQUE ("nomorMesin"), CONSTRAINT "UQ_3e7ad314d9b14e6a2df1e236305" UNIQUE ("nomorPolisi"), CONSTRAINT "UQ_02e2dee984a34b701b5cc8dfed7" UNIQUE ("nomorBpkb"), CONSTRAINT "PK_5e5565ce668c75db361d8a08284" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pengguna" ("id" SERIAL NOT NULL, "nip" character varying NOT NULL, "nama" character varying NOT NULL, "jabatan" character varying NOT NULL, "instansi" character varying NOT NULL, "subBagian" character varying NOT NULL, "fotoProfil" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7b7ef5c9ca1aca4d27c28a3d89a" UNIQUE ("nip"), CONSTRAINT "PK_ca7a763029c477efd74c6ec7312" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "peminjaman" ("id" SERIAL NOT NULL, "kendaraanId" integer NOT NULL, "penggunaId" integer NOT NULL, "nomorDisposisi" character varying NOT NULL, "fileDisposisi" character varying NOT NULL, "nomorSuratPermohonan" character varying NOT NULL, "fileSuratPermohonan" character varying NOT NULL, "tanggalMulai" date NOT NULL, "tanggalSelesai" date NOT NULL, "nomorHpSupir" character varying NOT NULL, "keterangan" character varying, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82922de8110e788d5408c70d700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'operator', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "peminjaman" ADD CONSTRAINT "FK_1c0a5133f6c23f2bc1365e7136f" FOREIGN KEY ("kendaraanId") REFERENCES "kendaraan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "peminjaman" ADD CONSTRAINT "FK_ac64d398462d4f6e7a33938c472" FOREIGN KEY ("penggunaId") REFERENCES "pengguna"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "peminjaman" DROP CONSTRAINT "FK_ac64d398462d4f6e7a33938c472"`);
        await queryRunner.query(`ALTER TABLE "peminjaman" DROP CONSTRAINT "FK_1c0a5133f6c23f2bc1365e7136f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "peminjaman"`);
        await queryRunner.query(`DROP TABLE "pengguna"`);
        await queryRunner.query(`DROP TABLE "kendaraan"`);
    }

}

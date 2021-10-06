import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1633479025095 implements MigrationInterface {
    name = 'initDb1633479025095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "peminjaman_operasional" ("id" SERIAL NOT NULL, "kendaraanId" integer NOT NULL, "instansi" character varying NOT NULL, "penanggungJawab" character varying NOT NULL, "nomorSuratDisposisi" character varying, "fileSuratDisposisi" character varying, "nomorSuratPermohonan" character varying, "fileSuratPermohonan" character varying, "tanggalMulai" date NOT NULL, "tanggalSelesai" date NOT NULL, "nomorTelepon" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97c455d7c53dc08a67ba78fe625" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pengguna" ("id" SERIAL NOT NULL, "nip" character varying NOT NULL, "nama" character varying NOT NULL, "jabatan" character varying NOT NULL, "instansi" character varying NOT NULL, "subBagian" character varying NOT NULL, "fotoProfil" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7b7ef5c9ca1aca4d27c28a3d89a" UNIQUE ("nip"), CONSTRAINT "PK_ca7a763029c477efd74c6ec7312" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pengguna_rutin" ("id" SERIAL NOT NULL, "kendaraanId" integer NOT NULL, "penggunaId" integer NOT NULL, "nomorBap" character varying NOT NULL, "fileBap" character varying NOT NULL, "tanggalBap" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8ca0dacba7882e2101ec443fcef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "kendaraan_tipekendaraan_enum" AS ENUM('Kendaraan Rutin', 'Kendaraan Operasional')`);
        await queryRunner.query(`CREATE TYPE "kendaraan_tiperoda_enum" AS ENUM('Roda 2', 'Roda 3', 'Roda 4')`);
        await queryRunner.query(`CREATE TYPE "kendaraan_asalusul_enum" AS ENUM('Pembelian', 'Hibah')`);
        await queryRunner.query(`CREATE TYPE "kendaraan_bahanbakar_enum" AS ENUM('Bensin', 'Solar')`);
        await queryRunner.query(`CREATE TABLE "kendaraan" ("id" SERIAL NOT NULL, "tipeKendaraan" "kendaraan_tipekendaraan_enum" NOT NULL DEFAULT 'Kendaraan Rutin', "tipeRoda" "kendaraan_tiperoda_enum" NOT NULL DEFAULT 'Roda 4', "kode" character varying NOT NULL, "nama" character varying NOT NULL, "nomorRegister" character varying, "merek" character varying NOT NULL, "ukuranCc" character varying NOT NULL, "bahan" character varying NOT NULL, "tahunPembelian" character varying NOT NULL, "nomorRangka" character varying NOT NULL, "nomorMesin" character varying NOT NULL, "nomorPolisi" character varying NOT NULL, "nomorBpkb" character varying, "asalUsul" "kendaraan_asalusul_enum" NOT NULL DEFAULT 'Pembelian', "warna" character varying NOT NULL, "bahanBakar" "kendaraan_bahanbakar_enum" NOT NULL DEFAULT 'Bensin', "harga" character varying NOT NULL, "foto" character varying, "keterangan" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_33bdbd86afa7a45cfab5658f31e" UNIQUE ("nomorRangka"), CONSTRAINT "UQ_ebb8851b5e78ca8b2f666b9bf6a" UNIQUE ("nomorMesin"), CONSTRAINT "UQ_3e7ad314d9b14e6a2df1e236305" UNIQUE ("nomorPolisi"), CONSTRAINT "UQ_02e2dee984a34b701b5cc8dfed7" UNIQUE ("nomorBpkb"), CONSTRAINT "PK_5e5565ce668c75db361d8a08284" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kendaraan_operational" ("id" SERIAL NOT NULL, "kendaraanId" integer NOT NULL, "instansi" character varying NOT NULL, "penanggungJawab" character varying NOT NULL, "nomorSuratDisposisi" character varying, "fileSuratDisposisi" character varying, "nomorSuratPermohonan" character varying, "fileSuratPermohonan" character varying, "tanggalMulai" date NOT NULL, "tanggalSelesai" date NOT NULL, "nomorTelepon" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8cf62427fa912f926ed79ac2d3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kendaraan_rutin" ("id" SERIAL NOT NULL, "kendaraanId" integer NOT NULL, "penggunaId" integer NOT NULL, "nomorBap" character varying NOT NULL, "fileBap" character varying NOT NULL, "tanggalBap" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba8d235b0eaef2dff8cf0665cfc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "peminjaman" ("id" SERIAL NOT NULL, "kendaraanId" integer NOT NULL, "penggunaId" integer NOT NULL, "nomorDisposisi" character varying NOT NULL, "fileDisposisi" character varying NOT NULL, "nomorSuratPermohonan" character varying NOT NULL, "fileSuratPermohonan" character varying NOT NULL, "tanggalMulai" date NOT NULL, "tanggalSelesai" date NOT NULL, "nomorHpSupir" character varying NOT NULL, "keterangan" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82922de8110e788d5408c70d700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "peminjaman_operational" ("id" SERIAL NOT NULL, "kendaraanId" integer NOT NULL, "instansi" character varying NOT NULL, "penanggungJawab" character varying NOT NULL, "nomorSuratDisposisi" character varying, "fileSuratDisposisi" character varying, "nomorSuratPermohonan" character varying, "fileSuratPermohonan" character varying, "tanggalMulai" date NOT NULL, "tanggalSelesai" date NOT NULL, "nomorTelepon" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_659bb79206c5cdc8985022f224d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "simda" ("id" SERIAL NOT NULL, "kdBidang" character varying, "kdUnit" character varying, "kdSubunit" character varying, "kdUpb" character varying, "nmUpb" character varying, "noRegister" character varying, "merk" character varying, "type" character varying, "cc" character varying, "bahan" character varying, "tglPerolehan" character varying, "nomorPabrik" character varying, "nomorRangka" character varying, "nomorMesin" character varying, "nomorBpkb" character varying, "asalUsul" character varying, "harga" character varying, "keterangan" character varying, "tahun" character varying, "noSp2d" character varying, "tglPembukuan" character varying, "kdAset1" character varying, "kdAset2" character varying, "kdAset3" character varying, "kdAset4" character varying, "kdAset5" character varying, "nmAset5" character varying, "kondisi" character varying, "uraian" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_474c68b4c56bb699e1012494703" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'operator', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "peminjaman_operasional" ADD CONSTRAINT "FK_1feae7da64aad75df275e569428" FOREIGN KEY ("kendaraanId") REFERENCES "kendaraan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pengguna_rutin" ADD CONSTRAINT "FK_ba2ae4d10511e6895223573a031" FOREIGN KEY ("kendaraanId") REFERENCES "kendaraan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pengguna_rutin" ADD CONSTRAINT "FK_48309fdd51cc40f3b8ff1dcca58" FOREIGN KEY ("penggunaId") REFERENCES "pengguna"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kendaraan_operational" ADD CONSTRAINT "FK_6f06e3e7fd806690cd70c7a928a" FOREIGN KEY ("kendaraanId") REFERENCES "kendaraan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kendaraan_rutin" ADD CONSTRAINT "FK_f54b3d2dfc2cd0587b630593f48" FOREIGN KEY ("kendaraanId") REFERENCES "kendaraan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kendaraan_rutin" ADD CONSTRAINT "FK_14d97cc7593794d77e23883c548" FOREIGN KEY ("penggunaId") REFERENCES "pengguna"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "peminjaman" ADD CONSTRAINT "FK_1c0a5133f6c23f2bc1365e7136f" FOREIGN KEY ("kendaraanId") REFERENCES "kendaraan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "peminjaman" ADD CONSTRAINT "FK_ac64d398462d4f6e7a33938c472" FOREIGN KEY ("penggunaId") REFERENCES "pengguna"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "peminjaman_operational" ADD CONSTRAINT "FK_137528ac0d2b6c8ea869f3198a3" FOREIGN KEY ("kendaraanId") REFERENCES "kendaraan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "peminjaman_operational" DROP CONSTRAINT "FK_137528ac0d2b6c8ea869f3198a3"`);
        await queryRunner.query(`ALTER TABLE "peminjaman" DROP CONSTRAINT "FK_ac64d398462d4f6e7a33938c472"`);
        await queryRunner.query(`ALTER TABLE "peminjaman" DROP CONSTRAINT "FK_1c0a5133f6c23f2bc1365e7136f"`);
        await queryRunner.query(`ALTER TABLE "kendaraan_rutin" DROP CONSTRAINT "FK_14d97cc7593794d77e23883c548"`);
        await queryRunner.query(`ALTER TABLE "kendaraan_rutin" DROP CONSTRAINT "FK_f54b3d2dfc2cd0587b630593f48"`);
        await queryRunner.query(`ALTER TABLE "kendaraan_operational" DROP CONSTRAINT "FK_6f06e3e7fd806690cd70c7a928a"`);
        await queryRunner.query(`ALTER TABLE "pengguna_rutin" DROP CONSTRAINT "FK_48309fdd51cc40f3b8ff1dcca58"`);
        await queryRunner.query(`ALTER TABLE "pengguna_rutin" DROP CONSTRAINT "FK_ba2ae4d10511e6895223573a031"`);
        await queryRunner.query(`ALTER TABLE "peminjaman_operasional" DROP CONSTRAINT "FK_1feae7da64aad75df275e569428"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "simda"`);
        await queryRunner.query(`DROP TABLE "peminjaman_operational"`);
        await queryRunner.query(`DROP TABLE "peminjaman"`);
        await queryRunner.query(`DROP TABLE "kendaraan_rutin"`);
        await queryRunner.query(`DROP TABLE "kendaraan_operational"`);
        await queryRunner.query(`DROP TABLE "kendaraan"`);
        await queryRunner.query(`DROP TYPE "kendaraan_bahanbakar_enum"`);
        await queryRunner.query(`DROP TYPE "kendaraan_asalusul_enum"`);
        await queryRunner.query(`DROP TYPE "kendaraan_tiperoda_enum"`);
        await queryRunner.query(`DROP TYPE "kendaraan_tipekendaraan_enum"`);
        await queryRunner.query(`DROP TABLE "pengguna_rutin"`);
        await queryRunner.query(`DROP TABLE "pengguna"`);
        await queryRunner.query(`DROP TABLE "peminjaman_operasional"`);
    }

}

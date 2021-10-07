import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type DashboardCardResponse = {
  __typename?: 'DashboardCardResponse';
  kendaraanOperasional: Scalars['Int'];
  kendaraanOperasionalBebas: Scalars['Int'];
  kendaraanRutin: Scalars['Int'];
  peminjamanKendaraan: Scalars['Int'];
  pengguna: Scalars['Int'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Kendaraan = {
  __typename?: 'Kendaraan';
  asalUsul?: Maybe<Scalars['String']>;
  bahan?: Maybe<Scalars['String']>;
  bahanBakar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  foto?: Maybe<Scalars['String']>;
  fotoUrl?: Maybe<Scalars['String']>;
  harga?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  keterangan?: Maybe<Scalars['String']>;
  kode: Scalars['String'];
  merek: Scalars['String'];
  nama: Scalars['String'];
  nomorBpkb?: Maybe<Scalars['String']>;
  nomorMesin: Scalars['String'];
  nomorPolisi?: Maybe<Scalars['String']>;
  nomorRangka: Scalars['String'];
  nomorRegister?: Maybe<Scalars['String']>;
  peminjamanOperasional: Array<PeminjamanOperasional>;
  penggunaRutin: Array<PenggunaRutin>;
  statusPajak?: Maybe<Scalars['String']>;
  statusPenggunaan?: Maybe<StatusKendaraanField>;
  tahunPembelian: Scalars['String'];
  tipeKendaraan: Scalars['String'];
  tipeRoda: Scalars['String'];
  ukuranCc?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  warna?: Maybe<Scalars['String']>;
};

export type KendaraanImport = {
  fileImport: Scalars['String'];
  tipeKendaraan: Scalars['String'];
  tipeRoda: Scalars['String'];
};

export type KendaraanImportResponse = {
  __typename?: 'KendaraanImportResponse';
  errors?: Maybe<Array<FieldError>>;
  rowCount?: Maybe<Scalars['Int']>;
};

export type KendaraanInput = {
  asalUsul?: Maybe<Scalars['String']>;
  bahan?: Maybe<Scalars['String']>;
  bahanBakar?: Maybe<Scalars['String']>;
  foto?: Maybe<Scalars['String']>;
  harga?: Maybe<Scalars['String']>;
  keterangan?: Maybe<Scalars['String']>;
  kode: Scalars['String'];
  merek: Scalars['String'];
  nama: Scalars['String'];
  nomorBpkb?: Maybe<Scalars['String']>;
  nomorMesin: Scalars['String'];
  nomorPolisi?: Maybe<Scalars['String']>;
  nomorRangka: Scalars['String'];
  nomorRegister?: Maybe<Scalars['String']>;
  tahunPembelian: Scalars['String'];
  tipeKendaraan: Scalars['String'];
  tipeRoda: Scalars['String'];
  ukuranCc?: Maybe<Scalars['String']>;
  warna?: Maybe<Scalars['String']>;
};

export type KendaraanPaginateInput = {
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type KendaraanPaginated = {
  __typename?: 'KendaraanPaginated';
  data: Array<Kendaraan>;
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type KendaraanResponse = {
  __typename?: 'KendaraanResponse';
  errors?: Maybe<Array<FieldError>>;
  kendaraan?: Maybe<Kendaraan>;
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createKendaraan: KendaraanResponse;
  createPeminjaman: PeminjamanResponse;
  createPeminjamanOperasional: PeminjamanOperasionalResponse;
  createPengguna: PenggunaResponse;
  createPenggunaRutin: PenggunaRutinResponse;
  deleteKendaraan: Scalars['Boolean'];
  deletePeminjaman: Scalars['Boolean'];
  deletePeminjamanOperasional: Scalars['Boolean'];
  deletePengguna: Scalars['Boolean'];
  deletePenggunaRutin: Scalars['Boolean'];
  importKendaraan: KendaraanImportResponse;
  importPengguna: PenggunaImportResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateKendaraan: KendaraanResponse;
  updatePeminjaman: PeminjamanResponse;
  updatePeminjamanOperasional: PeminjamanOperasionalResponse;
  updatePengguna: PenggunaResponse;
  updatePenggunaRutin: PenggunaRutinResponse;
};


export type MutationCreateKendaraanArgs = {
  foto?: Maybe<Scalars['Upload']>;
  payload: KendaraanInput;
};


export type MutationCreatePeminjamanArgs = {
  fileDisposisi: Scalars['Upload'];
  fileSuratPermohonan: Scalars['Upload'];
  payload: PeminjamanInput;
};


export type MutationCreatePeminjamanOperasionalArgs = {
  fileSuratDisposisi?: Maybe<Scalars['Upload']>;
  fileSuratPermohonan?: Maybe<Scalars['Upload']>;
  payload: PeminjamanOperasionalInput;
};


export type MutationCreatePenggunaArgs = {
  fotoProfil?: Maybe<Scalars['Upload']>;
  payload: PenggunaInput;
};


export type MutationCreatePenggunaRutinArgs = {
  fileBap?: Maybe<Scalars['Upload']>;
  payload: PenggunaRutinInput;
};


export type MutationDeleteKendaraanArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePeminjamanArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePeminjamanOperasionalArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePenggunaArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePenggunaRutinArgs = {
  id: Scalars['Int'];
};


export type MutationImportKendaraanArgs = {
  fileImport?: Maybe<Scalars['Upload']>;
  payload: KendaraanImport;
};


export type MutationImportPenggunaArgs = {
  fileImport?: Maybe<Scalars['Upload']>;
};


export type MutationLoginArgs = {
  payload: LoginInput;
};


export type MutationRegisterArgs = {
  payload: UserInput;
};


export type MutationUpdateKendaraanArgs = {
  foto?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  payload: KendaraanInput;
};


export type MutationUpdatePeminjamanArgs = {
  fileDisposisi?: Maybe<Scalars['Upload']>;
  fileSuratPermohonan?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  payload: PeminjamanInput;
};


export type MutationUpdatePeminjamanOperasionalArgs = {
  fileSuratDisposisi?: Maybe<Scalars['Upload']>;
  fileSuratPermohonan?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  payload: PeminjamanOperasionalInput;
};


export type MutationUpdatePenggunaArgs = {
  fotoProfil?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  payload: PenggunaInput;
};


export type MutationUpdatePenggunaRutinArgs = {
  fileBap?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  payload: PenggunaRutinInput;
};

export type PaginatedInput = {
  filter?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Peminjaman = {
  __typename?: 'Peminjaman';
  fileDisposisi: Scalars['String'];
  fileDisposisiUrl: Scalars['String'];
  fileSuratPermohonan: Scalars['String'];
  fileSuratPermohonanUrl: Scalars['String'];
  id: Scalars['Float'];
  kendaraan: Kendaraan;
  kendaraanId: Scalars['Float'];
  keterangan?: Maybe<Scalars['String']>;
  nomorDisposisi: Scalars['String'];
  nomorHpSupir: Scalars['String'];
  nomorSuratPermohonan: Scalars['String'];
  pengguna: Pengguna;
  penggunaId: Scalars['Float'];
  tanggalMulai: Scalars['DateTime'];
  tanggalSelesai: Scalars['DateTime'];
};

export type PeminjamanInput = {
  fileDisposisi: Scalars['String'];
  fileSuratPermohonan: Scalars['String'];
  kendaraanId: Scalars['Int'];
  keterangan?: Maybe<Scalars['String']>;
  nomorDisposisi: Scalars['String'];
  nomorHpSupir: Scalars['String'];
  nomorSuratPermohonan: Scalars['String'];
  penggunaId: Scalars['Int'];
  tanggalMulai: Scalars['DateTime'];
  tanggalSelesai: Scalars['DateTime'];
};

export type PeminjamanOperasional = {
  __typename?: 'PeminjamanOperasional';
  fileSuratDisposisi?: Maybe<Scalars['String']>;
  fileSuratDisposisiUrl: Scalars['String'];
  fileSuratPermohonan?: Maybe<Scalars['String']>;
  fileSuratPermohonanUrl: Scalars['String'];
  id: Scalars['Float'];
  instansi: Scalars['String'];
  kendaraan: Kendaraan;
  kendaraanId: Scalars['Float'];
  nomorSuratDisposisi?: Maybe<Scalars['String']>;
  nomorSuratPermohonan?: Maybe<Scalars['String']>;
  nomorTelepon: Scalars['String'];
  penanggungJawab: Scalars['String'];
  tanggalMulai: Scalars['DateTime'];
  tanggalSelesai: Scalars['DateTime'];
};

export type PeminjamanOperasionalInput = {
  fileSuratDisposisi?: Maybe<Scalars['String']>;
  fileSuratPermohonan?: Maybe<Scalars['String']>;
  instansi: Scalars['String'];
  kendaraanId: Scalars['Int'];
  nomorSuratDisposisi?: Maybe<Scalars['String']>;
  nomorSuratPermohonan?: Maybe<Scalars['String']>;
  nomorTelepon: Scalars['String'];
  penanggungJawab: Scalars['String'];
  tanggalMulai: Scalars['DateTime'];
  tanggalSelesai: Scalars['DateTime'];
};

export type PeminjamanOperasionalPaginate = {
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type PeminjamanOperasionalPaginated = {
  __typename?: 'PeminjamanOperasionalPaginated';
  data: Array<PeminjamanOperasional>;
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type PeminjamanOperasionalResponse = {
  __typename?: 'PeminjamanOperasionalResponse';
  errors?: Maybe<Array<FieldError>>;
  peminjamanOperasional?: Maybe<PeminjamanOperasional>;
};

export type PeminjamanPaginated = {
  __typename?: 'PeminjamanPaginated';
  data: Array<Peminjaman>;
  filter?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type PeminjamanResponse = {
  __typename?: 'PeminjamanResponse';
  errors?: Maybe<Array<FieldError>>;
  peminjaman?: Maybe<Peminjaman>;
};

export type Pengguna = {
  __typename?: 'Pengguna';
  createdAt: Scalars['DateTime'];
  fotoProfil?: Maybe<Scalars['String']>;
  fotoProfilUrl?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  instansi: Scalars['String'];
  jabatan: Scalars['String'];
  nama: Scalars['String'];
  nip: Scalars['String'];
  penggunaRutin: Array<PenggunaRutin>;
  subBagian: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PenggunaImportResponse = {
  __typename?: 'PenggunaImportResponse';
  errors?: Maybe<Array<FieldError>>;
  rowCount?: Maybe<Scalars['Int']>;
};

export type PenggunaInput = {
  fotoProfil?: Maybe<Scalars['String']>;
  instansi: Scalars['String'];
  jabatan: Scalars['String'];
  nama: Scalars['String'];
  nip: Scalars['String'];
  subBagian: Scalars['String'];
};

export type PenggunaPaginateInput = {
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type PenggunaPaginated = {
  __typename?: 'PenggunaPaginated';
  data: Array<Pengguna>;
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type PenggunaResponse = {
  __typename?: 'PenggunaResponse';
  errors?: Maybe<Array<FieldError>>;
  pengguna?: Maybe<Pengguna>;
};

export type PenggunaRutin = {
  __typename?: 'PenggunaRutin';
  createdAt: Scalars['DateTime'];
  fileBap: Scalars['String'];
  fileBapUrl: Scalars['String'];
  id: Scalars['Float'];
  kendaraan: Kendaraan;
  kendaraanId: Scalars['Float'];
  nomorBap: Scalars['String'];
  pengguna: Pengguna;
  penggunaId: Scalars['Float'];
  tanggalBap: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PenggunaRutinInput = {
  fileBap: Scalars['String'];
  kendaraanId: Scalars['Int'];
  keterangan?: Maybe<Scalars['String']>;
  nomorBap: Scalars['String'];
  penggunaId: Scalars['Int'];
  tanggalBap: Scalars['DateTime'];
};

export type PenggunaRutinPaginate = {
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type PenggunaRutinPaginated = {
  __typename?: 'PenggunaRutinPaginated';
  data: Array<PenggunaRutin>;
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type PenggunaRutinResponse = {
  __typename?: 'PenggunaRutinResponse';
  errors?: Maybe<Array<FieldError>>;
  penggunaRutin?: Maybe<PenggunaRutin>;
};

export type Query = {
  __typename?: 'Query';
  dashboardCard: DashboardCardResponse;
  hello: Scalars['String'];
  kendaraan?: Maybe<Kendaraan>;
  kendaraans: KendaraanPaginated;
  me?: Maybe<User>;
  peminjaman?: Maybe<Peminjaman>;
  peminjamanOperasional?: Maybe<PeminjamanOperasional>;
  peminjamanOperasionals: PeminjamanOperasionalPaginated;
  peminjamans: PeminjamanPaginated;
  pengguna?: Maybe<Pengguna>;
  penggunaRutin?: Maybe<PenggunaRutin>;
  penggunaRutins: PenggunaRutinPaginated;
  penggunas: PenggunaPaginated;
  simdas: SimdaPaginated;
};


export type QueryKendaraanArgs = {
  id: Scalars['Int'];
};


export type QueryKendaraansArgs = {
  options: KendaraanPaginateInput;
};


export type QueryPeminjamanArgs = {
  id: Scalars['Int'];
};


export type QueryPeminjamanOperasionalArgs = {
  id: Scalars['Int'];
};


export type QueryPeminjamanOperasionalsArgs = {
  options: PeminjamanOperasionalPaginate;
};


export type QueryPeminjamansArgs = {
  options: PaginatedInput;
};


export type QueryPenggunaArgs = {
  id: Scalars['Int'];
};


export type QueryPenggunaRutinArgs = {
  id: Scalars['Int'];
};


export type QueryPenggunaRutinsArgs = {
  options: PenggunaRutinPaginate;
};


export type QueryPenggunasArgs = {
  options: PenggunaPaginateInput;
};


export type QuerySimdasArgs = {
  options: SimdaPaginate;
};

export type Simda = {
  __typename?: 'Simda';
  asalUsul?: Maybe<Scalars['String']>;
  bahan?: Maybe<Scalars['String']>;
  cc?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  harga?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  kdAset1?: Maybe<Scalars['String']>;
  kdAset2?: Maybe<Scalars['String']>;
  kdAset3?: Maybe<Scalars['String']>;
  kdAset4?: Maybe<Scalars['String']>;
  kdAset5?: Maybe<Scalars['String']>;
  kdBidang?: Maybe<Scalars['String']>;
  kdSubunit?: Maybe<Scalars['String']>;
  kdUnit?: Maybe<Scalars['String']>;
  kdUpb?: Maybe<Scalars['String']>;
  keterangan?: Maybe<Scalars['String']>;
  kondisi?: Maybe<Scalars['String']>;
  merk?: Maybe<Scalars['String']>;
  nmAset5?: Maybe<Scalars['String']>;
  nmUpb?: Maybe<Scalars['String']>;
  noRegister?: Maybe<Scalars['String']>;
  noSp2d?: Maybe<Scalars['String']>;
  nomorBpkb?: Maybe<Scalars['String']>;
  nomorMesin?: Maybe<Scalars['String']>;
  nomorPabrik?: Maybe<Scalars['String']>;
  nomorRangka?: Maybe<Scalars['String']>;
  tahun?: Maybe<Scalars['String']>;
  tglPembukuan?: Maybe<Scalars['String']>;
  tglPerolehan?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  uraian?: Maybe<Scalars['String']>;
};

export type SimdaPaginate = {
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type SimdaPaginated = {
  __typename?: 'SimdaPaginated';
  data: Array<Simda>;
  filter?: Maybe<Scalars['JSONObject']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type StatusKendaraanField = {
  __typename?: 'StatusKendaraanField';
  peminjamanOperasional?: Maybe<Array<PeminjamanOperasional>>;
  peminjamanOperasionalLast?: Maybe<PeminjamanOperasional>;
  penggunaRutin?: Maybe<Array<PenggunaRutin>>;
  penggunaRutinLast?: Maybe<PenggunaRutin>;
  status: TipeStatusKendaraan;
};

/** Tipe status kendaraan */
export enum TipeStatusKendaraan {
  Bebas = 'BEBAS',
  Dipakai = 'DIPAKAI'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularKendaraanFragment = { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> };

export type RegularPeminjamanOperasionalFragment = { __typename?: 'PeminjamanOperasional', id: number, instansi: string, penanggungJawab: string, nomorSuratDisposisi?: Maybe<string>, fileSuratDisposisi?: Maybe<string>, fileSuratDisposisiUrl: string, nomorSuratPermohonan?: Maybe<string>, fileSuratPermohonan?: Maybe<string>, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorTelepon: string, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> } };

export type RegularPenggunaFragment = { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> };

export type RegularPenggunaRutinFragment = { __typename?: 'PenggunaRutin', id: number, nomorBap: string, fileBap: string, fileBapUrl: string, tanggalBap: any, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } };

export type CreateKendaraanMutationVariables = Exact<{
  payload: KendaraanInput;
  foto?: Maybe<Scalars['Upload']>;
}>;


export type CreateKendaraanMutation = { __typename?: 'Mutation', createKendaraan: { __typename?: 'KendaraanResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, kendaraan?: Maybe<{ __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }> } };

export type CreatePeminjamanOperasionalMutationVariables = Exact<{
  payload: PeminjamanOperasionalInput;
  fileSuratDisposisi?: Maybe<Scalars['Upload']>;
  fileSuratPermohonan?: Maybe<Scalars['Upload']>;
}>;


export type CreatePeminjamanOperasionalMutation = { __typename?: 'Mutation', createPeminjamanOperasional: { __typename?: 'PeminjamanOperasionalResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, peminjamanOperasional?: Maybe<{ __typename?: 'PeminjamanOperasional', id: number, instansi: string, penanggungJawab: string, nomorSuratDisposisi?: Maybe<string>, fileSuratDisposisi?: Maybe<string>, fileSuratDisposisiUrl: string, nomorSuratPermohonan?: Maybe<string>, fileSuratPermohonan?: Maybe<string>, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorTelepon: string, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> } }> } };

export type CreatePenggunaMutationVariables = Exact<{
  payload: PenggunaInput;
  fotoProfil?: Maybe<Scalars['Upload']>;
}>;


export type CreatePenggunaMutation = { __typename?: 'Mutation', createPengguna: { __typename?: 'PenggunaResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, pengguna?: Maybe<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> }> } };

export type CreatePenggunaRutinMutationVariables = Exact<{
  payload: PenggunaRutinInput;
  fileBap?: Maybe<Scalars['Upload']>;
}>;


export type CreatePenggunaRutinMutation = { __typename?: 'Mutation', createPenggunaRutin: { __typename?: 'PenggunaRutinResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, penggunaRutin?: Maybe<{ __typename?: 'PenggunaRutin', id: number, nomorBap: string, fileBap: string, fileBapUrl: string, tanggalBap: any, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> } };

export type DeleteKendaraanMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteKendaraanMutation = { __typename?: 'Mutation', deleteKendaraan: boolean };

export type DeletePeminjamanOperasionalMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePeminjamanOperasionalMutation = { __typename?: 'Mutation', deletePeminjamanOperasional: boolean };

export type DeletePenggunaMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePenggunaMutation = { __typename?: 'Mutation', deletePengguna: boolean };

export type DeletePenggunaRutinMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePenggunaRutinMutation = { __typename?: 'Mutation', deletePenggunaRutin: boolean };

export type ImportKendaraanMutationVariables = Exact<{
  payload: KendaraanImport;
  fileImport: Scalars['Upload'];
}>;


export type ImportKendaraanMutation = { __typename?: 'Mutation', importKendaraan: { __typename?: 'KendaraanImportResponse', rowCount?: Maybe<number>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type ImportPenggunaMutationVariables = Exact<{
  fileImport: Scalars['Upload'];
}>;


export type ImportPenggunaMutation = { __typename?: 'Mutation', importPengguna: { __typename?: 'PenggunaImportResponse', rowCount?: Maybe<number>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', username: string, email: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', username: string, email: string }> } };

export type UpdateKendaraanMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: KendaraanInput;
  foto?: Maybe<Scalars['Upload']>;
}>;


export type UpdateKendaraanMutation = { __typename?: 'Mutation', updateKendaraan: { __typename?: 'KendaraanResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, kendaraan?: Maybe<{ __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }> } };

export type UpdatePeminjamanOperasionalMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: PeminjamanOperasionalInput;
  fileSuratDisposisi?: Maybe<Scalars['Upload']>;
  fileSuratPermohonan?: Maybe<Scalars['Upload']>;
}>;


export type UpdatePeminjamanOperasionalMutation = { __typename?: 'Mutation', updatePeminjamanOperasional: { __typename?: 'PeminjamanOperasionalResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, peminjamanOperasional?: Maybe<{ __typename?: 'PeminjamanOperasional', id: number, instansi: string, penanggungJawab: string, nomorSuratDisposisi?: Maybe<string>, fileSuratDisposisi?: Maybe<string>, fileSuratDisposisiUrl: string, nomorSuratPermohonan?: Maybe<string>, fileSuratPermohonan?: Maybe<string>, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorTelepon: string, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> } }> } };

export type UpdatePenggunaMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: PenggunaInput;
  fotoProfil?: Maybe<Scalars['Upload']>;
}>;


export type UpdatePenggunaMutation = { __typename?: 'Mutation', updatePengguna: { __typename?: 'PenggunaResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, pengguna?: Maybe<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> }> } };

export type UpdatePenggunaRutinMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: PenggunaRutinInput;
  fileBap?: Maybe<Scalars['Upload']>;
}>;


export type UpdatePenggunaRutinMutation = { __typename?: 'Mutation', updatePenggunaRutin: { __typename?: 'PenggunaRutinResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, penggunaRutin?: Maybe<{ __typename?: 'PenggunaRutin', id: number, nomorBap: string, fileBap: string, fileBapUrl: string, tanggalBap: any, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> } };

export type DashboardCardQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardCardQuery = { __typename?: 'Query', dashboardCard: { __typename?: 'DashboardCardResponse', kendaraanRutin: number, kendaraanOperasional: number, pengguna: number, kendaraanOperasionalBebas: number, peminjamanKendaraan: number } };

export type IntegrasiPajaksQueryVariables = Exact<{
  options: KendaraanPaginateInput;
}>;


export type IntegrasiPajaksQuery = { __typename?: 'Query', kendaraans: { __typename?: 'KendaraanPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'Kendaraan', statusPajak?: Maybe<string>, id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }> } };

export type IntegrasiSimdasQueryVariables = Exact<{
  options: SimdaPaginate;
}>;


export type IntegrasiSimdasQuery = { __typename?: 'Query', simdas: { __typename?: 'SimdaPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'Simda', id: number, kdBidang?: Maybe<string>, kdUnit?: Maybe<string>, kdSubunit?: Maybe<string>, kdUpb?: Maybe<string>, nmUpb?: Maybe<string>, noRegister?: Maybe<string>, merk?: Maybe<string>, type?: Maybe<string>, cc?: Maybe<string>, bahan?: Maybe<string>, tglPerolehan?: Maybe<string>, nomorPabrik?: Maybe<string>, nomorRangka?: Maybe<string>, nomorMesin?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, harga?: Maybe<string>, keterangan?: Maybe<string>, tahun?: Maybe<string>, noSp2d?: Maybe<string>, tglPembukuan?: Maybe<string>, kdAset1?: Maybe<string>, kdAset2?: Maybe<string>, kdAset3?: Maybe<string>, kdAset4?: Maybe<string>, kdAset5?: Maybe<string>, nmAset5?: Maybe<string>, kondisi?: Maybe<string>, uraian?: Maybe<string>, createdAt: any, updatedAt: any }> } };

export type KendaraanQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type KendaraanQuery = { __typename?: 'Query', kendaraan?: Maybe<{ __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }> };

export type KendaraansQueryVariables = Exact<{
  options: KendaraanPaginateInput;
}>;


export type KendaraansQuery = { __typename?: 'Query', kendaraans: { __typename?: 'KendaraanPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, role: string }> };

export type MonitoringKendaraanOperasionalsQueryVariables = Exact<{
  options: KendaraanPaginateInput;
}>;


export type MonitoringKendaraanOperasionalsQuery = { __typename?: 'Query', kendaraans: { __typename?: 'KendaraanPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string>, statusPenggunaan?: Maybe<{ __typename?: 'StatusKendaraanField', status: TipeStatusKendaraan, peminjamanOperasionalLast?: Maybe<{ __typename?: 'PeminjamanOperasional', id: number, instansi: string, penanggungJawab: string, nomorSuratDisposisi?: Maybe<string>, fileSuratDisposisi?: Maybe<string>, fileSuratDisposisiUrl: string, nomorSuratPermohonan?: Maybe<string>, fileSuratPermohonan?: Maybe<string>, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorTelepon: string, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> } }> }> }> } };

export type MonitoringKendaraanRutinsQueryVariables = Exact<{
  options: KendaraanPaginateInput;
}>;


export type MonitoringKendaraanRutinsQuery = { __typename?: 'Query', kendaraans: { __typename?: 'KendaraanPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string>, statusPenggunaan?: Maybe<{ __typename?: 'StatusKendaraanField', status: TipeStatusKendaraan, penggunaRutinLast?: Maybe<{ __typename?: 'PenggunaRutin', id: number, nomorBap: string, fileBap: string, fileBapUrl: string, tanggalBap: any, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> }> }> } };

export type PeminjamanOperasionalQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PeminjamanOperasionalQuery = { __typename?: 'Query', peminjamanOperasional?: Maybe<{ __typename?: 'PeminjamanOperasional', id: number, instansi: string, penanggungJawab: string, nomorSuratDisposisi?: Maybe<string>, fileSuratDisposisi?: Maybe<string>, fileSuratDisposisiUrl: string, nomorSuratPermohonan?: Maybe<string>, fileSuratPermohonan?: Maybe<string>, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorTelepon: string, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> } }> };

export type PeminjamanOperasionalsQueryVariables = Exact<{
  options: PeminjamanOperasionalPaginate;
}>;


export type PeminjamanOperasionalsQuery = { __typename?: 'Query', peminjamanOperasionals: { __typename?: 'PeminjamanOperasionalPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'PeminjamanOperasional', id: number, instansi: string, penanggungJawab: string, nomorSuratDisposisi?: Maybe<string>, fileSuratDisposisi?: Maybe<string>, fileSuratDisposisiUrl: string, nomorSuratPermohonan?: Maybe<string>, fileSuratPermohonan?: Maybe<string>, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorTelepon: string, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> } }> } };

export type PenggunaQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PenggunaQuery = { __typename?: 'Query', pengguna?: Maybe<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> }> };

export type PenggunaRutinQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PenggunaRutinQuery = { __typename?: 'Query', penggunaRutin?: Maybe<{ __typename?: 'PenggunaRutin', id: number, nomorBap: string, fileBap: string, fileBapUrl: string, tanggalBap: any, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> };

export type PenggunaRutinsQueryVariables = Exact<{
  options: PenggunaRutinPaginate;
}>;


export type PenggunaRutinsQuery = { __typename?: 'Query', penggunaRutins: { __typename?: 'PenggunaRutinPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'PenggunaRutin', id: number, nomorBap: string, fileBap: string, fileBapUrl: string, tanggalBap: any, kendaraan: { __typename?: 'Kendaraan', id: number, tipeKendaraan: string, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc?: Maybe<string>, bahan?: Maybe<string>, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi?: Maybe<string>, nomorBpkb?: Maybe<string>, asalUsul?: Maybe<string>, warna?: Maybe<string>, bahanBakar?: Maybe<string>, harga?: Maybe<string>, foto?: Maybe<string>, fotoUrl?: Maybe<string>, keterangan?: Maybe<string> }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> } };

export type PenggunasQueryVariables = Exact<{
  options: PenggunaPaginateInput;
}>;


export type PenggunasQuery = { __typename?: 'Query', penggunas: { __typename?: 'PenggunaPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'Pengguna', fotoProfilUrl?: Maybe<string>, id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string> }> } };

export const RegularKendaraanFragmentDoc = gql`
    fragment RegularKendaraan on Kendaraan {
  id
  tipeKendaraan
  tipeRoda
  kode
  nama
  nomorRegister
  merek
  ukuranCc
  bahan
  tahunPembelian
  nomorRangka
  nomorMesin
  nomorPolisi
  nomorBpkb
  asalUsul
  warna
  bahanBakar
  harga
  foto
  fotoUrl
  keterangan
}
    `;
export const RegularPeminjamanOperasionalFragmentDoc = gql`
    fragment RegularPeminjamanOperasional on PeminjamanOperasional {
  id
  kendaraan {
    ...RegularKendaraan
  }
  instansi
  penanggungJawab
  nomorSuratDisposisi
  fileSuratDisposisi
  fileSuratDisposisiUrl
  nomorSuratPermohonan
  fileSuratPermohonan
  fileSuratPermohonanUrl
  tanggalMulai
  tanggalSelesai
  nomorTelepon
}
    ${RegularKendaraanFragmentDoc}`;
export const RegularPenggunaFragmentDoc = gql`
    fragment RegularPengguna on Pengguna {
  id
  nip
  nama
  jabatan
  instansi
  subBagian
  fotoProfil
  fotoProfilUrl
}
    `;
export const RegularPenggunaRutinFragmentDoc = gql`
    fragment RegularPenggunaRutin on PenggunaRutin {
  id
  kendaraan {
    ...RegularKendaraan
  }
  pengguna {
    ...RegularPengguna
  }
  nomorBap
  fileBap
  fileBapUrl
  tanggalBap
}
    ${RegularKendaraanFragmentDoc}
${RegularPenggunaFragmentDoc}`;
export const CreateKendaraanDocument = gql`
    mutation CreateKendaraan($payload: KendaraanInput!, $foto: Upload) {
  createKendaraan(payload: $payload, foto: $foto) {
    errors {
      field
      message
    }
    kendaraan {
      ...RegularKendaraan
    }
  }
}
    ${RegularKendaraanFragmentDoc}`;
export type CreateKendaraanMutationFn = Apollo.MutationFunction<CreateKendaraanMutation, CreateKendaraanMutationVariables>;

/**
 * __useCreateKendaraanMutation__
 *
 * To run a mutation, you first call `useCreateKendaraanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateKendaraanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createKendaraanMutation, { data, loading, error }] = useCreateKendaraanMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      foto: // value for 'foto'
 *   },
 * });
 */
export function useCreateKendaraanMutation(baseOptions?: Apollo.MutationHookOptions<CreateKendaraanMutation, CreateKendaraanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateKendaraanMutation, CreateKendaraanMutationVariables>(CreateKendaraanDocument, options);
      }
export type CreateKendaraanMutationHookResult = ReturnType<typeof useCreateKendaraanMutation>;
export type CreateKendaraanMutationResult = Apollo.MutationResult<CreateKendaraanMutation>;
export type CreateKendaraanMutationOptions = Apollo.BaseMutationOptions<CreateKendaraanMutation, CreateKendaraanMutationVariables>;
export const CreatePeminjamanOperasionalDocument = gql`
    mutation CreatePeminjamanOperasional($payload: PeminjamanOperasionalInput!, $fileSuratDisposisi: Upload, $fileSuratPermohonan: Upload) {
  createPeminjamanOperasional(
    payload: $payload
    fileSuratDisposisi: $fileSuratDisposisi
    fileSuratPermohonan: $fileSuratPermohonan
  ) {
    errors {
      field
      message
    }
    peminjamanOperasional {
      ...RegularPeminjamanOperasional
    }
  }
}
    ${RegularPeminjamanOperasionalFragmentDoc}`;
export type CreatePeminjamanOperasionalMutationFn = Apollo.MutationFunction<CreatePeminjamanOperasionalMutation, CreatePeminjamanOperasionalMutationVariables>;

/**
 * __useCreatePeminjamanOperasionalMutation__
 *
 * To run a mutation, you first call `useCreatePeminjamanOperasionalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePeminjamanOperasionalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPeminjamanOperasionalMutation, { data, loading, error }] = useCreatePeminjamanOperasionalMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      fileSuratDisposisi: // value for 'fileSuratDisposisi'
 *      fileSuratPermohonan: // value for 'fileSuratPermohonan'
 *   },
 * });
 */
export function useCreatePeminjamanOperasionalMutation(baseOptions?: Apollo.MutationHookOptions<CreatePeminjamanOperasionalMutation, CreatePeminjamanOperasionalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePeminjamanOperasionalMutation, CreatePeminjamanOperasionalMutationVariables>(CreatePeminjamanOperasionalDocument, options);
      }
export type CreatePeminjamanOperasionalMutationHookResult = ReturnType<typeof useCreatePeminjamanOperasionalMutation>;
export type CreatePeminjamanOperasionalMutationResult = Apollo.MutationResult<CreatePeminjamanOperasionalMutation>;
export type CreatePeminjamanOperasionalMutationOptions = Apollo.BaseMutationOptions<CreatePeminjamanOperasionalMutation, CreatePeminjamanOperasionalMutationVariables>;
export const CreatePenggunaDocument = gql`
    mutation CreatePengguna($payload: PenggunaInput!, $fotoProfil: Upload) {
  createPengguna(payload: $payload, fotoProfil: $fotoProfil) {
    errors {
      field
      message
    }
    pengguna {
      ...RegularPengguna
    }
  }
}
    ${RegularPenggunaFragmentDoc}`;
export type CreatePenggunaMutationFn = Apollo.MutationFunction<CreatePenggunaMutation, CreatePenggunaMutationVariables>;

/**
 * __useCreatePenggunaMutation__
 *
 * To run a mutation, you first call `useCreatePenggunaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePenggunaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPenggunaMutation, { data, loading, error }] = useCreatePenggunaMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      fotoProfil: // value for 'fotoProfil'
 *   },
 * });
 */
export function useCreatePenggunaMutation(baseOptions?: Apollo.MutationHookOptions<CreatePenggunaMutation, CreatePenggunaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePenggunaMutation, CreatePenggunaMutationVariables>(CreatePenggunaDocument, options);
      }
export type CreatePenggunaMutationHookResult = ReturnType<typeof useCreatePenggunaMutation>;
export type CreatePenggunaMutationResult = Apollo.MutationResult<CreatePenggunaMutation>;
export type CreatePenggunaMutationOptions = Apollo.BaseMutationOptions<CreatePenggunaMutation, CreatePenggunaMutationVariables>;
export const CreatePenggunaRutinDocument = gql`
    mutation CreatePenggunaRutin($payload: PenggunaRutinInput!, $fileBap: Upload) {
  createPenggunaRutin(payload: $payload, fileBap: $fileBap) {
    errors {
      field
      message
    }
    penggunaRutin {
      ...RegularPenggunaRutin
    }
  }
}
    ${RegularPenggunaRutinFragmentDoc}`;
export type CreatePenggunaRutinMutationFn = Apollo.MutationFunction<CreatePenggunaRutinMutation, CreatePenggunaRutinMutationVariables>;

/**
 * __useCreatePenggunaRutinMutation__
 *
 * To run a mutation, you first call `useCreatePenggunaRutinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePenggunaRutinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPenggunaRutinMutation, { data, loading, error }] = useCreatePenggunaRutinMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      fileBap: // value for 'fileBap'
 *   },
 * });
 */
export function useCreatePenggunaRutinMutation(baseOptions?: Apollo.MutationHookOptions<CreatePenggunaRutinMutation, CreatePenggunaRutinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePenggunaRutinMutation, CreatePenggunaRutinMutationVariables>(CreatePenggunaRutinDocument, options);
      }
export type CreatePenggunaRutinMutationHookResult = ReturnType<typeof useCreatePenggunaRutinMutation>;
export type CreatePenggunaRutinMutationResult = Apollo.MutationResult<CreatePenggunaRutinMutation>;
export type CreatePenggunaRutinMutationOptions = Apollo.BaseMutationOptions<CreatePenggunaRutinMutation, CreatePenggunaRutinMutationVariables>;
export const DeleteKendaraanDocument = gql`
    mutation DeleteKendaraan($id: Int!) {
  deleteKendaraan(id: $id)
}
    `;
export type DeleteKendaraanMutationFn = Apollo.MutationFunction<DeleteKendaraanMutation, DeleteKendaraanMutationVariables>;

/**
 * __useDeleteKendaraanMutation__
 *
 * To run a mutation, you first call `useDeleteKendaraanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteKendaraanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteKendaraanMutation, { data, loading, error }] = useDeleteKendaraanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteKendaraanMutation(baseOptions?: Apollo.MutationHookOptions<DeleteKendaraanMutation, DeleteKendaraanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteKendaraanMutation, DeleteKendaraanMutationVariables>(DeleteKendaraanDocument, options);
      }
export type DeleteKendaraanMutationHookResult = ReturnType<typeof useDeleteKendaraanMutation>;
export type DeleteKendaraanMutationResult = Apollo.MutationResult<DeleteKendaraanMutation>;
export type DeleteKendaraanMutationOptions = Apollo.BaseMutationOptions<DeleteKendaraanMutation, DeleteKendaraanMutationVariables>;
export const DeletePeminjamanOperasionalDocument = gql`
    mutation DeletePeminjamanOperasional($id: Int!) {
  deletePeminjamanOperasional(id: $id)
}
    `;
export type DeletePeminjamanOperasionalMutationFn = Apollo.MutationFunction<DeletePeminjamanOperasionalMutation, DeletePeminjamanOperasionalMutationVariables>;

/**
 * __useDeletePeminjamanOperasionalMutation__
 *
 * To run a mutation, you first call `useDeletePeminjamanOperasionalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePeminjamanOperasionalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePeminjamanOperasionalMutation, { data, loading, error }] = useDeletePeminjamanOperasionalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePeminjamanOperasionalMutation(baseOptions?: Apollo.MutationHookOptions<DeletePeminjamanOperasionalMutation, DeletePeminjamanOperasionalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePeminjamanOperasionalMutation, DeletePeminjamanOperasionalMutationVariables>(DeletePeminjamanOperasionalDocument, options);
      }
export type DeletePeminjamanOperasionalMutationHookResult = ReturnType<typeof useDeletePeminjamanOperasionalMutation>;
export type DeletePeminjamanOperasionalMutationResult = Apollo.MutationResult<DeletePeminjamanOperasionalMutation>;
export type DeletePeminjamanOperasionalMutationOptions = Apollo.BaseMutationOptions<DeletePeminjamanOperasionalMutation, DeletePeminjamanOperasionalMutationVariables>;
export const DeletePenggunaDocument = gql`
    mutation DeletePengguna($id: Int!) {
  deletePengguna(id: $id)
}
    `;
export type DeletePenggunaMutationFn = Apollo.MutationFunction<DeletePenggunaMutation, DeletePenggunaMutationVariables>;

/**
 * __useDeletePenggunaMutation__
 *
 * To run a mutation, you first call `useDeletePenggunaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePenggunaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePenggunaMutation, { data, loading, error }] = useDeletePenggunaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePenggunaMutation(baseOptions?: Apollo.MutationHookOptions<DeletePenggunaMutation, DeletePenggunaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePenggunaMutation, DeletePenggunaMutationVariables>(DeletePenggunaDocument, options);
      }
export type DeletePenggunaMutationHookResult = ReturnType<typeof useDeletePenggunaMutation>;
export type DeletePenggunaMutationResult = Apollo.MutationResult<DeletePenggunaMutation>;
export type DeletePenggunaMutationOptions = Apollo.BaseMutationOptions<DeletePenggunaMutation, DeletePenggunaMutationVariables>;
export const DeletePenggunaRutinDocument = gql`
    mutation DeletePenggunaRutin($id: Int!) {
  deletePenggunaRutin(id: $id)
}
    `;
export type DeletePenggunaRutinMutationFn = Apollo.MutationFunction<DeletePenggunaRutinMutation, DeletePenggunaRutinMutationVariables>;

/**
 * __useDeletePenggunaRutinMutation__
 *
 * To run a mutation, you first call `useDeletePenggunaRutinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePenggunaRutinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePenggunaRutinMutation, { data, loading, error }] = useDeletePenggunaRutinMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePenggunaRutinMutation(baseOptions?: Apollo.MutationHookOptions<DeletePenggunaRutinMutation, DeletePenggunaRutinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePenggunaRutinMutation, DeletePenggunaRutinMutationVariables>(DeletePenggunaRutinDocument, options);
      }
export type DeletePenggunaRutinMutationHookResult = ReturnType<typeof useDeletePenggunaRutinMutation>;
export type DeletePenggunaRutinMutationResult = Apollo.MutationResult<DeletePenggunaRutinMutation>;
export type DeletePenggunaRutinMutationOptions = Apollo.BaseMutationOptions<DeletePenggunaRutinMutation, DeletePenggunaRutinMutationVariables>;
export const ImportKendaraanDocument = gql`
    mutation ImportKendaraan($payload: KendaraanImport!, $fileImport: Upload!) {
  importKendaraan(payload: $payload, fileImport: $fileImport) {
    errors {
      field
      message
    }
    rowCount
  }
}
    `;
export type ImportKendaraanMutationFn = Apollo.MutationFunction<ImportKendaraanMutation, ImportKendaraanMutationVariables>;

/**
 * __useImportKendaraanMutation__
 *
 * To run a mutation, you first call `useImportKendaraanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportKendaraanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importKendaraanMutation, { data, loading, error }] = useImportKendaraanMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      fileImport: // value for 'fileImport'
 *   },
 * });
 */
export function useImportKendaraanMutation(baseOptions?: Apollo.MutationHookOptions<ImportKendaraanMutation, ImportKendaraanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportKendaraanMutation, ImportKendaraanMutationVariables>(ImportKendaraanDocument, options);
      }
export type ImportKendaraanMutationHookResult = ReturnType<typeof useImportKendaraanMutation>;
export type ImportKendaraanMutationResult = Apollo.MutationResult<ImportKendaraanMutation>;
export type ImportKendaraanMutationOptions = Apollo.BaseMutationOptions<ImportKendaraanMutation, ImportKendaraanMutationVariables>;
export const ImportPenggunaDocument = gql`
    mutation ImportPengguna($fileImport: Upload!) {
  importPengguna(fileImport: $fileImport) {
    errors {
      field
      message
    }
    rowCount
  }
}
    `;
export type ImportPenggunaMutationFn = Apollo.MutationFunction<ImportPenggunaMutation, ImportPenggunaMutationVariables>;

/**
 * __useImportPenggunaMutation__
 *
 * To run a mutation, you first call `useImportPenggunaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportPenggunaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importPenggunaMutation, { data, loading, error }] = useImportPenggunaMutation({
 *   variables: {
 *      fileImport: // value for 'fileImport'
 *   },
 * });
 */
export function useImportPenggunaMutation(baseOptions?: Apollo.MutationHookOptions<ImportPenggunaMutation, ImportPenggunaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportPenggunaMutation, ImportPenggunaMutationVariables>(ImportPenggunaDocument, options);
      }
export type ImportPenggunaMutationHookResult = ReturnType<typeof useImportPenggunaMutation>;
export type ImportPenggunaMutationResult = Apollo.MutationResult<ImportPenggunaMutation>;
export type ImportPenggunaMutationOptions = Apollo.BaseMutationOptions<ImportPenggunaMutation, ImportPenggunaMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(payload: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    errors {
      field
      message
    }
    user {
      username
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(payload: {username: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      username
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateKendaraanDocument = gql`
    mutation UpdateKendaraan($id: Int!, $payload: KendaraanInput!, $foto: Upload) {
  updateKendaraan(id: $id, payload: $payload, foto: $foto) {
    errors {
      field
      message
    }
    kendaraan {
      ...RegularKendaraan
    }
  }
}
    ${RegularKendaraanFragmentDoc}`;
export type UpdateKendaraanMutationFn = Apollo.MutationFunction<UpdateKendaraanMutation, UpdateKendaraanMutationVariables>;

/**
 * __useUpdateKendaraanMutation__
 *
 * To run a mutation, you first call `useUpdateKendaraanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateKendaraanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateKendaraanMutation, { data, loading, error }] = useUpdateKendaraanMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *      foto: // value for 'foto'
 *   },
 * });
 */
export function useUpdateKendaraanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateKendaraanMutation, UpdateKendaraanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateKendaraanMutation, UpdateKendaraanMutationVariables>(UpdateKendaraanDocument, options);
      }
export type UpdateKendaraanMutationHookResult = ReturnType<typeof useUpdateKendaraanMutation>;
export type UpdateKendaraanMutationResult = Apollo.MutationResult<UpdateKendaraanMutation>;
export type UpdateKendaraanMutationOptions = Apollo.BaseMutationOptions<UpdateKendaraanMutation, UpdateKendaraanMutationVariables>;
export const UpdatePeminjamanOperasionalDocument = gql`
    mutation UpdatePeminjamanOperasional($id: Int!, $payload: PeminjamanOperasionalInput!, $fileSuratDisposisi: Upload, $fileSuratPermohonan: Upload) {
  updatePeminjamanOperasional(
    id: $id
    payload: $payload
    fileSuratDisposisi: $fileSuratDisposisi
    fileSuratPermohonan: $fileSuratPermohonan
  ) {
    errors {
      field
      message
    }
    peminjamanOperasional {
      ...RegularPeminjamanOperasional
    }
  }
}
    ${RegularPeminjamanOperasionalFragmentDoc}`;
export type UpdatePeminjamanOperasionalMutationFn = Apollo.MutationFunction<UpdatePeminjamanOperasionalMutation, UpdatePeminjamanOperasionalMutationVariables>;

/**
 * __useUpdatePeminjamanOperasionalMutation__
 *
 * To run a mutation, you first call `useUpdatePeminjamanOperasionalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePeminjamanOperasionalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePeminjamanOperasionalMutation, { data, loading, error }] = useUpdatePeminjamanOperasionalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *      fileSuratDisposisi: // value for 'fileSuratDisposisi'
 *      fileSuratPermohonan: // value for 'fileSuratPermohonan'
 *   },
 * });
 */
export function useUpdatePeminjamanOperasionalMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePeminjamanOperasionalMutation, UpdatePeminjamanOperasionalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePeminjamanOperasionalMutation, UpdatePeminjamanOperasionalMutationVariables>(UpdatePeminjamanOperasionalDocument, options);
      }
export type UpdatePeminjamanOperasionalMutationHookResult = ReturnType<typeof useUpdatePeminjamanOperasionalMutation>;
export type UpdatePeminjamanOperasionalMutationResult = Apollo.MutationResult<UpdatePeminjamanOperasionalMutation>;
export type UpdatePeminjamanOperasionalMutationOptions = Apollo.BaseMutationOptions<UpdatePeminjamanOperasionalMutation, UpdatePeminjamanOperasionalMutationVariables>;
export const UpdatePenggunaDocument = gql`
    mutation UpdatePengguna($id: Int!, $payload: PenggunaInput!, $fotoProfil: Upload) {
  updatePengguna(id: $id, payload: $payload, fotoProfil: $fotoProfil) {
    errors {
      field
      message
    }
    pengguna {
      ...RegularPengguna
    }
  }
}
    ${RegularPenggunaFragmentDoc}`;
export type UpdatePenggunaMutationFn = Apollo.MutationFunction<UpdatePenggunaMutation, UpdatePenggunaMutationVariables>;

/**
 * __useUpdatePenggunaMutation__
 *
 * To run a mutation, you first call `useUpdatePenggunaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePenggunaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePenggunaMutation, { data, loading, error }] = useUpdatePenggunaMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *      fotoProfil: // value for 'fotoProfil'
 *   },
 * });
 */
export function useUpdatePenggunaMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePenggunaMutation, UpdatePenggunaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePenggunaMutation, UpdatePenggunaMutationVariables>(UpdatePenggunaDocument, options);
      }
export type UpdatePenggunaMutationHookResult = ReturnType<typeof useUpdatePenggunaMutation>;
export type UpdatePenggunaMutationResult = Apollo.MutationResult<UpdatePenggunaMutation>;
export type UpdatePenggunaMutationOptions = Apollo.BaseMutationOptions<UpdatePenggunaMutation, UpdatePenggunaMutationVariables>;
export const UpdatePenggunaRutinDocument = gql`
    mutation UpdatePenggunaRutin($id: Int!, $payload: PenggunaRutinInput!, $fileBap: Upload) {
  updatePenggunaRutin(id: $id, payload: $payload, fileBap: $fileBap) {
    errors {
      field
      message
    }
    penggunaRutin {
      ...RegularPenggunaRutin
    }
  }
}
    ${RegularPenggunaRutinFragmentDoc}`;
export type UpdatePenggunaRutinMutationFn = Apollo.MutationFunction<UpdatePenggunaRutinMutation, UpdatePenggunaRutinMutationVariables>;

/**
 * __useUpdatePenggunaRutinMutation__
 *
 * To run a mutation, you first call `useUpdatePenggunaRutinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePenggunaRutinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePenggunaRutinMutation, { data, loading, error }] = useUpdatePenggunaRutinMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *      fileBap: // value for 'fileBap'
 *   },
 * });
 */
export function useUpdatePenggunaRutinMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePenggunaRutinMutation, UpdatePenggunaRutinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePenggunaRutinMutation, UpdatePenggunaRutinMutationVariables>(UpdatePenggunaRutinDocument, options);
      }
export type UpdatePenggunaRutinMutationHookResult = ReturnType<typeof useUpdatePenggunaRutinMutation>;
export type UpdatePenggunaRutinMutationResult = Apollo.MutationResult<UpdatePenggunaRutinMutation>;
export type UpdatePenggunaRutinMutationOptions = Apollo.BaseMutationOptions<UpdatePenggunaRutinMutation, UpdatePenggunaRutinMutationVariables>;
export const DashboardCardDocument = gql`
    query DashboardCard {
  dashboardCard {
    kendaraanRutin
    kendaraanOperasional
    pengguna
    kendaraanOperasionalBebas
    peminjamanKendaraan
  }
}
    `;

/**
 * __useDashboardCardQuery__
 *
 * To run a query within a React component, call `useDashboardCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardCardQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardCardQuery(baseOptions?: Apollo.QueryHookOptions<DashboardCardQuery, DashboardCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardCardQuery, DashboardCardQueryVariables>(DashboardCardDocument, options);
      }
export function useDashboardCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardCardQuery, DashboardCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardCardQuery, DashboardCardQueryVariables>(DashboardCardDocument, options);
        }
export type DashboardCardQueryHookResult = ReturnType<typeof useDashboardCardQuery>;
export type DashboardCardLazyQueryHookResult = ReturnType<typeof useDashboardCardLazyQuery>;
export type DashboardCardQueryResult = Apollo.QueryResult<DashboardCardQuery, DashboardCardQueryVariables>;
export const IntegrasiPajaksDocument = gql`
    query IntegrasiPajaks($options: KendaraanPaginateInput!) {
  kendaraans(options: $options) {
    data {
      ...RegularKendaraan
      statusPajak
    }
    total
    limit
    page
    filter
  }
}
    ${RegularKendaraanFragmentDoc}`;

/**
 * __useIntegrasiPajaksQuery__
 *
 * To run a query within a React component, call `useIntegrasiPajaksQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntegrasiPajaksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntegrasiPajaksQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useIntegrasiPajaksQuery(baseOptions: Apollo.QueryHookOptions<IntegrasiPajaksQuery, IntegrasiPajaksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IntegrasiPajaksQuery, IntegrasiPajaksQueryVariables>(IntegrasiPajaksDocument, options);
      }
export function useIntegrasiPajaksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IntegrasiPajaksQuery, IntegrasiPajaksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IntegrasiPajaksQuery, IntegrasiPajaksQueryVariables>(IntegrasiPajaksDocument, options);
        }
export type IntegrasiPajaksQueryHookResult = ReturnType<typeof useIntegrasiPajaksQuery>;
export type IntegrasiPajaksLazyQueryHookResult = ReturnType<typeof useIntegrasiPajaksLazyQuery>;
export type IntegrasiPajaksQueryResult = Apollo.QueryResult<IntegrasiPajaksQuery, IntegrasiPajaksQueryVariables>;
export const IntegrasiSimdasDocument = gql`
    query IntegrasiSimdas($options: SimdaPaginate!) {
  simdas(options: $options) {
    data {
      id
      kdBidang
      kdUnit
      kdSubunit
      kdUpb
      nmUpb
      noRegister
      merk
      type
      cc
      bahan
      tglPerolehan
      nomorPabrik
      nomorRangka
      nomorMesin
      nomorBpkb
      asalUsul
      harga
      keterangan
      tahun
      noSp2d
      tglPembukuan
      kdAset1
      kdAset2
      kdAset3
      kdAset4
      kdAset5
      nmAset5
      kondisi
      uraian
      createdAt
      updatedAt
    }
    total
    limit
    page
    filter
  }
}
    `;

/**
 * __useIntegrasiSimdasQuery__
 *
 * To run a query within a React component, call `useIntegrasiSimdasQuery` and pass it any options that fit your needs.
 * When your component renders, `useIntegrasiSimdasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIntegrasiSimdasQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useIntegrasiSimdasQuery(baseOptions: Apollo.QueryHookOptions<IntegrasiSimdasQuery, IntegrasiSimdasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IntegrasiSimdasQuery, IntegrasiSimdasQueryVariables>(IntegrasiSimdasDocument, options);
      }
export function useIntegrasiSimdasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IntegrasiSimdasQuery, IntegrasiSimdasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IntegrasiSimdasQuery, IntegrasiSimdasQueryVariables>(IntegrasiSimdasDocument, options);
        }
export type IntegrasiSimdasQueryHookResult = ReturnType<typeof useIntegrasiSimdasQuery>;
export type IntegrasiSimdasLazyQueryHookResult = ReturnType<typeof useIntegrasiSimdasLazyQuery>;
export type IntegrasiSimdasQueryResult = Apollo.QueryResult<IntegrasiSimdasQuery, IntegrasiSimdasQueryVariables>;
export const KendaraanDocument = gql`
    query Kendaraan($id: Int!) {
  kendaraan(id: $id) {
    ...RegularKendaraan
  }
}
    ${RegularKendaraanFragmentDoc}`;

/**
 * __useKendaraanQuery__
 *
 * To run a query within a React component, call `useKendaraanQuery` and pass it any options that fit your needs.
 * When your component renders, `useKendaraanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKendaraanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKendaraanQuery(baseOptions: Apollo.QueryHookOptions<KendaraanQuery, KendaraanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KendaraanQuery, KendaraanQueryVariables>(KendaraanDocument, options);
      }
export function useKendaraanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KendaraanQuery, KendaraanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KendaraanQuery, KendaraanQueryVariables>(KendaraanDocument, options);
        }
export type KendaraanQueryHookResult = ReturnType<typeof useKendaraanQuery>;
export type KendaraanLazyQueryHookResult = ReturnType<typeof useKendaraanLazyQuery>;
export type KendaraanQueryResult = Apollo.QueryResult<KendaraanQuery, KendaraanQueryVariables>;
export const KendaraansDocument = gql`
    query Kendaraans($options: KendaraanPaginateInput!) {
  kendaraans(options: $options) {
    data {
      ...RegularKendaraan
    }
    total
    limit
    page
    filter
  }
}
    ${RegularKendaraanFragmentDoc}`;

/**
 * __useKendaraansQuery__
 *
 * To run a query within a React component, call `useKendaraansQuery` and pass it any options that fit your needs.
 * When your component renders, `useKendaraansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKendaraansQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useKendaraansQuery(baseOptions: Apollo.QueryHookOptions<KendaraansQuery, KendaraansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KendaraansQuery, KendaraansQueryVariables>(KendaraansDocument, options);
      }
export function useKendaraansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KendaraansQuery, KendaraansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KendaraansQuery, KendaraansQueryVariables>(KendaraansDocument, options);
        }
export type KendaraansQueryHookResult = ReturnType<typeof useKendaraansQuery>;
export type KendaraansLazyQueryHookResult = ReturnType<typeof useKendaraansLazyQuery>;
export type KendaraansQueryResult = Apollo.QueryResult<KendaraansQuery, KendaraansQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MonitoringKendaraanOperasionalsDocument = gql`
    query MonitoringKendaraanOperasionals($options: KendaraanPaginateInput!) {
  kendaraans(options: $options) {
    data {
      ...RegularKendaraan
      statusPenggunaan {
        status
        peminjamanOperasionalLast {
          ...RegularPeminjamanOperasional
        }
      }
    }
    total
    limit
    page
    filter
  }
}
    ${RegularKendaraanFragmentDoc}
${RegularPeminjamanOperasionalFragmentDoc}`;

/**
 * __useMonitoringKendaraanOperasionalsQuery__
 *
 * To run a query within a React component, call `useMonitoringKendaraanOperasionalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonitoringKendaraanOperasionalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitoringKendaraanOperasionalsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useMonitoringKendaraanOperasionalsQuery(baseOptions: Apollo.QueryHookOptions<MonitoringKendaraanOperasionalsQuery, MonitoringKendaraanOperasionalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MonitoringKendaraanOperasionalsQuery, MonitoringKendaraanOperasionalsQueryVariables>(MonitoringKendaraanOperasionalsDocument, options);
      }
export function useMonitoringKendaraanOperasionalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MonitoringKendaraanOperasionalsQuery, MonitoringKendaraanOperasionalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MonitoringKendaraanOperasionalsQuery, MonitoringKendaraanOperasionalsQueryVariables>(MonitoringKendaraanOperasionalsDocument, options);
        }
export type MonitoringKendaraanOperasionalsQueryHookResult = ReturnType<typeof useMonitoringKendaraanOperasionalsQuery>;
export type MonitoringKendaraanOperasionalsLazyQueryHookResult = ReturnType<typeof useMonitoringKendaraanOperasionalsLazyQuery>;
export type MonitoringKendaraanOperasionalsQueryResult = Apollo.QueryResult<MonitoringKendaraanOperasionalsQuery, MonitoringKendaraanOperasionalsQueryVariables>;
export const MonitoringKendaraanRutinsDocument = gql`
    query MonitoringKendaraanRutins($options: KendaraanPaginateInput!) {
  kendaraans(options: $options) {
    data {
      ...RegularKendaraan
      statusPenggunaan {
        status
        penggunaRutinLast {
          ...RegularPenggunaRutin
        }
      }
    }
    total
    limit
    page
    filter
  }
}
    ${RegularKendaraanFragmentDoc}
${RegularPenggunaRutinFragmentDoc}`;

/**
 * __useMonitoringKendaraanRutinsQuery__
 *
 * To run a query within a React component, call `useMonitoringKendaraanRutinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonitoringKendaraanRutinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonitoringKendaraanRutinsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useMonitoringKendaraanRutinsQuery(baseOptions: Apollo.QueryHookOptions<MonitoringKendaraanRutinsQuery, MonitoringKendaraanRutinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MonitoringKendaraanRutinsQuery, MonitoringKendaraanRutinsQueryVariables>(MonitoringKendaraanRutinsDocument, options);
      }
export function useMonitoringKendaraanRutinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MonitoringKendaraanRutinsQuery, MonitoringKendaraanRutinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MonitoringKendaraanRutinsQuery, MonitoringKendaraanRutinsQueryVariables>(MonitoringKendaraanRutinsDocument, options);
        }
export type MonitoringKendaraanRutinsQueryHookResult = ReturnType<typeof useMonitoringKendaraanRutinsQuery>;
export type MonitoringKendaraanRutinsLazyQueryHookResult = ReturnType<typeof useMonitoringKendaraanRutinsLazyQuery>;
export type MonitoringKendaraanRutinsQueryResult = Apollo.QueryResult<MonitoringKendaraanRutinsQuery, MonitoringKendaraanRutinsQueryVariables>;
export const PeminjamanOperasionalDocument = gql`
    query PeminjamanOperasional($id: Int!) {
  peminjamanOperasional(id: $id) {
    ...RegularPeminjamanOperasional
  }
}
    ${RegularPeminjamanOperasionalFragmentDoc}`;

/**
 * __usePeminjamanOperasionalQuery__
 *
 * To run a query within a React component, call `usePeminjamanOperasionalQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeminjamanOperasionalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeminjamanOperasionalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePeminjamanOperasionalQuery(baseOptions: Apollo.QueryHookOptions<PeminjamanOperasionalQuery, PeminjamanOperasionalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeminjamanOperasionalQuery, PeminjamanOperasionalQueryVariables>(PeminjamanOperasionalDocument, options);
      }
export function usePeminjamanOperasionalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeminjamanOperasionalQuery, PeminjamanOperasionalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeminjamanOperasionalQuery, PeminjamanOperasionalQueryVariables>(PeminjamanOperasionalDocument, options);
        }
export type PeminjamanOperasionalQueryHookResult = ReturnType<typeof usePeminjamanOperasionalQuery>;
export type PeminjamanOperasionalLazyQueryHookResult = ReturnType<typeof usePeminjamanOperasionalLazyQuery>;
export type PeminjamanOperasionalQueryResult = Apollo.QueryResult<PeminjamanOperasionalQuery, PeminjamanOperasionalQueryVariables>;
export const PeminjamanOperasionalsDocument = gql`
    query PeminjamanOperasionals($options: PeminjamanOperasionalPaginate!) {
  peminjamanOperasionals(options: $options) {
    data {
      ...RegularPeminjamanOperasional
    }
    total
    limit
    page
    filter
  }
}
    ${RegularPeminjamanOperasionalFragmentDoc}`;

/**
 * __usePeminjamanOperasionalsQuery__
 *
 * To run a query within a React component, call `usePeminjamanOperasionalsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeminjamanOperasionalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeminjamanOperasionalsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePeminjamanOperasionalsQuery(baseOptions: Apollo.QueryHookOptions<PeminjamanOperasionalsQuery, PeminjamanOperasionalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeminjamanOperasionalsQuery, PeminjamanOperasionalsQueryVariables>(PeminjamanOperasionalsDocument, options);
      }
export function usePeminjamanOperasionalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeminjamanOperasionalsQuery, PeminjamanOperasionalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeminjamanOperasionalsQuery, PeminjamanOperasionalsQueryVariables>(PeminjamanOperasionalsDocument, options);
        }
export type PeminjamanOperasionalsQueryHookResult = ReturnType<typeof usePeminjamanOperasionalsQuery>;
export type PeminjamanOperasionalsLazyQueryHookResult = ReturnType<typeof usePeminjamanOperasionalsLazyQuery>;
export type PeminjamanOperasionalsQueryResult = Apollo.QueryResult<PeminjamanOperasionalsQuery, PeminjamanOperasionalsQueryVariables>;
export const PenggunaDocument = gql`
    query Pengguna($id: Int!) {
  pengguna(id: $id) {
    ...RegularPengguna
  }
}
    ${RegularPenggunaFragmentDoc}`;

/**
 * __usePenggunaQuery__
 *
 * To run a query within a React component, call `usePenggunaQuery` and pass it any options that fit your needs.
 * When your component renders, `usePenggunaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePenggunaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePenggunaQuery(baseOptions: Apollo.QueryHookOptions<PenggunaQuery, PenggunaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PenggunaQuery, PenggunaQueryVariables>(PenggunaDocument, options);
      }
export function usePenggunaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PenggunaQuery, PenggunaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PenggunaQuery, PenggunaQueryVariables>(PenggunaDocument, options);
        }
export type PenggunaQueryHookResult = ReturnType<typeof usePenggunaQuery>;
export type PenggunaLazyQueryHookResult = ReturnType<typeof usePenggunaLazyQuery>;
export type PenggunaQueryResult = Apollo.QueryResult<PenggunaQuery, PenggunaQueryVariables>;
export const PenggunaRutinDocument = gql`
    query PenggunaRutin($id: Int!) {
  penggunaRutin(id: $id) {
    ...RegularPenggunaRutin
  }
}
    ${RegularPenggunaRutinFragmentDoc}`;

/**
 * __usePenggunaRutinQuery__
 *
 * To run a query within a React component, call `usePenggunaRutinQuery` and pass it any options that fit your needs.
 * When your component renders, `usePenggunaRutinQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePenggunaRutinQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePenggunaRutinQuery(baseOptions: Apollo.QueryHookOptions<PenggunaRutinQuery, PenggunaRutinQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PenggunaRutinQuery, PenggunaRutinQueryVariables>(PenggunaRutinDocument, options);
      }
export function usePenggunaRutinLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PenggunaRutinQuery, PenggunaRutinQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PenggunaRutinQuery, PenggunaRutinQueryVariables>(PenggunaRutinDocument, options);
        }
export type PenggunaRutinQueryHookResult = ReturnType<typeof usePenggunaRutinQuery>;
export type PenggunaRutinLazyQueryHookResult = ReturnType<typeof usePenggunaRutinLazyQuery>;
export type PenggunaRutinQueryResult = Apollo.QueryResult<PenggunaRutinQuery, PenggunaRutinQueryVariables>;
export const PenggunaRutinsDocument = gql`
    query PenggunaRutins($options: PenggunaRutinPaginate!) {
  penggunaRutins(options: $options) {
    data {
      ...RegularPenggunaRutin
    }
    total
    limit
    page
    filter
  }
}
    ${RegularPenggunaRutinFragmentDoc}`;

/**
 * __usePenggunaRutinsQuery__
 *
 * To run a query within a React component, call `usePenggunaRutinsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePenggunaRutinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePenggunaRutinsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePenggunaRutinsQuery(baseOptions: Apollo.QueryHookOptions<PenggunaRutinsQuery, PenggunaRutinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PenggunaRutinsQuery, PenggunaRutinsQueryVariables>(PenggunaRutinsDocument, options);
      }
export function usePenggunaRutinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PenggunaRutinsQuery, PenggunaRutinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PenggunaRutinsQuery, PenggunaRutinsQueryVariables>(PenggunaRutinsDocument, options);
        }
export type PenggunaRutinsQueryHookResult = ReturnType<typeof usePenggunaRutinsQuery>;
export type PenggunaRutinsLazyQueryHookResult = ReturnType<typeof usePenggunaRutinsLazyQuery>;
export type PenggunaRutinsQueryResult = Apollo.QueryResult<PenggunaRutinsQuery, PenggunaRutinsQueryVariables>;
export const PenggunasDocument = gql`
    query Penggunas($options: PenggunaPaginateInput!) {
  penggunas(options: $options) {
    data {
      ...RegularPengguna
      fotoProfilUrl
    }
    total
    limit
    page
    filter
  }
}
    ${RegularPenggunaFragmentDoc}`;

/**
 * __usePenggunasQuery__
 *
 * To run a query within a React component, call `usePenggunasQuery` and pass it any options that fit your needs.
 * When your component renders, `usePenggunasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePenggunasQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePenggunasQuery(baseOptions: Apollo.QueryHookOptions<PenggunasQuery, PenggunasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PenggunasQuery, PenggunasQueryVariables>(PenggunasDocument, options);
      }
export function usePenggunasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PenggunasQuery, PenggunasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PenggunasQuery, PenggunasQueryVariables>(PenggunasDocument, options);
        }
export type PenggunasQueryHookResult = ReturnType<typeof usePenggunasQuery>;
export type PenggunasLazyQueryHookResult = ReturnType<typeof usePenggunasLazyQuery>;
export type PenggunasQueryResult = Apollo.QueryResult<PenggunasQuery, PenggunasQueryVariables>;
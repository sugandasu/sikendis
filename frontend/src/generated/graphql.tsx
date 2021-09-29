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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Kendaraan = {
  __typename?: 'Kendaraan';
  asalUsul: Scalars['String'];
  bahan: Scalars['String'];
  createdAt: Scalars['DateTime'];
  harga: Scalars['String'];
  id: Scalars['Float'];
  keterangan?: Maybe<Scalars['String']>;
  kode: Scalars['String'];
  merek: Scalars['String'];
  nama: Scalars['String'];
  nomorBpkb: Scalars['String'];
  nomorMesin: Scalars['String'];
  nomorPolisi: Scalars['String'];
  nomorRangka: Scalars['String'];
  nomorRegister?: Maybe<Scalars['String']>;
  tahunPembelian: Scalars['String'];
  tipeRoda: Scalars['String'];
  ukuranCc: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type KendaraanInput = {
  asalUsul: Scalars['String'];
  bahan: Scalars['String'];
  harga: Scalars['String'];
  keterangan?: Maybe<Scalars['String']>;
  kode: Scalars['String'];
  merek: Scalars['String'];
  nama: Scalars['String'];
  nomorBpkb: Scalars['String'];
  nomorMesin: Scalars['String'];
  nomorPolisi: Scalars['String'];
  nomorRangka: Scalars['String'];
  nomorRegister?: Maybe<Scalars['String']>;
  tahunPembelian: Scalars['String'];
  tipeRoda: Scalars['String'];
  ukuranCc: Scalars['String'];
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
  createPengguna: PenggunaResponse;
  deleteKendaraan: Scalars['Boolean'];
  deletePeminjaman: Scalars['Boolean'];
  deletePengguna: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateKendaraan: KendaraanResponse;
  updatePeminjaman: PeminjamanResponse;
  updatePengguna: PenggunaResponse;
};


export type MutationCreateKendaraanArgs = {
  payload: KendaraanInput;
};


export type MutationCreatePeminjamanArgs = {
  fileDisposisi: Scalars['Upload'];
  fileSuratPermohonan: Scalars['Upload'];
  payload: PeminjamanInput;
};


export type MutationCreatePenggunaArgs = {
  fotoProfil?: Maybe<Scalars['Upload']>;
  payload: PenggunaInput;
};


export type MutationDeleteKendaraanArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePeminjamanArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePenggunaArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  payload: LoginInput;
};


export type MutationRegisterArgs = {
  payload: UserInput;
};


export type MutationUpdateKendaraanArgs = {
  id: Scalars['Int'];
  payload: KendaraanInput;
};


export type MutationUpdatePeminjamanArgs = {
  fileDisposisi?: Maybe<Scalars['Upload']>;
  fileSuratPermohonan?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  payload: PeminjamanInput;
};


export type MutationUpdatePenggunaArgs = {
  fotoProfil?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  payload: PenggunaInput;
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
  subBagian: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PenggunaInput = {
  fotoProfil?: Maybe<Scalars['String']>;
  instansi: Scalars['String'];
  jabatan: Scalars['String'];
  nama: Scalars['String'];
  nip: Scalars['String'];
  subBagian: Scalars['String'];
};

export type PenggunaPaginated = {
  __typename?: 'PenggunaPaginated';
  data: Array<Pengguna>;
  filter?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  total: Scalars['Int'];
};

export type PenggunaResponse = {
  __typename?: 'PenggunaResponse';
  errors?: Maybe<Array<FieldError>>;
  pengguna?: Maybe<Pengguna>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  kendaraan?: Maybe<Kendaraan>;
  kendaraans: KendaraanPaginated;
  kendaraansSearchBy?: Maybe<Array<Kendaraan>>;
  me?: Maybe<User>;
  peminjaman?: Maybe<Peminjaman>;
  peminjamans: PeminjamanPaginated;
  pengguna?: Maybe<Pengguna>;
  penggunaSearchBy?: Maybe<Array<Pengguna>>;
  penggunas: PenggunaPaginated;
};


export type QueryKendaraanArgs = {
  id: Scalars['Int'];
};


export type QueryKendaraansArgs = {
  options: KendaraanPaginateInput;
};


export type QueryKendaraansSearchByArgs = {
  options: SearchByInput;
};


export type QueryPeminjamanArgs = {
  id: Scalars['Int'];
};


export type QueryPeminjamansArgs = {
  options: PaginatedInput;
};


export type QueryPenggunaArgs = {
  id: Scalars['Int'];
};


export type QueryPenggunaSearchByArgs = {
  options: SearchByInput;
};


export type QueryPenggunasArgs = {
  options: PaginatedInput;
};

export type SearchByInput = {
  column: Scalars['String'];
  limit: Scalars['Int'];
  value?: Maybe<Scalars['String']>;
};

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

export type RegularKendaraanFragment = { __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any };

export type RegularPeminjamanFragment = { __typename?: 'Peminjaman', id: number, nomorDisposisi: string, fileDisposisi: string, fileDisposisiUrl: string, nomorSuratPermohonan: string, fileSuratPermohonan: string, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorHpSupir: string, keterangan?: Maybe<string>, kendaraan: { __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } };

export type RegularPenggunaFragment = { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> };

export type CreateKendaraanMutationVariables = Exact<{
  payload: KendaraanInput;
}>;


export type CreateKendaraanMutation = { __typename?: 'Mutation', createKendaraan: { __typename?: 'KendaraanResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, kendaraan?: Maybe<{ __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }> } };

export type CreatePeminjamanMutationVariables = Exact<{
  payload: PeminjamanInput;
  fileDisposisi: Scalars['Upload'];
  fileSuratPermohonan: Scalars['Upload'];
}>;


export type CreatePeminjamanMutation = { __typename?: 'Mutation', createPeminjaman: { __typename?: 'PeminjamanResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, peminjaman?: Maybe<{ __typename?: 'Peminjaman', id: number, nomorDisposisi: string, fileDisposisi: string, fileDisposisiUrl: string, nomorSuratPermohonan: string, fileSuratPermohonan: string, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorHpSupir: string, keterangan?: Maybe<string>, kendaraan: { __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> } };

export type CreatePenggunaMutationVariables = Exact<{
  payload: PenggunaInput;
  fotoProfil: Scalars['Upload'];
}>;


export type CreatePenggunaMutation = { __typename?: 'Mutation', createPengguna: { __typename?: 'PenggunaResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, pengguna?: Maybe<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> }> } };

export type DeleteKendaraanMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteKendaraanMutation = { __typename?: 'Mutation', deleteKendaraan: boolean };

export type DeletePeminjamanMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePeminjamanMutation = { __typename?: 'Mutation', deletePeminjaman: boolean };

export type DeletePenggunaMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePenggunaMutation = { __typename?: 'Mutation', deletePengguna: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', username: string, email: string }> } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', username: string, email: string }> } };

export type UpdateKendaraanMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: KendaraanInput;
}>;


export type UpdateKendaraanMutation = { __typename?: 'Mutation', updateKendaraan: { __typename?: 'KendaraanResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, kendaraan?: Maybe<{ __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }> } };

export type UpdatePeminjamanMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: PeminjamanInput;
  fileDisposisi?: Maybe<Scalars['Upload']>;
  fileSuratPermohonan?: Maybe<Scalars['Upload']>;
}>;


export type UpdatePeminjamanMutation = { __typename?: 'Mutation', updatePeminjaman: { __typename?: 'PeminjamanResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, peminjaman?: Maybe<{ __typename?: 'Peminjaman', id: number, nomorDisposisi: string, fileDisposisi: string, fileDisposisiUrl: string, nomorSuratPermohonan: string, fileSuratPermohonan: string, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorHpSupir: string, keterangan?: Maybe<string>, kendaraan: { __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> } };

export type UpdatePenggunaMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: PenggunaInput;
  fotoProfil?: Maybe<Scalars['Upload']>;
}>;


export type UpdatePenggunaMutation = { __typename?: 'Mutation', updatePengguna: { __typename?: 'PenggunaResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, pengguna?: Maybe<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> }> } };

export type KendaraanQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type KendaraanQuery = { __typename?: 'Query', kendaraan?: Maybe<{ __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }> };

export type KendaraansSearchByQueryVariables = Exact<{
  options: SearchByInput;
}>;


export type KendaraansSearchByQuery = { __typename?: 'Query', kendaraansSearchBy?: Maybe<Array<{ __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }>> };

export type KendaraansQueryVariables = Exact<{
  options: KendaraanPaginateInput;
}>;


export type KendaraansQuery = { __typename?: 'Query', kendaraans: { __typename?: 'KendaraanPaginated', total: number, limit: number, page: number, filter?: Maybe<any>, data: Array<{ __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, role: string }> };

export type PeminjamanQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PeminjamanQuery = { __typename?: 'Query', peminjaman?: Maybe<{ __typename?: 'Peminjaman', id: number, nomorDisposisi: string, fileDisposisi: string, fileDisposisiUrl: string, nomorSuratPermohonan: string, fileSuratPermohonan: string, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorHpSupir: string, keterangan?: Maybe<string>, kendaraan: { __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> };

export type PeminjamansQueryVariables = Exact<{
  options: PaginatedInput;
}>;


export type PeminjamansQuery = { __typename?: 'Query', peminjamans: { __typename?: 'PeminjamanPaginated', total: number, limit: number, page: number, filter?: Maybe<string>, data: Array<{ __typename?: 'Peminjaman', id: number, nomorDisposisi: string, fileDisposisi: string, fileDisposisiUrl: string, nomorSuratPermohonan: string, fileSuratPermohonan: string, fileSuratPermohonanUrl: string, tanggalMulai: any, tanggalSelesai: any, nomorHpSupir: string, keterangan?: Maybe<string>, kendaraan: { __typename?: 'Kendaraan', id: number, tipeRoda: string, kode: string, nama: string, nomorRegister?: Maybe<string>, merek: string, ukuranCc: string, bahan: string, tahunPembelian: string, nomorRangka: string, nomorMesin: string, nomorPolisi: string, nomorBpkb: string, asalUsul: string, harga: string, keterangan?: Maybe<string>, createdAt: any, updatedAt: any }, pengguna: { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> } }> } };

export type PenggunaQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PenggunaQuery = { __typename?: 'Query', pengguna?: Maybe<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string>, fotoProfilUrl?: Maybe<string> }> };

export type PenggunaSearchByQueryVariables = Exact<{
  options: SearchByInput;
}>;


export type PenggunaSearchByQuery = { __typename?: 'Query', penggunaSearchBy?: Maybe<Array<{ __typename?: 'Pengguna', id: number, nama: string }>> };

export type PenggunasQueryVariables = Exact<{
  options: PaginatedInput;
}>;


export type PenggunasQuery = { __typename?: 'Query', penggunas: { __typename?: 'PenggunaPaginated', total: number, limit: number, page: number, filter?: Maybe<string>, data: Array<{ __typename?: 'Pengguna', fotoProfilUrl?: Maybe<string>, id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil?: Maybe<string> }> } };

export const RegularKendaraanFragmentDoc = gql`
    fragment RegularKendaraan on Kendaraan {
  id
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
  harga
  keterangan
  createdAt
  updatedAt
}
    `;
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
export const RegularPeminjamanFragmentDoc = gql`
    fragment RegularPeminjaman on Peminjaman {
  id
  kendaraan {
    ...RegularKendaraan
  }
  pengguna {
    ...RegularPengguna
  }
  nomorDisposisi
  fileDisposisi
  fileDisposisiUrl
  nomorSuratPermohonan
  fileSuratPermohonan
  fileSuratPermohonanUrl
  tanggalMulai
  tanggalSelesai
  nomorHpSupir
  keterangan
}
    ${RegularKendaraanFragmentDoc}
${RegularPenggunaFragmentDoc}`;
export const CreateKendaraanDocument = gql`
    mutation CreateKendaraan($payload: KendaraanInput!) {
  createKendaraan(payload: $payload) {
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
export const CreatePeminjamanDocument = gql`
    mutation CreatePeminjaman($payload: PeminjamanInput!, $fileDisposisi: Upload!, $fileSuratPermohonan: Upload!) {
  createPeminjaman(
    payload: $payload
    fileDisposisi: $fileDisposisi
    fileSuratPermohonan: $fileSuratPermohonan
  ) {
    errors {
      field
      message
    }
    peminjaman {
      ...RegularPeminjaman
    }
  }
}
    ${RegularPeminjamanFragmentDoc}`;
export type CreatePeminjamanMutationFn = Apollo.MutationFunction<CreatePeminjamanMutation, CreatePeminjamanMutationVariables>;

/**
 * __useCreatePeminjamanMutation__
 *
 * To run a mutation, you first call `useCreatePeminjamanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePeminjamanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPeminjamanMutation, { data, loading, error }] = useCreatePeminjamanMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      fileDisposisi: // value for 'fileDisposisi'
 *      fileSuratPermohonan: // value for 'fileSuratPermohonan'
 *   },
 * });
 */
export function useCreatePeminjamanMutation(baseOptions?: Apollo.MutationHookOptions<CreatePeminjamanMutation, CreatePeminjamanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePeminjamanMutation, CreatePeminjamanMutationVariables>(CreatePeminjamanDocument, options);
      }
export type CreatePeminjamanMutationHookResult = ReturnType<typeof useCreatePeminjamanMutation>;
export type CreatePeminjamanMutationResult = Apollo.MutationResult<CreatePeminjamanMutation>;
export type CreatePeminjamanMutationOptions = Apollo.BaseMutationOptions<CreatePeminjamanMutation, CreatePeminjamanMutationVariables>;
export const CreatePenggunaDocument = gql`
    mutation CreatePengguna($payload: PenggunaInput!, $fotoProfil: Upload!) {
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
export const DeletePeminjamanDocument = gql`
    mutation DeletePeminjaman($id: Int!) {
  deletePeminjaman(id: $id)
}
    `;
export type DeletePeminjamanMutationFn = Apollo.MutationFunction<DeletePeminjamanMutation, DeletePeminjamanMutationVariables>;

/**
 * __useDeletePeminjamanMutation__
 *
 * To run a mutation, you first call `useDeletePeminjamanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePeminjamanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePeminjamanMutation, { data, loading, error }] = useDeletePeminjamanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePeminjamanMutation(baseOptions?: Apollo.MutationHookOptions<DeletePeminjamanMutation, DeletePeminjamanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePeminjamanMutation, DeletePeminjamanMutationVariables>(DeletePeminjamanDocument, options);
      }
export type DeletePeminjamanMutationHookResult = ReturnType<typeof useDeletePeminjamanMutation>;
export type DeletePeminjamanMutationResult = Apollo.MutationResult<DeletePeminjamanMutation>;
export type DeletePeminjamanMutationOptions = Apollo.BaseMutationOptions<DeletePeminjamanMutation, DeletePeminjamanMutationVariables>;
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
    mutation UpdateKendaraan($id: Int!, $payload: KendaraanInput!) {
  updateKendaraan(id: $id, payload: $payload) {
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
export const UpdatePeminjamanDocument = gql`
    mutation UpdatePeminjaman($id: Int!, $payload: PeminjamanInput!, $fileDisposisi: Upload, $fileSuratPermohonan: Upload) {
  updatePeminjaman(
    id: $id
    payload: $payload
    fileDisposisi: $fileDisposisi
    fileSuratPermohonan: $fileSuratPermohonan
  ) {
    errors {
      field
      message
    }
    peminjaman {
      ...RegularPeminjaman
    }
  }
}
    ${RegularPeminjamanFragmentDoc}`;
export type UpdatePeminjamanMutationFn = Apollo.MutationFunction<UpdatePeminjamanMutation, UpdatePeminjamanMutationVariables>;

/**
 * __useUpdatePeminjamanMutation__
 *
 * To run a mutation, you first call `useUpdatePeminjamanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePeminjamanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePeminjamanMutation, { data, loading, error }] = useUpdatePeminjamanMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *      fileDisposisi: // value for 'fileDisposisi'
 *      fileSuratPermohonan: // value for 'fileSuratPermohonan'
 *   },
 * });
 */
export function useUpdatePeminjamanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePeminjamanMutation, UpdatePeminjamanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePeminjamanMutation, UpdatePeminjamanMutationVariables>(UpdatePeminjamanDocument, options);
      }
export type UpdatePeminjamanMutationHookResult = ReturnType<typeof useUpdatePeminjamanMutation>;
export type UpdatePeminjamanMutationResult = Apollo.MutationResult<UpdatePeminjamanMutation>;
export type UpdatePeminjamanMutationOptions = Apollo.BaseMutationOptions<UpdatePeminjamanMutation, UpdatePeminjamanMutationVariables>;
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
export const KendaraansSearchByDocument = gql`
    query KendaraansSearchBy($options: SearchByInput!) {
  kendaraansSearchBy(options: $options) {
    ...RegularKendaraan
  }
}
    ${RegularKendaraanFragmentDoc}`;

/**
 * __useKendaraansSearchByQuery__
 *
 * To run a query within a React component, call `useKendaraansSearchByQuery` and pass it any options that fit your needs.
 * When your component renders, `useKendaraansSearchByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKendaraansSearchByQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useKendaraansSearchByQuery(baseOptions: Apollo.QueryHookOptions<KendaraansSearchByQuery, KendaraansSearchByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KendaraansSearchByQuery, KendaraansSearchByQueryVariables>(KendaraansSearchByDocument, options);
      }
export function useKendaraansSearchByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KendaraansSearchByQuery, KendaraansSearchByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KendaraansSearchByQuery, KendaraansSearchByQueryVariables>(KendaraansSearchByDocument, options);
        }
export type KendaraansSearchByQueryHookResult = ReturnType<typeof useKendaraansSearchByQuery>;
export type KendaraansSearchByLazyQueryHookResult = ReturnType<typeof useKendaraansSearchByLazyQuery>;
export type KendaraansSearchByQueryResult = Apollo.QueryResult<KendaraansSearchByQuery, KendaraansSearchByQueryVariables>;
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
export const PeminjamanDocument = gql`
    query Peminjaman($id: Int!) {
  peminjaman(id: $id) {
    ...RegularPeminjaman
  }
}
    ${RegularPeminjamanFragmentDoc}`;

/**
 * __usePeminjamanQuery__
 *
 * To run a query within a React component, call `usePeminjamanQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeminjamanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeminjamanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePeminjamanQuery(baseOptions: Apollo.QueryHookOptions<PeminjamanQuery, PeminjamanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeminjamanQuery, PeminjamanQueryVariables>(PeminjamanDocument, options);
      }
export function usePeminjamanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeminjamanQuery, PeminjamanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeminjamanQuery, PeminjamanQueryVariables>(PeminjamanDocument, options);
        }
export type PeminjamanQueryHookResult = ReturnType<typeof usePeminjamanQuery>;
export type PeminjamanLazyQueryHookResult = ReturnType<typeof usePeminjamanLazyQuery>;
export type PeminjamanQueryResult = Apollo.QueryResult<PeminjamanQuery, PeminjamanQueryVariables>;
export const PeminjamansDocument = gql`
    query Peminjamans($options: PaginatedInput!) {
  peminjamans(options: $options) {
    data {
      ...RegularPeminjaman
    }
    total
    limit
    page
    filter
  }
}
    ${RegularPeminjamanFragmentDoc}`;

/**
 * __usePeminjamansQuery__
 *
 * To run a query within a React component, call `usePeminjamansQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeminjamansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeminjamansQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePeminjamansQuery(baseOptions: Apollo.QueryHookOptions<PeminjamansQuery, PeminjamansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeminjamansQuery, PeminjamansQueryVariables>(PeminjamansDocument, options);
      }
export function usePeminjamansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeminjamansQuery, PeminjamansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeminjamansQuery, PeminjamansQueryVariables>(PeminjamansDocument, options);
        }
export type PeminjamansQueryHookResult = ReturnType<typeof usePeminjamansQuery>;
export type PeminjamansLazyQueryHookResult = ReturnType<typeof usePeminjamansLazyQuery>;
export type PeminjamansQueryResult = Apollo.QueryResult<PeminjamansQuery, PeminjamansQueryVariables>;
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
export const PenggunaSearchByDocument = gql`
    query PenggunaSearchBy($options: SearchByInput!) {
  penggunaSearchBy(options: $options) {
    id
    nama
  }
}
    `;

/**
 * __usePenggunaSearchByQuery__
 *
 * To run a query within a React component, call `usePenggunaSearchByQuery` and pass it any options that fit your needs.
 * When your component renders, `usePenggunaSearchByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePenggunaSearchByQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePenggunaSearchByQuery(baseOptions: Apollo.QueryHookOptions<PenggunaSearchByQuery, PenggunaSearchByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PenggunaSearchByQuery, PenggunaSearchByQueryVariables>(PenggunaSearchByDocument, options);
      }
export function usePenggunaSearchByLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PenggunaSearchByQuery, PenggunaSearchByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PenggunaSearchByQuery, PenggunaSearchByQueryVariables>(PenggunaSearchByDocument, options);
        }
export type PenggunaSearchByQueryHookResult = ReturnType<typeof usePenggunaSearchByQuery>;
export type PenggunaSearchByLazyQueryHookResult = ReturnType<typeof usePenggunaSearchByLazyQuery>;
export type PenggunaSearchByQueryResult = Apollo.QueryResult<PenggunaSearchByQuery, PenggunaSearchByQueryVariables>;
export const PenggunasDocument = gql`
    query Penggunas($options: PaginatedInput!) {
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
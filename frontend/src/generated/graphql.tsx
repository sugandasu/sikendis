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
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPengguna: PenggunaResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreatePenggunaArgs = {
  payload: PenggunaInput;
};


export type MutationLoginArgs = {
  payload: LoginInput;
};


export type MutationRegisterArgs = {
  payload: UserInput;
};

export type Pengguna = {
  __typename?: 'Pengguna';
  createdAt: Scalars['DateTime'];
  fotoProfil: Scalars['String'];
  id: Scalars['Float'];
  instansi: Scalars['String'];
  jabatan: Scalars['String'];
  nama: Scalars['String'];
  nip: Scalars['String'];
  subBagian: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PenggunaInput = {
  fotoProfil: Scalars['String'];
  instansi: Scalars['String'];
  jabatan: Scalars['String'];
  nama: Scalars['String'];
  nip: Scalars['String'];
  subBagian: Scalars['String'];
};

export type PenggunaPaginated = {
  __typename?: 'PenggunaPaginated';
  jumlah: Scalars['Int'];
  penggunas: Array<Pengguna>;
};

export type PenggunaResponse = {
  __typename?: 'PenggunaResponse';
  errors?: Maybe<Array<FieldError>>;
  pengguna?: Maybe<Pengguna>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  penggunas: PenggunaPaginated;
};


export type QueryPenggunasArgs = {
  limit: Scalars['Int'];
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

export type RegularPenggunaFragment = { __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil: string };

export type CreatePenggunaMutationVariables = Exact<{
  nip: Scalars['String'];
  nama: Scalars['String'];
  jabatan: Scalars['String'];
  instansi: Scalars['String'];
  subBagian: Scalars['String'];
  fotoProfil: Scalars['String'];
}>;


export type CreatePenggunaMutation = { __typename?: 'Mutation', createPengguna: { __typename?: 'PenggunaResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, pengguna?: Maybe<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil: string }> } };

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, email: string, role: string }> };

export type PenggunasQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type PenggunasQuery = { __typename?: 'Query', penggunas: { __typename?: 'PenggunaPaginated', jumlah: number, penggunas: Array<{ __typename?: 'Pengguna', id: number, nip: string, nama: string, jabatan: string, instansi: string, subBagian: string, fotoProfil: string }> } };

export const RegularPenggunaFragmentDoc = gql`
    fragment RegularPengguna on Pengguna {
  id
  nip
  nama
  jabatan
  instansi
  subBagian
  fotoProfil
}
    `;
export const CreatePenggunaDocument = gql`
    mutation CreatePengguna($nip: String!, $nama: String!, $jabatan: String!, $instansi: String!, $subBagian: String!, $fotoProfil: String!) {
  createPengguna(
    payload: {nip: $nip, nama: $nama, jabatan: $jabatan, instansi: $instansi, subBagian: $subBagian, fotoProfil: $fotoProfil}
  ) {
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
 *      nip: // value for 'nip'
 *      nama: // value for 'nama'
 *      jabatan: // value for 'jabatan'
 *      instansi: // value for 'instansi'
 *      subBagian: // value for 'subBagian'
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
export const PenggunasDocument = gql`
    query Penggunas($limit: Int!) {
  penggunas(limit: $limit) {
    penggunas {
      ...RegularPengguna
    }
    jumlah
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
 *      limit: // value for 'limit'
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
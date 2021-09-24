import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { FaCarSide, FaUsers } from "react-icons/fa";
import { AutoCompleteField } from "../../../components/AutoCompleteField";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { FileField } from "../../../components/FileField";
import { InputField } from "../../../components/InputField";
import {
  useCreatePeminjamanMutation,
  useKendaraanSearchByQuery,
  usePenggunaSearchByQuery,
} from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardPeminjamanTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Peminjaman", link: "/dashboard/peminjaman", isCurrentPage: false },
    { text: "Tambah", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [createPeminjaman] = useCreatePeminjamanMutation();
  const [fileDisposisi, setFileDisposisi] = useState<File>();
  const [fileSuratPermohonan, setFileSuratPermohon] = useState<File>();
  const [searchKendaraan, setSearchKendaraan] = useState();
  const [searchPengguna, setSearchPengguna] = useState();

  const { data: kendaraans, loading: kendaraansLoading } =
    useKendaraanSearchByQuery({
      variables: {
        options: {
          limit: 10,
          column: "nomorPolisi",
          value: searchKendaraan,
        },
      },
      notifyOnNetworkStatusChange: true,
    });

  const { data: penggunas, loading: penggunasLoading } =
    usePenggunaSearchByQuery({
      variables: {
        options: {
          limit: 10,
          column: "nama",
          value: searchPengguna,
        },
      },
      notifyOnNetworkStatusChange: true,
    });

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box borderWidth="1px" borderRadius="md">
          <Box p={5}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Tambah Peminjaman</Text>
              <NextLink href="/dashboard/peminjaman">
                <Link>
                  <Button bg="red.500" color="white">
                    Kembali
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            <Box>
              <Formik
                initialValues={{
                  kendaraanId: null,
                  penggunaId: null,
                  nomorDisposisi: "",
                  fileDisposisi: "",
                  nomorSuratPermohonan: "",
                  fileSuratPermohonan: "",
                  tanggalMulai: "",
                  tanggalSelesai: "",
                  nomorHpSupir: "",
                  keterangan: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createPeminjaman({
                    variables: {
                      payload: values,
                      fileDisposisi,
                      fileSuratPermohonan,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "peminjamans" });
                    },
                  });
                  if (response.data?.createPeminjaman.errors) {
                    setErrors(
                      toErrorMap(response.data.createPeminjaman.errors)
                    );
                  } else if (response.data?.createPeminjaman.peminjaman) {
                    router.push("/dashboard/peminjaman");
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <AutoCompleteField
                      name="kendaraanId"
                      label="Kendaraan"
                      placeholder="Pilih Kendaraan"
                      ChildrenIcon={FaCarSide}
                      options={
                        kendaraans?.kendaraanSearchBy && !kendaraansLoading
                          ? kendaraans.kendaraanSearchBy
                          : []
                      }
                      setSearch={setSearchKendaraan}
                      fieldName="nomorPolisi"
                      setFieldValue={setFieldValue}
                    />
                    <AutoCompleteField
                      name="penggunaId"
                      label="Pengguna"
                      placeholder="Pilih Pengguna"
                      ChildrenIcon={FaUsers}
                      options={
                        penggunas?.penggunaSearchBy && !penggunasLoading
                          ? penggunas.penggunaSearchBy
                          : []
                      }
                      setSearch={setSearchPengguna}
                      fieldName="nama"
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="nomorDisposisi"
                      label="Nomor Disposisi"
                      placeholder="Nomor Disposisi"
                    />
                    <FileField
                      name="fileDisposisi"
                      label="File Disposisi"
                      placeholder="File Disposisi"
                      setFile={setFileDisposisi}
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="nomorSuratPermohonan"
                      label="Nomor Surat Permohonan"
                      placeholder="Nomor Surat Permohonan"
                    />
                    <FileField
                      name="fileSuratPermohonan"
                      label="File Surat Permohonan"
                      placeholder="File Surat Permohonan"
                      setFile={setFileSuratPermohon}
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="tanggalMulai"
                      label="Tanggal Mulai"
                      placeholder="Tanggal Mulai"
                      type="date"
                    />
                    <InputField
                      name="tanggalSelesai"
                      label="Tanggal Selesai"
                      placeholder="Tanggal Selesai"
                      type="date"
                    />
                    <InputField
                      name="nomorHpSupir"
                      label="Nomor HP Supir"
                      placeholder="Nomor HP Supir"
                    />
                    <InputField
                      name="keterangan"
                      label="Keterangan"
                      placeholder="Keterangan"
                      textarea
                    />

                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Tambah Peminjaman
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardPeminjamanTambah;

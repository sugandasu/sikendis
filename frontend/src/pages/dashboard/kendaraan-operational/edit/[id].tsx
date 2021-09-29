import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { AutoCompleteField } from "../../../../components/AutoCompleteField";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { FileField } from "../../../../components/FileField";
import { InputField } from "../../../../components/InputField";
import { SelectionField } from "../../../../components/SelectionField";
import {
  useCreateKendaraanOperationalMutation,
  useKendaraanOperationalQuery,
  useKendaraansQuery,
  useUpdateKendaraanOperationalMutation,
} from "../../../../generated/graphql";
import { useIsOperator } from "../../../../middlewares/useIsOperator";
import { getFormattedDate } from "../../../../utils/getFormattedDate";
import { useGetIntId } from "../../../../utils/getIntId";
import { toErrorMap } from "../../../../utils/toErrorMap";

const DashboardKendaraanOperationalEdit: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Kendaraan Operational",
      link: "/dashboard/kendaraan-operational",
      isCurrentPage: false,
    },
    { text: "Edit", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [updateKendaraanOperational] = useUpdateKendaraanOperationalMutation();

  const intId = useGetIntId();
  const { data, loading } = useKendaraanOperationalQuery({
    skip: intId === -1,
    variables: { id: intId },
  });

  const [fotoProfilPegawai, setFotoProfilePegawai] = useState<File>();
  const [fileDisposisi, setFileDisposisi] = useState<File>();
  const [fileSuratPermohonan, setFileSuratPermohon] = useState<File>();
  const [searchKendaraan, setSearchKendaraan] = useState();

  const { data: kendaraans, loading: kendaraansLoading } = useKendaraansQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
        filter: {
          columns: [
            { name: "nomorPolisi", value: searchKendaraan, operation: "LIKE" },
          ],
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!data?.kendaraanOperational) {
    return <Box>Data tidak ditemukan</Box>;
  }

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Edit Kendaraan Operational</Text>
              <NextLink href="/dashboard/kendaraan-operational">
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
                  kendaraanId: data.kendaraanOperational.kendaraan.id,
                  jenisPeminjam: data.kendaraanOperational.jenisPeminjam,
                  namaDinas: data.kendaraanOperational.namaDinas,
                  nipPegawai: data.kendaraanOperational.nipPegawai,
                  namaPegawai: data.kendaraanOperational.namaPegawai,
                  jabatanPegawai: data.kendaraanOperational.jabatanPegawai,
                  instansiPegawai: data.kendaraanOperational.instansiPegawai,
                  subBagianPegawai: data.kendaraanOperational.subBagianPegawai,
                  fotoProfilPegawai:
                    data.kendaraanOperational.fotoProfilPegawai,
                  nomorDisposisi: data.kendaraanOperational.nomorDisposisi,
                  fileDisposisi: data.kendaraanOperational.fileDisposisi,
                  nomorSuratPermohonan:
                    data.kendaraanOperational.nomorSuratPermohonan,
                  fileSuratPermohonan:
                    data.kendaraanOperational.fileSuratPermohonan,
                  tanggalMulai: getFormattedDate(
                    data.kendaraanOperational.tanggalMulai
                  ),
                  tanggalSelesai: getFormattedDate(
                    data.kendaraanOperational.tanggalSelesai
                  ),
                  nomorHpSupir: data.kendaraanOperational.nomorHpSupir,
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await updateKendaraanOperational({
                    variables: {
                      id: intId,
                      payload: values,
                      fotoProfilPegawai,
                      fileDisposisi,
                      fileSuratPermohonan,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "kendaraanOperationals" });
                    },
                  });
                  if (response.data?.updateKendaraanOperational.errors) {
                    setErrors(
                      toErrorMap(
                        response.data.updateKendaraanOperational.errors
                      )
                    );
                  } else if (
                    response.data?.updateKendaraanOperational
                      .kendaraanOperational
                  ) {
                    router.push("/dashboard/kendaraan-operational");
                  }
                }}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form>
                    <AutoCompleteField
                      name="kendaraanId"
                      label="Kendaraan"
                      placeholder="Pilih Kendaraan"
                      ChildrenIcon={AiFillCar}
                      options={
                        kendaraans?.kendaraans.data && !kendaraansLoading
                          ? kendaraans.kendaraans.data
                          : []
                      }
                      initialValue={
                        data.kendaraanOperational.kendaraan.nomorPolisi
                      }
                      setSearch={setSearchKendaraan}
                      fieldName="nomorPolisi"
                      setFieldValue={setFieldValue}
                    />
                    <SelectionField
                      name="jenisPeminjam"
                      label="Jenis Peminjam"
                      placeholder="Jenis Peminjam"
                      options={[{ value: "Dinas" }, { value: "Pegawai" }]}
                      textField="value"
                      valueField="value"
                    />
                    {values.jenisPeminjam === "Dinas" ? (
                      <Box>
                        <InputField
                          name="namaDinas"
                          label="Nama Dinas"
                          placeholder="Nama Dinas"
                        />
                      </Box>
                    ) : null}
                    {/* {values.jenisPeminjam === "Pegawai" ? ( */}
                    <Box>
                      <InputField
                        name="nipPegawai"
                        label="Nip Pegawai"
                        placeholder="Nip Pegawai"
                      />
                      <InputField
                        name="namaPegawai"
                        label="Nama Pegawai"
                        placeholder="Nama Pegawai"
                      />
                      <InputField
                        name="jabatanPegawai"
                        label="Jabatan Pegawai"
                        placeholder="Jabatan Pegawai"
                      />
                      <InputField
                        name="instansiPegawai"
                        label="Instansi Pegawai"
                        placeholder="Instansi Pegawai"
                      />
                      <InputField
                        name="subBagianPegawai"
                        label="Sub Bagian Pegawai"
                        placeholder="Sub Bagian Pegawai"
                      />
                      <FileField
                        name="fotoProfilPegawai"
                        label="Foto Profil Pegawai"
                        placeholder="Foto Profil Pegawai"
                        setFile={setFotoProfilePegawai}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                    {/* ) : null} */}
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
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Edit Kendaraan Operational
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

export default DashboardKendaraanOperationalEdit;

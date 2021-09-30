import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { AutoCompleteField } from "../../../components/AutoCompleteField";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { FileField } from "../../../components/FileField";
import { InputField } from "../../../components/InputField";
import {
  useCreatePeminjamanOperasionalMutation,
  useKendaraansQuery,
} from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardPeminjamanOperasionalTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Peminjaman Operasional",
      link: "/dashboard/peminjaman-operasional",
      isCurrentPage: false,
    },
    { text: "Tambah", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [createPeminjamanOperasional] =
    useCreatePeminjamanOperasionalMutation();
  const [fileSuratDisposisi, setFileSuratDisposisi] = useState<File>();
  const [fileSuratPermohonan, setFileSuratPermohon] = useState<File>();
  const [searchKendaraan, setSearchKendaraan] = useState();

  const { data: kendaraans, loading: kendaraansLoading } = useKendaraansQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
        filter: {
          columns: [
            {
              name: "tipeKendaraan",
              value: "Kendaraan Operasional",
              operation: "=",
            },
            { name: "nomorPolisi", value: searchKendaraan, operation: "LIKE" },
          ],
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Tambah Peminjaman Operasional</Text>
              <NextLink href="/dashboard/peminjaman-operasional">
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
                  kendaraanId: -1,
                  instansi: "",
                  penanggungJawab: "",
                  nomorSuratDisposisi: "",
                  fileSuratDisposisi: "",
                  nomorSuratPermohonan: "",
                  fileSuratPermohonan: "",
                  tanggalMulai: "",
                  tanggalSelesai: "",
                  nomorTelepon: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createPeminjamanOperasional({
                    variables: {
                      payload: values,
                      fileSuratDisposisi,
                      fileSuratPermohonan,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "peminjamanOperasionals" });
                    },
                  });
                  if (response.data?.createPeminjamanOperasional.errors) {
                    setErrors(
                      toErrorMap(
                        response.data.createPeminjamanOperasional.errors
                      )
                    );
                  } else if (
                    response.data?.createPeminjamanOperasional
                      .peminjamanOperasional
                  ) {
                    router.push("/dashboard/peminjaman-operasional");
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
                      initialValue=""
                      setSearch={setSearchKendaraan}
                      fieldName="nomorPolisi"
                      setFieldValue={setFieldValue}
                      required={true}
                    />
                    <InputField
                      name="instansi"
                      label="Instansi"
                      placeholder="Instansi"
                      required={true}
                    />
                    <InputField
                      name="penanggungJawab"
                      label="Penanggungjawab"
                      placeholder="Penanggungjawab"
                      required={true}
                    />
                    <InputField
                      name="nomorTelepon"
                      label="Nomor Telepon"
                      placeholder="Nomor telepon"
                      required={true}
                    />
                    <InputField
                      name="nomorSuratDisposisi"
                      label="Nomor Surat Disposisi"
                      placeholder="Nomor surat disposisi"
                    />
                    <FileField
                      name="fileSuratDisposisi"
                      label="File Surat Disposisi"
                      placeholder="File surat disposisi"
                      setFile={setFileSuratDisposisi}
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="nomorSuratPermohonan"
                      label="Nomor Surat Permohonan"
                      placeholder="Nomor surat permohonan"
                    />
                    <FileField
                      name="fileSuratPermohonan"
                      label="File Surat Permohonan"
                      placeholder="File surat permohonan"
                      setFile={setFileSuratPermohon}
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="tanggalMulai"
                      label="Tanggal Mulai"
                      placeholder="Tanggal Mulai"
                      type="date"
                      required={true}
                    />
                    <InputField
                      name="tanggalSelesai"
                      label="Tanggal Selesai"
                      placeholder="Tanggal Selesai"
                      type="date"
                      required={true}
                    />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Tambah Peminjaman Operasional
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

export default DashboardPeminjamanOperasionalTambah;

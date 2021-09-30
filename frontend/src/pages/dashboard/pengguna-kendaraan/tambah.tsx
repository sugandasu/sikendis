import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { FileField } from "../../../components/FileField";
import { InputField } from "../../../components/InputField";
import { useCreatePenggunaMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardPenggunaKendaraanTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Pengguna Kendaraan",
      link: "/dashboard/pengguna-kendaraan",
      isCurrentPage: false,
    },
    { text: "Tambah", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [createPengguna] = useCreatePenggunaMutation();
  const [fotoProfil, setFotoProfil] = useState<File>();

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Tambah Pengguna Kendaraan</Text>
              <NextLink href="/dashboard/pengguna-kendaraan">
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
                  nip: "",
                  nama: "",
                  jabatan: "",
                  instansi: "",
                  subBagian: "",
                  fotoProfil: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createPengguna({
                    variables: {
                      payload: values,
                      fotoProfil,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "penggunas" });
                    },
                  });
                  if (response.data?.createPengguna.errors) {
                    setErrors(toErrorMap(response.data.createPengguna.errors));
                  } else if (response.data?.createPengguna.pengguna) {
                    router.push("/dashboard/pengguna-kendaraan");
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <InputField
                      name="nip"
                      label="Nip"
                      placeholder="Nip"
                      required={true}
                    />
                    <InputField
                      name="nama"
                      label="Nama"
                      placeholder="Nama"
                      required={true}
                    />
                    <InputField
                      name="jabatan"
                      label="Jabatan"
                      placeholder="Jabatan"
                      required={true}
                    />
                    <InputField
                      name="instansi"
                      label="Instansi"
                      placeholder="Instansi"
                      required={true}
                    />
                    <InputField
                      name="subBagian"
                      label="Sub bagian"
                      placeholder="Sub bagian"
                      required={true}
                    />
                    <FileField
                      name="fotoProfil"
                      label="Foto Profil"
                      placeholder="Foto profil"
                      setFile={setFotoProfil}
                      setFieldValue={setFieldValue}
                    />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Tambah Pengguna
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

export default DashboardPenggunaKendaraanTambah;

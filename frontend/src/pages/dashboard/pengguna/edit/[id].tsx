import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { FileField } from "../../../../components/FileField";
import { InputField } from "../../../../components/InputField";
import {
  usePenggunaQuery,
  useUpdatePenggunaMutation,
} from "../../../../generated/graphql";
import { useIsOperator } from "../../../../middlewares/useIsOperator";
import { useGetIntId } from "../../../../utils/getIntId";
import { toErrorMap } from "../../../../utils/toErrorMap";

const DashboardPenggunaEdit: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Pengguna", link: "/dashboard/pengguna", isCurrentPage: false },
    { text: "Edit", link: "#", isCurrentPage: true },
  ];

  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = usePenggunaQuery({
    skip: intId === -1,
    variables: { id: intId },
  });
  const [updatePengguna] = useUpdatePenggunaMutation();
  const [fotoProfil, setFotoProfil] = useState<File>();

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!data?.pengguna) {
    return <Box>Data tidak ditemukan</Box>;
  }
  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Edit Pengguna</Text>
              <NextLink href="/dashboard/pengguna">
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
                  nip: data.pengguna.nip,
                  nama: data.pengguna.nama,
                  jabatan: data.pengguna.jabatan,
                  instansi: data.pengguna.instansi,
                  subBagian: data.pengguna.subBagian,
                  fotoProfil: data.pengguna.fotoProfil,
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await updatePengguna({
                    variables: { id: intId, payload: values, fotoProfil },
                    update: (cache) => {
                      cache.evict({ fieldName: "penggunas" });
                    },
                  });
                  if (response.data?.updatePengguna.errors) {
                    setErrors(toErrorMap(response.data.updatePengguna.errors));
                  } else if (response.data?.updatePengguna.pengguna) {
                    router.push("/dashboard/pengguna");
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <InputField name="nip" label="Nip" placeholder="nip" />
                    <InputField name="nama" label="Nama" placeholder="nama" />
                    <InputField
                      name="jabatan"
                      label="Jabatan"
                      placeholder="jabatan"
                    />
                    <InputField
                      name="instansi"
                      label="Instansi"
                      placeholder="instansi"
                    />
                    <InputField
                      name="subBagian"
                      label="Sub bagian"
                      placeholder="subBagian"
                    />
                    <FileField
                      name="fotoProfil"
                      label="Foto Profil"
                      placeholder="Foto Profil"
                      setFile={setFotoProfil}
                      setFieldValue={setFieldValue}
                    />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Edit Pengguna
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

export default DashboardPenggunaEdit;

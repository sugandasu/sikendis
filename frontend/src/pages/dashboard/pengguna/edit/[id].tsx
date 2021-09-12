import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
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
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = usePenggunaQuery({
    skip: intId === -1,
    variables: { id: intId },
  });
  const [updatePengguna] = useUpdatePenggunaMutation();

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!data?.pengguna) {
    return <Box>Data tidak ditemukan</Box>;
  }
  return (
    <Box>
      <Box>Tambah Pengguna</Box>
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
            variables: { id: intId, payload: values },
          });
          if (response.data?.updatePengguna.errors) {
            setErrors(toErrorMap(response.data.updatePengguna.errors));
          } else if (response.data?.updatePengguna.pengguna) {
            router.push("/dashboard/pengguna");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="nip" label="Nip" placeholder="nip" />
            <InputField name="nama" label="Nama" placeholder="nama" />
            <InputField name="jabatan" label="Jabatan" placeholder="jabatan" />
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
            <InputField
              name="fotoProfil"
              label="Foto profil"
              placeholder="fotoProfil"
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
  );
};

export default DashboardPenggunaEdit;

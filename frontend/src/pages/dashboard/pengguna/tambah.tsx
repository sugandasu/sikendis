import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { useCreatePenggunaMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardPenggunaTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const router = useRouter();
  const [createPengguna] = useCreatePenggunaMutation();
  return (
    <Box>
      <Box>Tambah Pengguna</Box>
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
          const response = await createPengguna({ variables: values });
          if (response.data?.createPengguna.errors) {
            setErrors(toErrorMap(response.data.createPengguna.errors));
          } else if (response.data?.createPengguna.pengguna) {
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
              Tambah Pengguna
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DashboardPenggunaTambah;

import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { FileField } from "../../../components/FileField";
import { useImportPenggunaMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardPenggunaKendaraanImport: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Pengguna Kendaraan",
      link: "/dashboard/pengguna-kendaraan",
      isCurrentPage: false,
    },
    { text: "Import", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [importPengguna] = useImportPenggunaMutation();
  const [fileImport, setFileImport] = useState<File>();

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Import Pengguna Kendaraan</Text>
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
                  tipeKendaraan: "Kendaraan Operasional",
                  tipeRoda: "",
                  fileImport: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await importPengguna({
                    variables: { fileImport },
                    update: (cache) => {
                      cache.evict({
                        id: "ROOT_QUERY",
                        fieldName: "penggunas",
                      });
                      cache.gc();
                    },
                  });
                  if (response.data?.importPengguna.errors) {
                    setErrors(toErrorMap(response.data.importPengguna.errors));
                  } else {
                    router.push("/dashboard/pengguna-kendaraan");
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <FileField
                      name="fileImport"
                      label="File Import"
                      placeholder="File Import"
                      setFile={setFileImport}
                      setFieldValue={setFieldValue}
                    />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Import Pengguna Kendaraan
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

export default DashboardPenggunaKendaraanImport;

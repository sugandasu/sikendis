import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { FileField } from "../../../components/FileField";
import { SelectionField } from "../../../components/SelectionField";
import { useImportKendaraanMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardKendaraanOperasionalImport: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Kendaraan Operasional",
      link: "/dashboard/kendaraan-operasional",
      isCurrentPage: false,
    },
    { text: "Import", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [importKendaraan] = useImportKendaraanMutation();
  const [fileImport, setFileImport] = useState<File>();

  const tipeRodaOptions = [
    { value: "Roda 2" },
    { value: "Roda 3" },
    { value: "Roda 4" },
  ];

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Import Kendaraan Operasional</Text>
              <NextLink href="/dashboard/kendaraan-operasional">
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
                  const response = await importKendaraan({
                    variables: { payload: values, fileImport },
                    update: (cache) => {
                      cache.evict({ fieldName: "kendaraans" });
                      cache.gc();
                    },
                  });
                  if (response.data?.importKendaraan.errors) {
                    setErrors(toErrorMap(response.data.importKendaraan.errors));
                  } else {
                    router.push("/dashboard/kendaraan-operasional");
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <SelectionField
                      name="tipeRoda"
                      placeholder="Tipe Roda"
                      label="Tipe Roda"
                      options={tipeRodaOptions}
                      textField="value"
                      valueField="value"
                      required={true}
                    ></SelectionField>
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
                      Import Kendaraan
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

export default DashboardKendaraanOperasionalImport;

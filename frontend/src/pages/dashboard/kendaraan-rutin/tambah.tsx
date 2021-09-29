import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AutoCompleteField } from "../../../components/AutoCompleteField";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { FileField } from "../../../components/FileField";
import { InputField } from "../../../components/InputField";
import {
  useCreateKendaraanRutinMutation,
  useKendaraansQuery,
  usePenggunasQuery,
} from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardKendaraanRutinTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Kendaraan Rutin",
      link: "/dashboard/kendaraan-rutin",
      isCurrentPage: false,
    },
    { text: "Tambah", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [createKendaraanRutin] = useCreateKendaraanRutinMutation();
  const [fileBap, setFileBap] = useState<File>();
  const [searchKendaraan, setSearchKendaraan] = useState();
  const [searchPengguna, setSearchPengguna] = useState();

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

  const { data: penggunas, loading: penggunasLoading } = usePenggunasQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
        filter: {
          columns: [{ name: "nama", value: searchPengguna, operation: "LIKE" }],
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
              <Text fontSize="l">Tambah Kendaraan Rutin</Text>
              <NextLink href="/dashboard/kendaraan-rutin">
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
                  penggunaId: -1,
                  nomorBap: "",
                  fileBap: "",
                  tanggalBap: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createKendaraanRutin({
                    variables: {
                      payload: values,
                      fileBap,
                    },
                    update: (cache) => {
                      cache.evict({ fieldName: "kendaraanRutins" });
                    },
                  });
                  if (response.data?.createKendaraanRutin.errors) {
                    setErrors(
                      toErrorMap(response.data.createKendaraanRutin.errors)
                    );
                  } else if (
                    response.data?.createKendaraanRutin.kendaraanRutin
                  ) {
                    router.push("/dashboard/kendaraan-rutin");
                  }
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
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
                    />
                    <AutoCompleteField
                      name="penggunaId"
                      label="Pengguna"
                      placeholder="Pilih Pengguna"
                      ChildrenIcon={FaUsers}
                      options={
                        penggunas?.penggunas.data && !penggunasLoading
                          ? penggunas.penggunas.data
                          : []
                      }
                      initialValue=""
                      setSearch={setSearchPengguna}
                      fieldName="nama"
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="nomorBap"
                      label="Nomor BAP"
                      placeholder="Nomor BAP"
                    />
                    <FileField
                      name="fileBap"
                      label="File BAP"
                      placeholder="File BAP"
                      setFile={setFileBap}
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="tanggalBap"
                      label="Tanggal BAP"
                      placeholder="Tanggal BAP"
                      type="date"
                    />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Tambah Kendaraan Rutin
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

export default DashboardKendaraanRutinTambah;

import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AutoCompleteField } from "../../../../components/AutoCompleteField";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { FileField } from "../../../../components/FileField";
import { InputField } from "../../../../components/InputField";
import {
  useKendaraansQuery,
  usePenggunaRutinQuery,
  usePenggunasQuery,
  useUpdatePenggunaRutinMutation,
} from "../../../../generated/graphql";
import { useIsOperator } from "../../../../middlewares/useIsOperator";
import { getFormattedDate } from "../../../../utils/getFormattedDate";
import { useGetIntId } from "../../../../utils/getIntId";
import { toErrorMap } from "../../../../utils/toErrorMap";

const DashboardPenggunaRutinEdit: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Pengguna Rutin",
      link: "/dashboard/pengguna-rutin",
      isCurrentPage: false,
    },
    { text: "Edit", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [updatePenggunaRutin] = useUpdatePenggunaRutinMutation();

  const intId = useGetIntId();
  const { data, loading } = usePenggunaRutinQuery({
    skip: intId === -1,
    variables: { id: intId },
  });

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
            { name: "tipeKendaraan", value: "Kendaraan Rutin", operation: "=" },
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
              <Text fontSize="l">Edit Pengguna Rutin</Text>
              <NextLink href="/dashboard/pengguna-rutin">
                <Link>
                  <Button bg="red.500" color="white">
                    Kembali
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            <Box>
              {!loading && data?.penggunaRutin ? (
                <Formik
                  initialValues={{
                    kendaraanId: data.penggunaRutin.kendaraan.id,
                    penggunaId: data.penggunaRutin.pengguna.id,
                    nomorBap: data.penggunaRutin.nomorBap,
                    fileBap: data.penggunaRutin.fileBap,
                    tanggalBap: getFormattedDate(data.penggunaRutin.tanggalBap),
                  }}
                  onSubmit={async (values, { setErrors }) => {
                    const response = await updatePenggunaRutin({
                      variables: {
                        id: intId,
                        payload: values,
                        fileBap,
                      },
                      update: (cache) => {
                        cache.evict({ fieldName: "penggunaRutins" });
                      },
                    });
                    if (response.data?.updatePenggunaRutin.errors) {
                      setErrors(
                        toErrorMap(response.data.updatePenggunaRutin.errors)
                      );
                    } else if (
                      response.data?.updatePenggunaRutin.penggunaRutin
                    ) {
                      router.push("/dashboard/pengguna-rutin");
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
                        initialValue={data.penggunaRutin.kendaraan.nomorPolisi}
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
                        initialValue={data.penggunaRutin.pengguna.nama}
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
                        Edit Pengguna Rutin
                      </Button>
                    </Form>
                  )}
                </Formik>
              ) : (
                "Loading..."
              )}
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardPenggunaRutinEdit;

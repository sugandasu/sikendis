import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Stack, Flex, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { InputField } from "../../../components/InputField";
import { SelectionField } from "../../../components/SelectionField";
import { useCreateKendaraanMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";
import NextLink from "next/link";

const DashboardKendaraanTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Kendaraan", link: "/dashboard/kendaraan", isCurrentPage: false },
    { text: "Tambah", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [createKendaraan] = useCreateKendaraanMutation();
  const tipeRodas = [
    { text: "Kendaraan Roda 2", id: "Roda 2" },
    { text: "Kendaraan Roda 4", id: "Roda 4" },
  ];
  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Tambah Kendaraan</Text>
              <NextLink href="/dashboard/kendaraan">
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
                  tipeRoda: "",
                  kode: "",
                  nama: "",
                  nomorRegister: "",
                  merek: "",
                  ukuranCc: "",
                  bahan: "",
                  tahunPembelian: "",
                  nomorRangka: "",
                  nomorMesin: "",
                  nomorPolisi: "",
                  nomorBpkb: "",
                  asalUsul: "",
                  harga: "",
                  keterangan: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createKendaraan({
                    variables: { payload: values },
                    update: (cache) => {
                      cache.evict({ fieldName: "kendaraans" });
                    },
                  });
                  if (response.data?.createKendaraan.errors) {
                    setErrors(toErrorMap(response.data.createKendaraan.errors));
                  } else if (response.data?.createKendaraan.kendaraan) {
                    router.push("/dashboard/kendaraan");
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <SelectionField
                      name="tipeRoda"
                      label="Tipe Kendaraan"
                      placeholder="Tipe Kendaraan"
                      options={tipeRodas}
                      textField="text"
                      valueField="id"
                    />
                    <InputField
                      name="kode"
                      label="Kode Barang"
                      placeholder="kode barang"
                    />
                    <InputField
                      name="nama"
                      label="Nama Barang"
                      placeholder="nama barang"
                    />
                    <InputField
                      name="nomorRegister"
                      label="Nomor Register"
                      placeholder="nomor register"
                    />
                    <InputField
                      name="merek"
                      label="Merek Kendaraan"
                      placeholder="merek kendaraan"
                    />
                    <InputField
                      name="ukuranCc"
                      label="Ukuran CC"
                      placeholder="ukuran cc"
                    />
                    <InputField
                      name="bahan"
                      label="Bahan"
                      placeholder="bahan"
                    />
                    <InputField
                      name="tahunPembelian"
                      label="Tahun Pembelian"
                      placeholder="tahun pembelian"
                    />
                    <InputField
                      name="nomorRangka"
                      label="Nomor Rangka"
                      placeholder="nomor rangka"
                    />
                    <InputField
                      name="nomorMesin"
                      label="Nomor Mesin"
                      placeholder="nomor mesin"
                    />
                    <InputField
                      name="nomorPolisi"
                      label="Nomor Polisi"
                      placeholder="nomor polisi"
                    />
                    <InputField
                      name="nomorBpkb"
                      label="Nomor BPKB"
                      placeholder="nomor bpkb"
                    />
                    <InputField
                      name="asalUsul"
                      label="Asal Usul kendaraan"
                      placeholder="asal usul kendaraan"
                    />
                    <InputField
                      name="harga"
                      label="Harga"
                      placeholder="harga"
                    />
                    <InputField
                      name="keterangan"
                      label="Keterangan"
                      placeholder="keterangan"
                      textarea
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

export default DashboardKendaraanTambah;

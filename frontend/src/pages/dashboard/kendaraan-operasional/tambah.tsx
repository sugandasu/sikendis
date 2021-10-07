import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Stack, Flex, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { InputField } from "../../../components/InputField";
import { SelectionField } from "../../../components/SelectionField";
import { useCreateKendaraanMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";
import NextLink from "next/link";
import { FileField } from "../../../components/FileField";

const DashboardKendaraanOperasionalTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Kendaraan Operasional",
      link: "/dashboard/kendaraan-operasional",
      isCurrentPage: false,
    },
    { text: "Tambah", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const [createKendaraan] = useCreateKendaraanMutation();
  const [foto, setFoto] = useState<File>();

  const tipeRodaOptions = [
    { value: "Roda 2" },
    { value: "Roda 3" },
    { value: "Roda 4" },
  ];
  const asalUsulOptions = [{ value: "Pembelian" }, { value: "Hibah" }];
  const bahanBakarOptions = [{ value: "Bensin" }, { value: "Solar" }];

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Tambah Kendaraan Operasional</Text>
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
                  warna: "",
                  bahanBakar: "",
                  harga: "",
                  keterangan: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createKendaraan({
                    variables: { payload: values, foto: foto },
                    update: (cache) => {
                      cache.evict({ fieldName: "kendaraans" });
                    },
                  });
                  if (response.data?.createKendaraan.errors) {
                    setErrors(toErrorMap(response.data.createKendaraan.errors));
                  } else if (response.data?.createKendaraan.kendaraan) {
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
                    <InputField
                      name="kode"
                      label="Kode Barang"
                      placeholder="Kode barang"
                      required={true}
                    />
                    <InputField
                      name="nama"
                      label="Nama Barang"
                      placeholder="Nama barang"
                      required={true}
                    />
                    <InputField
                      name="nomorRegister"
                      label="Nomor Register"
                      placeholder="Nomor register"
                    />
                    <InputField
                      name="merek"
                      label="Merek Kendaraan"
                      placeholder="Merek kendaraan"
                      required={true}
                    />
                    <InputField
                      name="ukuranCc"
                      label="Ukuran CC"
                      placeholder="Ukuran cc"
                    />
                    <InputField
                      name="bahan"
                      label="Bahan"
                      placeholder="Bahan"
                    />
                    <InputField
                      name="tahunPembelian"
                      label="Tahun Pembelian"
                      placeholder="Tahun pembelian"
                      required={true}
                    />
                    <InputField
                      name="nomorRangka"
                      label="Nomor Rangka"
                      placeholder="Nomor rangka"
                      required={true}
                    />
                    <InputField
                      name="nomorMesin"
                      label="Nomor Mesin"
                      placeholder="Nomor mesin"
                      required={true}
                    />
                    <InputField
                      name="nomorPolisi"
                      label="Nomor Polisi"
                      placeholder="Nomor polisi"
                    />
                    <InputField
                      name="nomorBpkb"
                      label="Nomor BPKB"
                      placeholder="Nomor bpkb"
                    />
                    <SelectionField
                      name="asalUsul"
                      label="Asal Usul"
                      placeholder="Asal usul"
                      options={asalUsulOptions}
                      textField="value"
                      valueField="value"
                    ></SelectionField>
                    <InputField
                      name="warna"
                      label="Warna kendaraan"
                      placeholder="Warna kendaraan"
                    />
                    <SelectionField
                      name="bahanBakar"
                      label="Bahan Bakar"
                      placeholder="Bahan bakar"
                      options={bahanBakarOptions}
                      textField="value"
                      valueField="value"
                    ></SelectionField>
                    <InputField
                      name="harga"
                      label="Harga"
                      placeholder="Harga"
                    />
                    <FileField
                      name="foto"
                      label="Foto Kendaraan"
                      placeholder="Foto"
                      setFile={setFoto}
                      setFieldValue={setFieldValue}
                    />
                    <InputField
                      name="keterangan"
                      label="Keterangan"
                      placeholder="Keterangan"
                      textarea
                    />
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      colorScheme="teal"
                    >
                      Tambah Kendaraan
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

export default DashboardKendaraanOperasionalTambah;

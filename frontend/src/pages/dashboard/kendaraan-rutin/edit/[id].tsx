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
import { SelectionField } from "../../../../components/SelectionField";
import {
  useKendaraanQuery,
  useUpdateKendaraanMutation,
} from "../../../../generated/graphql";
import { useIsOperator } from "../../../../middlewares/useIsOperator";
import { useGetIntId } from "../../../../utils/getIntId";
import { toErrorMap } from "../../../../utils/toErrorMap";

const DashboardKendaraanRutinEdit: React.FC<{}> = ({}) => {
  useIsOperator();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Kendaraan Rutin",
      link: "/dashboard/kendaraan-rutin",
      isCurrentPage: false,
    },
    { text: "Edit", link: "#", isCurrentPage: true },
  ];
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = useKendaraanQuery({
    skip: intId === -1,
    variables: { id: intId },
  });
  const [updateKendaraan] = useUpdateKendaraanMutation();
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
        <Box rounded="md" boxShadow="md" bg="white" mb={5}>
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Edit Kendaraan</Text>
              <NextLink href="/dashboard/kendaraan-rutin">
                <Link>
                  <Button bg="red.500" color="white">
                    Kembali
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            <Box>
              {!loading && data?.kendaraan ? (
                <Formik
                  initialValues={{
                    tipeKendaraan: data.kendaraan.tipeKendaraan,
                    tipeRoda: data.kendaraan.tipeRoda,
                    kode: data.kendaraan.kode,
                    nama: data.kendaraan.nama,
                    nomorRegister: data.kendaraan.nomorRegister,
                    merek: data.kendaraan.merek,
                    ukuranCc: data.kendaraan.ukuranCc,
                    bahan: data.kendaraan.bahan,
                    tahunPembelian: data.kendaraan.tahunPembelian,
                    nomorRangka: data.kendaraan.nomorRangka,
                    nomorMesin: data.kendaraan.nomorMesin,
                    nomorPolisi: data.kendaraan.nomorPolisi,
                    nomorBpkb: data.kendaraan.nomorBpkb,
                    asalUsul: data.kendaraan.asalUsul,
                    warna: data.kendaraan.warna,
                    bahanBakar: data.kendaraan.bahanBakar,
                    harga: data.kendaraan.harga,
                    foto: data.kendaraan.foto,
                    keterangan: data.kendaraan.keterangan,
                  }}
                  onSubmit={async (values, { setErrors }) => {
                    const response = await updateKendaraan({
                      variables: { id: intId, payload: values, foto: foto },
                      update: (cache) => {
                        cache.evict({ fieldName: "kendaraans" });
                      },
                    });
                    if (response.data?.updateKendaraan.errors) {
                      setErrors(
                        toErrorMap(response.data.updateKendaraan.errors)
                      );
                    } else if (response.data?.updateKendaraan.kendaraan) {
                      router.push("/dashboard/kendaraan-rutin");
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
                        required={true}
                      />
                      <InputField
                        name="bahan"
                        label="Bahan"
                        placeholder="Bahan"
                        required={true}
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
                        required={true}
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
                        required={true}
                      ></SelectionField>
                      <InputField
                        name="warna"
                        label="Warna kendaraan"
                        placeholder="Warna kendaraan"
                        required={true}
                      />
                      <SelectionField
                        name="bahanBakar"
                        label="Bahan Bakar"
                        placeholder="Bahan bakar"
                        options={bahanBakarOptions}
                        textField="value"
                        valueField="value"
                        required={true}
                      ></SelectionField>
                      <InputField
                        name="harga"
                        label="Harga"
                        placeholder="Harga"
                        required={true}
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
                        Edit Kendaraan
                      </Button>
                    </Form>
                  )}
                </Formik>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardKendaraanRutinEdit;

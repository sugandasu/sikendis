import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../../../../components/InputField";
import {
  useKendaraanQuery,
  useUpdateKendaraanMutation,
} from "../../../../generated/graphql";
import { useIsOperator } from "../../../../middlewares/useIsOperator";
import { useGetIntId } from "../../../../utils/getIntId";
import { toErrorMap } from "../../../../utils/toErrorMap";

const DashboardKendaraanEdit: React.FC<{}> = ({}) => {
  useIsOperator();
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = useKendaraanQuery({
    skip: intId === -1,
    variables: { id: intId },
  });
  const [updateKendaraan] = useUpdateKendaraanMutation();

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!data?.kendaraan) {
    return <Box>Data tidak ditemukan</Box>;
  }
  return (
    <Box>
      <Box>Tambah Pengguna</Box>
      <Formik
        initialValues={{
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
          harga: data.kendaraan.harga,
          keterangan: data.kendaraan.keterangan,
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await updateKendaraan({
            variables: { id: intId, payload: values },
          });
          if (response.data?.updateKendaraan.errors) {
            setErrors(toErrorMap(response.data.updateKendaraan.errors));
          } else if (response.data?.updateKendaraan.kendaraan) {
            router.push("/dashboard/kendaraan");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="tipeRoda"
              label="Tipe Roda"
              placeholder="tipe roda"
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
            <InputField name="bahan" label="Bahan" placeholder="bahan" />
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
            <InputField name="harga" label="Harga" placeholder="harga" />
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
              Edit Pengguna
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DashboardKendaraanEdit;
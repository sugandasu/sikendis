import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { useCreateKendaraanMutation } from "../../../generated/graphql";
import { useIsOperator } from "../../../middlewares/useIsOperator";
import { toErrorMap } from "../../../utils/toErrorMap";

const DashboardKendaraanTambah: React.FC<{}> = ({}) => {
  useIsOperator();
  const router = useRouter();
  const [createKendaraan] = useCreateKendaraanMutation();
  return (
    <Box>
      <Box>Tambah Pengguna</Box>
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
              Tambah Pengguna
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DashboardKendaraanTambah;

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { useKendaraanQuery } from "../../../../generated/graphql";
import { useIsAuth } from "../../../../middlewares/useIsAuth";
import { useGetIntId } from "../../../../utils/getIntId";

const DashboardKendaraanOperasionalDetail: React.FC<{}> = ({}) => {
  useIsAuth();

  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Kendaraan Rutin",
      link: "/dashboard/kendaraan-rutin",
      isCurrentPage: false,
    },
    { text: "Detail", link: "#", isCurrentPage: true },
  ];

  const intId = useGetIntId();
  const { data, loading } = useKendaraanQuery({
    skip: intId === -1,
    variables: { id: intId },
  });

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white" mb={5}>
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={5}>
              <Text fontSize="l">Detail Kendaraan Rutin</Text>
              <NextLink href="/dashboard/kendaraan-rutin">
                <Link>
                  <Button bg="red.500" color="white">
                    Kembali
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            {!loading && data?.kendaraan ? (
              <VStack align="left" spacing={4}>
                <Box>
                  <Heading fontSize="l">Tipe Roda</Heading>
                  <Text>{data.kendaraan.tipeRoda || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Kode</Heading>
                  <Text>{data.kendaraan.kode || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nama</Heading>
                  <Text>{data.kendaraan.nama || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Registrasi</Heading>
                  <Text>{data.kendaraan.nomorRegister || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Merek</Heading>
                  <Text>{data.kendaraan.merek || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">ukuranCc</Heading>
                  <Text>{data.kendaraan.ukuranCc || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">bahan</Heading>
                  <Text>{data.kendaraan.bahan || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Tahun Pembelian</Heading>
                  <Text>{data.kendaraan.tahunPembelian || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Rangka</Heading>
                  <Text>{data.kendaraan.nomorRangka || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Mesin</Heading>
                  <Text>{data.kendaraan.nomorMesin || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Polisi</Heading>
                  <Text>{data.kendaraan.nomorPolisi || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor BPKB</Heading>
                  <Text>{data.kendaraan.nomorBpkb || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Asal Usul</Heading>
                  <Text>{data.kendaraan.asalUsul || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Warna</Heading>
                  <Text>{data.kendaraan.warna || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Bahan Bakar</Heading>
                  <Text>{data.kendaraan.bahanBakar || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Harga</Heading>
                  <Text>{data.kendaraan.harga || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Foto</Heading>
                  {data.kendaraan.foto ? (
                    <Image
                      src={data.kendaraan.fotoUrl}
                      alt="Gambar Kendaraan"
                    ></Image>
                  ) : (
                    "-"
                  )}
                </Box>
                <Box>
                  <Heading fontSize="l">Keterangan</Heading>
                  <Text>{data.kendaraan.keterangan || "-"}</Text>
                </Box>
              </VStack>
            ) : (
              <Box>"Loading..."</Box>
            )}
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardKendaraanOperasionalDetail;

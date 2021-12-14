import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { usePenggunaRutinQuery } from "../../../../generated/graphql";
import { useIsAuth } from "../../../../middlewares/useIsAuth";
import { useGetIntId } from "../../../../utils/getIntId";

const DashboardPenggunaRutinDetail: React.FC<{}> = ({}) => {
  useIsAuth();

  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Pengguna Rutin",
      link: "/dashboard/pengguna-rutin",
      isCurrentPage: false,
    },
    { text: "Detail", link: "#", isCurrentPage: true },
  ];

  const intId = useGetIntId();
  const { data, loading } = usePenggunaRutinQuery({
    skip: intId === -1,
    variables: { id: intId },
  });

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white" mb={5}>
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={5}>
              <Text fontSize="l">Detail Pengguna Rutin</Text>
              <NextLink href="/dashboard/pengguna-rutin">
                <Link>
                  <Button bg="red.500" color="white">
                    Kembali
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            {!loading && data?.penggunaRutin ? (
              <VStack align="left" spacing={4}>
                <Box>
                  <Heading fontSize="l">Nip</Heading>
                  <Text>{data.penggunaRutin.pengguna.nip || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nama</Heading>
                  <Text>{data.penggunaRutin.pengguna.nama || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Jabatan</Heading>
                  <Text>{data.penggunaRutin.pengguna.jabatan || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Instansi</Heading>
                  <Text>{data.penggunaRutin.pengguna.instansi || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Sub bagian</Heading>
                  <Text>{data.penggunaRutin.pengguna.subBagian || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Rangka</Heading>
                  <Text>{data.penggunaRutin.kendaraan.nomorRangka || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Mesin</Heading>
                  <Text>{data.penggunaRutin.kendaraan.nomorMesin || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Polisi</Heading>
                  <Text>{data.penggunaRutin.kendaraan.nomorPolisi || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor BAP</Heading>
                  <Text>{data.penggunaRutin.nomorBap || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Tanggal BAP</Heading>
                  <Text>{data.penggunaRutin.tanggalBap || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">File BAP</Heading>
                  {data.penggunaRutin.tanggalBap ? (
                    <Link href={data.penggunaRutin.fileBapUrl} isExternal>
                      Download File Bap <ExternalLinkIcon />
                    </Link>
                  ) : (
                    "-"
                  )}
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

export default DashboardPenggunaRutinDetail;

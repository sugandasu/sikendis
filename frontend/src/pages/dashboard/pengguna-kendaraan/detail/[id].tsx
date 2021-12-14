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
import { usePenggunaQuery } from "../../../../generated/graphql";
import { useIsAuth } from "../../../../middlewares/useIsAuth";
import { useGetIntId } from "../../../../utils/getIntId";

const DashboardPenggunaKendaraanDetail: React.FC<{}> = ({}) => {
  useIsAuth();

  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Pengguna Kendaraan",
      link: "/dashboard/pengguna-kendaraan",
      isCurrentPage: false,
    },
    { text: "Detail", link: "#", isCurrentPage: true },
  ];

  const intId = useGetIntId();
  const { data, loading } = usePenggunaQuery({
    skip: intId === -1,
    variables: { id: intId },
  });

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white" mb={5}>
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={5}>
              <Text fontSize="l">Detail Pengguna Kendaraan</Text>
              <NextLink href="/dashboard/pengguna-kendaraan">
                <Link>
                  <Button bg="red.500" color="white">
                    Kembali
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            {!loading && data?.pengguna ? (
              <VStack align="left" spacing={4}>
                <Box>
                  <Heading fontSize="l">Nip</Heading>
                  <Text>{data.pengguna.nip || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nama</Heading>
                  <Text>{data.pengguna.nama || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Jabatan</Heading>
                  <Text>{data.pengguna.jabatan || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Instansi</Heading>
                  <Text>{data.pengguna.instansi || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Sub bagian</Heading>
                  <Text>{data.pengguna.subBagian || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Foto Profil</Heading>
                  {data.pengguna.fotoProfil ? (
                    <Image
                      src={data.pengguna.fotoProfil}
                      alt="Gambar Profil"
                    ></Image>
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

export default DashboardPenggunaKendaraanDetail;

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
import { usePeminjamanOperasionalQuery } from "../../../../generated/graphql";
import { useIsAuth } from "../../../../middlewares/useIsAuth";
import { useGetIntId } from "../../../../utils/getIntId";

const DashboardPenggunaKendaraanDetail: React.FC<{}> = ({}) => {
  useIsAuth();

  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    {
      text: "Peminjaman Operasional",
      link: "/dashboard/peminjaman-operasional",
      isCurrentPage: false,
    },
    { text: "Detail", link: "#", isCurrentPage: true },
  ];

  const intId = useGetIntId();
  const { data, loading } = usePeminjamanOperasionalQuery({
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
            {!loading && data?.peminjamanOperasional ? (
              <VStack align="left" spacing={4}>
                <Box>
                  <Heading fontSize="l">Nomor Polisi</Heading>
                  <Text>
                    {data.peminjamanOperasional.kendaraan.nomorPolisi || "-"}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Instansi</Heading>
                  <Text>{data.peminjamanOperasional.instansi || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Penanggungjawab</Heading>
                  <Text>
                    {data.peminjamanOperasional.penanggungJawab || "-"}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Telepon</Heading>
                  <Text>{data.peminjamanOperasional.nomorTelepon || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Surat Disposisi</Heading>
                  <Text>
                    {data.peminjamanOperasional.nomorSuratDisposisi || "-"}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="l">File Surat Disposisi</Heading>
                  {data.peminjamanOperasional.fileSuratDisposisiUrl ? (
                    <Link
                      href={data.peminjamanOperasional.fileSuratDisposisi}
                      isExternal
                    >
                      Download File Surat Disposisi <ExternalLinkIcon />
                    </Link>
                  ) : (
                    "-"
                  )}
                </Box>
                <Box>
                  <Heading fontSize="l">Nomor Surat Permohonan</Heading>
                  <Text>
                    {data.peminjamanOperasional.nomorSuratPermohonan || "-"}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="l">File Surat Permohonan</Heading>
                  {data.peminjamanOperasional.fileSuratPermohonanUrl ? (
                    <Link
                      href={data.peminjamanOperasional.fileSuratPermohonanUrl}
                      isExternal
                    >
                      Download File Surat Permohonan <ExternalLinkIcon />
                    </Link>
                  ) : (
                    "-"
                  )}
                </Box>
                <Box>
                  <Heading fontSize="l">Tanggal Mulai</Heading>
                  <Text>{data.peminjamanOperasional.tanggalMulai || "-"}</Text>
                </Box>
                <Box>
                  <Heading fontSize="l">Tanggal Selesai</Heading>
                  <Text>
                    {data.peminjamanOperasional.tanggalSelesai || "-"}
                  </Text>
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

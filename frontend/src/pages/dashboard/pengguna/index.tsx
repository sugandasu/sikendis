import { Box, Link } from "@chakra-ui/layout";
import { Table, TableCaption, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";

const DashboardPenggunaIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  return (
    <Box>
      <Box>Pengguna Index</Box>
      <NextLink href="/dashboard/pengguna/tambah">
        <Link>
          <Button>Tambah</Button>
        </Link>
      </NextLink>
      <Table>
        <TableCaption>Pengguna kendaraan</TableCaption>
        <Thead>
          <Tr>
            <Th>Foto</Th>
            <Th>Nip</Th>
            <Th>Nama</Th>
            <Th>Jabatan</Th>
            <Th>Instansi</Th>
            <Th>Sub Bagian</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody></Tbody>
      </Table>
    </Box>
  );
};

export default DashboardPenggunaIndex;

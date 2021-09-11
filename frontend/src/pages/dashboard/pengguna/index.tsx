import { Box } from "@chakra-ui/layout";
import { Table, TableCaption, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import React from "react";

const DashboardPenggunaIndex: React.FC<{}> = ({}) => {
  return (
    <Box>
      <Box>Pengguna Index</Box>
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

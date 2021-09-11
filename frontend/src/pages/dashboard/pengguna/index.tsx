import { Box, Flex, Link } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import React from "react";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import NextLink from "next/link";
import { Button, IconButton } from "@chakra-ui/button";
import { usePenggunasQuery } from "../../../generated/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const DashboardPenggunaIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const { data, loading } = usePenggunasQuery({
    variables: { limit: 10 },
    notifyOnNetworkStatusChange: true,
  });
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
        {!data && loading ? (
          <Tbody>
            <Tr>
              <Td colSpan={7}>Data kendaraan kosong</Td>
            </Tr>
          </Tbody>
        ) : (
          <Tbody>
            {data.penggunas.penggunas.map((pengguna) =>
              !pengguna ? null : (
                <Tr key={pengguna.id}>
                  <Td></Td>
                  <Td>{pengguna.nip}</Td>
                  <Td>{pengguna.nama}</Td>
                  <Td>{pengguna.jabatan}</Td>
                  <Td>{pengguna.instansi}</Td>
                  <Td>{pengguna.subBagian}</Td>
                  <Td>
                    <Flex>
                      <NextLink
                        href="/dashboard/pengguna/edit/[id]"
                        as={`/dashboard/pengguna/edit/${pengguna.id}`}
                      >
                        <Link>
                          <IconButton
                            colorScheme="blue"
                            aria-label="Edit"
                            icon={<EditIcon />}
                          />
                        </Link>
                      </NextLink>
                      <IconButton
                        colorScheme="red"
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        )}
      </Table>
    </Box>
  );
};

export default DashboardPenggunaIndex;

import { Button } from "@chakra-ui/button";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import {
  useDeleteKendaraanMutation,
  useKendaraansQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";

const DashboardKendaraanIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const { data, loading } = useKendaraansQuery({
    variables: { limit: 10 },
    notifyOnNetworkStatusChange: true,
  });
  const [deleteKendaraan] = useDeleteKendaraanMutation();
  return (
    <Box>
      <Box>Kendaraan Index</Box>
      <NextLink href="/dashboard/kendaraan/tambah">
        <Link>
          <Button>Tambah</Button>
        </Link>
      </NextLink>
      <Table>
        <TableCaption>Pengguna kendaraan</TableCaption>
        <Thead>
          <Tr>
            <Th>Tipe Roda</Th>
            <Th>Kode</Th>
            <Th>Nomor Rangka</Th>
            <Th>Nomor Polisi</Th>
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
            {data.kendaraans?.kendaraans.map((kendaraan) =>
              !kendaraan ? null : (
                <Tr key={kendaraan.id}>
                  <Td>{kendaraan.tipeRoda}</Td>
                  <Td>{kendaraan.kode}</Td>
                  <Td>{kendaraan.nomorRangka}</Td>
                  <Td>{kendaraan.nomorPolisi}</Td>
                  <Td>
                    <Flex>
                      <NextLink
                        href="/dashboard/kendaraan/edit/[id]"
                        as={`/dashboard/kendaraan/edit/${kendaraan.id}`}
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
                        onClick={() => {
                          deleteKendaraan({ variables: { id: kendaraan.id } });
                        }}
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

export default DashboardKendaraanIndex;

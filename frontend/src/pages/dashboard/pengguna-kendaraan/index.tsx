import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useMemo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { DeleteDialog } from "../../../components/DeleteDialog";
import { TableClient } from "../../../components/TableClient";
import {
  Pengguna,
  useDeletePenggunaMutation,
  usePenggunasQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";

const DashboardPenggunaKendaraanIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Pengguna Kendaraan", link: "#", isCurrentPage: true },
  ];

  const { data, loading } = usePenggunasQuery({
    variables: {
      options: {
        limit: 0,
        page: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState<Pengguna>();
  const [deletePengguna] = useDeletePenggunaMutation();
  const deleteConfirm = () => {
    deletePengguna({
      variables: { id: currentRow.id },
      update: (cache) => {
        cache.evict({ id: `Pengguna:${currentRow.id}` });
      },
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "nama";

  const columns = useMemo<Column<Pengguna>[]>(
    () => [
      {
        Header: "Foto",
        id: "fotoProfil",
        Cell: (cellObj) => {
          return (
            <Flex justify="center">
              {cellObj.row.values.fotoProfilUrl ? (
                <Avatar
                  size="sm"
                  src={cellObj.row.values.fotoProfilUrl}
                ></Avatar>
              ) : (
                <Avatar size="sm"></Avatar>
              )}
            </Flex>
          );
        },
        disableSortBy: true,
        disableGlobalFilter: true,
      },
      {
        Header: "Nip",
        id: "nip",
      },
      {
        Header: "Nama",
        id: "nama",
      },
      {
        Header: "Jabatan",
        id: "jabatan",
        hidden: true,
      },
      {
        Header: "Instansi",
        id: "instansi",
        hidden: true,
      },
      {
        Header: "Sub Bagian",
        id: "subBagian",
        hidden: true,
      },
      {
        Header: "Aksi",
        id: "id",
        Cell: (cellObj) => {
          return (
            <HStack spacing={1}>
              <NextLink
                href={`/dashboard/pengguna-kendaraan/edit/${cellObj.row.values.id}`}
              >
                <Link>
                  <IconButton
                    aria-label="Ubah"
                    size="sm"
                    bgColor="transparent"
                    color="blue.500"
                    icon={<FaEdit />}
                  ></IconButton>
                </Link>
              </NextLink>
              <IconButton
                size="sm"
                aria-label="Hapus"
                bgColor="transparent"
                color="red.500"
                icon={<FaTrash />}
                onClick={() => {
                  setCurrentRow(cellObj.row.values as Pengguna);
                  setDeleteDialogOpen(true);
                }}
              ></IconButton>
            </HStack>
          );
        },
        disableSortBy: true,
        disableGlobalFilter: true,
      },
    ],
    []
  );

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={8}>
              <Text fontSize="l">Pengguna Kendaraan</Text>
              <Menu>
                <MenuButton
                  as={Button}
                  bg="blue.500"
                  color="white"
                  rightIcon={<ChevronDownIcon />}
                >
                  Aksi
                </MenuButton>
                <MenuList>
                  <NextLink href="/dashboard/pengguna-kendaraan/tambah">
                    <Link>
                      <MenuItem>Tambah</MenuItem>
                    </Link>
                  </NextLink>
                  <NextLink href="/dashboard/pengguna-kendaraan/import">
                    <Link>
                      <MenuItem>Import</MenuItem>
                    </Link>
                  </NextLink>
                </MenuList>
              </Menu>
            </Flex>
            <Box>
              {!loading && data?.penggunas.data ? (
                <TableClient
                  columns={columns}
                  data={data.penggunas.data}
                  tableCaption="Pengguna Kendaraan"
                  sortBy={[{ id: "nama", desc: false }]}
                ></TableClient>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Stack>
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        deleteDialogCancel={deleteDialogCancel}
        deleteDialogClose={deleteDialogClose}
        currentRow={currentRow}
        dialogKey={dialogKey}
        deleteConfirm={deleteConfirm}
      ></DeleteDialog>
    </DashboardLayout>
  );
};

export default DashboardPenggunaKendaraanIndex;

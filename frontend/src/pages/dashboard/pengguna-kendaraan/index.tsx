import { Button } from "@chakra-ui/button";
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { DeleteDialog } from "../../../components/DeleteDialog";
import { SimpleTable } from "../../../components/SimpleTable";
import {
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
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState({ id: -1, nama: "" });
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

  const headers = [
    {
      label: "#",
      key: "fotoProfil",
      hideSm: true,
      render: (row) => {
        return row.fotoProfilUrl ? (
          <Avatar size="sm" src={row.fotoProfilUrl}></Avatar>
        ) : (
          <Avatar size="sm"></Avatar>
        );
      },
    },
    { label: "Nama", key: "nama" },
    { label: "Nip", key: "nip", hideSm: true },
    {
      label: "Jabatan",
      key: "jabatan",
      hide: true,
    },
    { label: "Instansi", key: "instansi", hideSm: true, hideMd: true },
    { label: "Sub Bagian", key: "subBagian", hideSm: true, hideMd: true },
    {
      label: "Aksi",
      key: "id",
      render: (row: any, showView: boolean, setViewRow: any, onOpen: any) => {
        return (
          <Menu>
            <MenuButton as={Button}>
              <FaEllipsisV></FaEllipsisV>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setViewRow(row);
                  onOpen();
                }}
              >
                <Text>View</Text>
              </MenuItem>
              <NextLink
                href="/dashboard/pengguna-kendaraan/edit/[id]"
                as={`/dashboard/pengguna-kendaraan/edit/${row.id}`}
              >
                <Link>
                  <MenuItem>Edit</MenuItem>
                </Link>
              </NextLink>
              <MenuItem
                onClick={() => {
                  setCurrentRow(row);
                  setDeleteDialogOpen(true);
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
    },
  ];

  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Pengguna Kendaraan</Text>
              <NextLink href="/dashboard/pengguna-kendaraan/tambah">
                <Link>
                  <Button bg="blue.500" color="white">
                    Tambah
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            <Box>
              {loading ? (
                "Loading..."
              ) : (
                <SimpleTable
                  headers={headers}
                  data={data.penggunas}
                  tableCaption="Pengguna Kendaraan"
                ></SimpleTable>
              )}
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

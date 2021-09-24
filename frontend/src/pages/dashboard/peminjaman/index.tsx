import { Button } from "@chakra-ui/button";
import {
  Avatar,
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
  useDeletePeminjamanMutation,
  usePeminjamansQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";

const DashboardPeminjamanIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Peminjaman", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = usePeminjamansQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState({ id: -1, nama: "" });
  const [deletePeminjaman] = useDeletePeminjamanMutation();
  const deleteConfirm = () => {
    deletePeminjaman({
      variables: { id: currentRow.id },
      update: (cache) => {
        cache.evict({ id: `peminjaman:${currentRow.id}` });
      },
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "nama";

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!loading && !data?.peminjamans?.data) {
    return <Box>Error data...</Box>;
  }

  const headers = [
    {
      label: "Kendaraan",
      key: "kendaraan",
      hideSm: true,
      render: (row) => {
        return row.kendaraan.nomorPolisi;
      },
    },
    {
      label: "Pengguna",
      key: "pengguna",
      hideSm: true,
      render: (row) => {
        return row.pengguna.nama;
      },
    },
    { label: "Nomor Disposisi", key: "nomorDisposisi", hide: true },
    {
      label: "Nomor Surat Permohonan",
      key: "nomorSuratPermohonan",
      hide: true,
    },
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
                href="/dashboard/pengguna/edit/[id]"
                as={`/dashboard/pengguna/edit/${row.id}`}
              >
                <Link>
                  <MenuItem>Download Surat Disposisi</MenuItem>
                </Link>
              </NextLink>
              <NextLink
                href="/dashboard/pengguna/edit/[id]"
                as={`/dashboard/pengguna/edit/${row.id}`}
              >
                <Link>
                  <MenuItem>Download Surat Permohonan</MenuItem>
                </Link>
              </NextLink>
              <NextLink
                href="/dashboard/peminjaman/edit/[id]"
                as={`/dashboard/peminjaman/edit/${row.id}`}
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
        <Box borderWidth="1px" borderRadius="md">
          <Box p={5}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Peminjaman</Text>
              <NextLink href="/dashboard/peminjaman/tambah">
                <Link>
                  <Button bg="blue.500" color="white">
                    Tambah
                  </Button>
                </Link>
              </NextLink>
            </Flex>
            <Box>
              <SimpleTable
                headers={headers}
                data={data.peminjamans}
                tableCaption="Peminjaman"
              ></SimpleTable>
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

export default DashboardPeminjamanIndex;

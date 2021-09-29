import { Button } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import {
  Flex,
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
  useDeleteKendaraanMutation,
  useKendaraansQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";

const DashboardKendaraanRoda4Index: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Kendaraan Roda 4", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = useKendaraansQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
        filter: {
          columns: [{ name: "tipeRoda", value: "Roda 4", operation: "=" }],
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState({ id: -1, nama: "" });
  const [deleteKendaraan] = useDeleteKendaraanMutation();
  const deleteConfirm = () => {
    deleteKendaraan({
      variables: { id: currentRow.id },
      update: (cache) => {
        cache.evict({ id: `Kendaraan:${currentRow.id}` });
      },
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "nomorPolisi";

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!loading && !data?.kendaraans?.data) {
    return <Box>Error data...</Box>;
  }

  const headers = [
    {
      label: "Nomor Polisi",
      key: "nomorPolisi",
    },
    { label: "Kode", key: "kode", hide: true },
    { label: "Nama", key: "nama", hide: true },
    {
      label: "Nomor Register",
      key: "nomorRegister",
      hide: true,
    },
    { label: "Merek", key: "merek", hideSm: true, hideMd: true },
    {
      label: "Ukuran CC",
      key: "ukuranCc",
      hide: true,
    },
    { label: "Bahan", key: "bahan", hide: true },
    {
      label: "Tahun Pembelian",
      key: "tahunPembelian",
      hideSm: true,
      hideMd: true,
    },
    {
      label: "Nomor Rangka",
      key: "nomorRangka",
      hide: true,
    },
    {
      label: "Nomor Mesin",
      key: "nomorMesin",
      hide: true,
    },
    {
      label: "Nomor Bpkb",
      key: "nomorBpkb",
      hide: true,
    },
    {
      label: "Asal Usul",
      key: "asalUsul",
      hide: true,
    },
    {
      label: "Harga",
      key: "harga",
      hide: true,
    },
    {
      label: "Keterangan",
      key: "keterangan",
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
                href="/dashboard/kendaraan-roda-4/edit/[id]"
                as={`/dashboard/kendaraan-roda-4/edit/${row.id}`}
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
              <Text fontSize="l">Kendaraan Roda 4</Text>
              <NextLink href="/dashboard/kendaraan-roda-4/tambah">
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
                data={data.kendaraans}
                tableCaption="Kendaraan"
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

export default DashboardKendaraanRoda4Index;

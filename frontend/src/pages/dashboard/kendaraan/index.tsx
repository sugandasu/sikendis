import { Button } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import {
  Avatar,
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

const DashboardKendaraanIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Kendaraan", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = useKendaraansQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState({ id: -1, nama: "" });
  const [deleteKendaraan] = useDeleteKendaraanMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "nama";

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!loading && !data?.kendaraans?.data) {
    return <Box>Error data...</Box>;
  }

  const headers = [
    { label: "Tipe Kendaraan", key: "tipeRoda" },
    { label: "Kode", key: "kode", hide: true },
    { label: "Nama", key: "nama", hide: true },
    {
      label: "Nomor Register",
      key: "nomorRegister",
      hide: true,
    },
    { label: "merek", key: "merek", hideSm: true, hideMd: true },
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
      label: "Nomor Polisi",
      key: "nomorPolisi",
    },
    {
      label: "Nomor Bpkb",
      key: "nomorBpkb",
      hide: true,
    },
    {
      label: "Asal Usul",
      key: "asalUsul",
      hideSm: true,
      hideMd: true,
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
              {showView ? (
                <MenuItem
                  onClick={() => {
                    setViewRow(row);
                    onOpen();
                  }}
                >
                  <Text>View</Text>
                </MenuItem>
              ) : null}

              <NextLink
                href="/dashboard/kendaraan/edit/[id]"
                as={`/dashboard/kendaraan/edit/${row.id}`}
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
              <Text fontSize="l">Kendaraan</Text>
              <NextLink href="/dashboard/kendaraan/tambah">
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
        deleteConfirm={deleteKendaraan}
      ></DeleteDialog>
    </DashboardLayout>
  );
};

export default DashboardKendaraanIndex;

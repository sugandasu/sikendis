import { Button } from "@chakra-ui/button";
import {
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
  useDeletePenggunaRutinMutation,
  usePenggunaRutinsQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const DashboardPenggunaRutinIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Pengguna Rutin", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = usePenggunaRutinsQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState({ id: -1, nama: "" });
  const [deletePenggunaRutin] = useDeletePenggunaRutinMutation();
  const deleteConfirm = () => {
    deletePenggunaRutin({
      variables: { id: currentRow.id },
      update: (cache) => {
        cache.evict({ id: `PenggunaRutin:${currentRow.id}` });
      },
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "nomorBap";

  const headers = [
    {
      label: "Kendaraan",
      key: "kendaraan",
      render: (row) => {
        return row?.kendaraan?.nomorPolisi;
      },
    },
    {
      label: "Pengguna",
      key: "pengguna",
      hideSm: true,
      render: (row) => {
        return row?.pengguna?.nama;
      },
    },
    { label: "Nomor BAP", key: "nomorBap", hideSm: true },
    {
      label: "Tanggal BAP",
      key: "tanggalBap",
      hideSm: true,
      hideMd: true,
      render: (row: any) => {
        return getFormattedDate(row.tanggalBap);
      },
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
              <Link href={row.fileBapUrl} isExternal>
                <MenuItem>Download File Bap</MenuItem>
              </Link>
              <NextLink
                href="/dashboard/pengguna-rutin/edit/[id]"
                as={`/dashboard/pengguna-rutin/edit/${row.id}`}
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
              <Text fontSize="l">Pengguna Rutin</Text>
              <NextLink href="/dashboard/pengguna-rutin/tambah">
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
                  data={data.penggunaRutins}
                  tableCaption="Pengguna Rutin"
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

export default DashboardPenggunaRutinIndex;
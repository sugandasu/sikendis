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
  useDeleteKendaraanRutinMutation,
  useKendaraansRutinsQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const DashboardKendaraanRutinIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Kendaraan Rutin", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = useKendaraansRutinsQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState({ id: -1, nama: "" });
  const [deleteKendaraanRutin] = useDeleteKendaraanRutinMutation();
  const deleteConfirm = () => {
    deleteKendaraanRutin({
      variables: { id: currentRow.id },
      update: (cache) => {
        cache.evict({ id: `KendaraanRutin:${currentRow.id}` });
      },
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "nomorBap";

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!loading && !data?.kendaraanRutins?.data) {
    return <Box>Error data...</Box>;
  }

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
      render: (row) => {
        return row?.pengguna?.nama;
      },
    },
    { label: "Nomor BAP", key: "nomorBap" },
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
              <NextLink href="" as={``}>
                <Link>
                  <MenuItem>Download File Bap</MenuItem>
                </Link>
              </NextLink>
              <NextLink
                href="/dashboard/kendaraan-rutin/edit/[id]"
                as={`/dashboard/kendaraan-rutin/edit/${row.id}`}
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
              <Text fontSize="l">Kendaraan Rutin</Text>
              <NextLink href="/dashboard/kendaraan-rutin/tambah">
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
                data={data.kendaraanRutins}
                tableCaption="Kendaraan Rutin"
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

export default DashboardKendaraanRutinIndex;

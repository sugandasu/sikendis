import { Button } from "@chakra-ui/button";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useMemo, useState } from "react";
import { FaEdit, FaFileDownload, FaPaperPlane, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { DeleteDialog } from "../../../components/DeleteDialog";
import { TableClient } from "../../../components/TableClient";
import {
  PenggunaRutin,
  useDeletePenggunaRutinMutation,
  usePenggunaRutinsQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import { useRole } from "../../../utils/useRole";

const DashboardPenggunaRutinIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const { isOperator } = useRole();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Pengguna Rutin", link: "#", isCurrentPage: true },
  ];

  const { data, loading } = usePenggunaRutinsQuery({
    variables: {
      options: {
        limit: 0,
        page: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState<PenggunaRutin>();
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

  const columns = useMemo<Column<PenggunaRutin>[]>(
    () => [
      {
        Header: "Kendaraan",
        id: "kendaraan",
        accessor: (row) => {
          return row.kendaraan.nomorPolisi;
        },
      },
      {
        Header: "Pengguna",
        id: "pengguna",
        accessor: (row) => {
          return row.pengguna.nama;
        },
      },
      {
        Header: "Nomor BAP",
        accessor: "nomorBap",
      },
      {
        Header: "Instansi",
        id: "instansi",
        accessor: (row) => {
          return row.pengguna.instansi;
        },
        hidden: true,
      },
      {
        Header: "Sub Bagian",
        id: "subBagian",
        accessor: (row) => {
          return row.pengguna.subBagian;
        },
        hidden: true,
      },
      {
        Header: "Aksi",
        accessor: "id",
        Cell: (cellObj) => {
          console.log(cellObj);
          return (
            <HStack spacing={1}>
              <NextLink
                href={`/dashboard/pengguna-rutin/detail/${cellObj.row.values.id}`}
              >
                <Link>
                  <IconButton
                    aria-label="Detail"
                    size="sm"
                    bgColor="transparent"
                    color="green.500"
                    icon={<FaPaperPlane />}
                  ></IconButton>
                </Link>
              </NextLink>
              <Tooltip label="Download File BAP" aria-label="Download File BAP">
                <Link href={cellObj.row.original.fileBapUrl} isExternal>
                  <IconButton
                    size="sm"
                    aria-label="Download File Bap"
                    bgColor="transparent"
                    color="green.500"
                    icon={<FaFileDownload />}
                  ></IconButton>
                </Link>
              </Tooltip>
              {isOperator ? (
                <NextLink
                  href={`/dashboard/pengguna-rutin/edit/${cellObj.row.values.id}`}
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
              ) : null}
              {isOperator ? (
                <IconButton
                  size="sm"
                  aria-label="Hapus"
                  bgColor="transparent"
                  color="red.500"
                  icon={<FaTrash />}
                  onClick={() => {
                    setCurrentRow(cellObj.row.values as PenggunaRutin);
                    setDeleteDialogOpen(true);
                  }}
                ></IconButton>
              ) : null}
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
              <Text fontSize="l">Pengguna Rutin</Text>
              {isOperator ? (
                <NextLink href="/dashboard/pengguna-rutin/tambah">
                  <Link>
                    <Button bg="blue.500" color="white">
                      Tambah
                    </Button>
                  </Link>
                </NextLink>
              ) : null}
            </Flex>
            <Box>
              {!loading && data?.penggunaRutins.data ? (
                <TableClient
                  columns={columns}
                  data={data.penggunaRutins.data}
                  tableCaption="Pengguna Rutin Kendaraan"
                  sortBy={[{ id: "nama", desc: false }]}
                ></TableClient>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Stack>
      {isOperator ? (
        <DeleteDialog
          deleteDialogOpen={deleteDialogOpen}
          deleteDialogCancel={deleteDialogCancel}
          deleteDialogClose={deleteDialogClose}
          currentRow={currentRow}
          dialogKey={dialogKey}
          deleteConfirm={deleteConfirm}
        ></DeleteDialog>
      ) : null}
    </DashboardLayout>
  );
};

export default DashboardPenggunaRutinIndex;

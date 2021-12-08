import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/layout";
import {
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useMemo, useState } from "react";
import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { DeleteDialog } from "../../../components/DeleteDialog";
import { SimpleTable } from "../../../components/SimpleTable";
import { SimpleTableLimit } from "../../../components/SimpleTableLimit";
import { SimpleTablePagination } from "../../../components/SimpleTablePagination";
import { TableClient } from "../../../components/TableClient";
import {
  Kendaraan,
  useDeleteKendaraanMutation,
  useKendaraansQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";

const DashboardKendaraanOperasionalIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Kendaraan Operasional", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = useKendaraansQuery({
    variables: {
      options: {
        limit: 0,
        page: 0,
        filter: {
          columns: [
            {
              name: "tipeKendaraan",
              value: "Kendaraan Operasional",
              operation: "=",
            },
          ],
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState<Kendaraan>();
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

  const columns = useMemo<Column<Kendaraan>[]>(
    () => [
      {
        Header: "Jenis",
        accessor: "tipeRoda",
        hidden: true,
      },
      {
        Header: "Nomor Polisi",
        accessor: "nomorPolisi",
      },
      {
        Header: "Kode",
        accessor: "kode",
        hidden: true,
      },
      {
        Header: "Nama",
        accessor: "nama",
        hidden: true,
      },
      {
        Header: "Nomor Register",
        accessor: "nomorRegister",
        hidden: true,
      },
      {
        Header: "Merek",
        accessor: "merek",
        hidden: true,
      },
      {
        Header: "Ukuran CC",
        accessor: "ukuranCc",
        hidden: true,
      },
      {
        Header: "Tahun",
        accessor: "tahunPembelian",
      },
      {
        Header: "Nomor Rangka",
        accessor: "nomorRangka",
      },
      {
        Header: "Nomor Mesin",
        accessor: "nomorMesin",
        hidden: true,
      },
      {
        Header: "Nomor BPKP",
        accessor: "nomorBpkb",
        hidden: true,
      },
      {
        Header: "Asal Usul",
        accessor: "asalUsul",
        hidden: true,
      },
      {
        Header: "Harga",
        id: "harga",
        hidden: true,
      },
      {
        Header: "Foto",
        accessor: "fotoUrl",
        hidden: true,
      },
      {
        Header: "Keterangan",
        accessor: "keterangan",
        hidden: true,
      },
      {
        Header: "Aksi",
        accessor: "id",
        Cell: (cellObj) => {
          return (
            <HStack spacing={1}>
              <NextLink
                href={`/dashboard/kendaraan-operasional/edit/${cellObj.row.values.id}`}
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
                  setCurrentRow(cellObj.row.values as Kendaraan);
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
              <Text fontSize="l">Kendaraan Operasional</Text>
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
                  <NextLink href="/dashboard/kendaraan-operasional/tambah">
                    <Link>
                      <MenuItem>Tambah</MenuItem>
                    </Link>
                  </NextLink>
                  <NextLink href="/dashboard/kendaraan-operasional/import">
                    <Link>
                      <MenuItem>Import</MenuItem>
                    </Link>
                  </NextLink>
                </MenuList>
              </Menu>
            </Flex>
            <Box>
              {!loading && data?.kendaraans.data ? (
                <TableClient
                  columns={columns}
                  data={data.kendaraans.data}
                  tableCaption="Kendaraan Operasional"
                  sortBy={[{ id: "nomorPolisi", desc: false }]}
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

export default DashboardKendaraanOperasionalIndex;

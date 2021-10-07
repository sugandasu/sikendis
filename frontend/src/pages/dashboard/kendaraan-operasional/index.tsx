import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/layout";
import {
  Flex,
  Image,
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
import { SimpleTableLimit } from "../../../components/SimpleTableLimit";
import { SimpleTablePagination } from "../../../components/SimpleTablePagination";
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
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data } = useKendaraansQuery({
    variables: {
      options: {
        limit,
        page,
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

  const headers = [
    {
      label: "Jenis",
      key: "tipeRoda",
      hideSm: true,
    },
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
      label: "Foto",
      key: "fotoUrl",
      hide: true,
      render: (row: Kendaraan) => {
        if (row.fotoUrl) {
          return <Image src={row.fotoUrl} alt={row.nomorPolisi} />;
        }
        return "";
      },
    },
    {
      label: "Keterangan",
      key: "keterangan",
      hide: true,
    },
    {
      label: "Aksi",
      key: "id",
      render: (row: Kendaraan, setViewRow: any, onOpen: any) => {
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
                href="/dashboard/kendaraan-operasional/edit/[id]"
                as={`/dashboard/kendaraan-operasional/edit/${row.id}`}
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
              <SimpleTableLimit
                page={data?.kendaraans.page}
                total={data?.kendaraans.total}
                limit={data?.kendaraans.limit}
                setLimit={setLimit}
              />
              {data?.kendaraans ? (
                <SimpleTable
                  headers={headers}
                  data={data?.kendaraans}
                  tableCaption="Kendaraan"
                ></SimpleTable>
              ) : null}
              <SimpleTablePagination
                page={data?.kendaraans.page}
                total={data?.kendaraans.total}
                limit={data?.kendaraans.limit}
                setPage={setPage}
              />
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

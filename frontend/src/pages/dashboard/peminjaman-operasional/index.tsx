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
  PeminjamanOperasional,
  useDeletePeminjamanOperasionalMutation,
  usePeminjamanOperasionalsQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const DashboardPeminjamanOperasionalIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Kendaraan Operational", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = usePeminjamanOperasionalsQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [currentRow, setCurrentRow] = useState<PeminjamanOperasional>();
  const [deletePeminjamanOperasional] =
    useDeletePeminjamanOperasionalMutation();
  const deleteConfirm = () => {
    deletePeminjamanOperasional({
      variables: { id: currentRow.id },
      update: (cache) => {
        cache.evict({ id: `PeminjamanOperasional:${currentRow.id}` });
      },
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "instansi";

  const headers = [
    {
      label: "Kendaraan",
      key: "kendaraan",
      render: (row: PeminjamanOperasional) => {
        return row.kendaraan.nomorPolisi;
      },
    },
    { label: "Instansi", key: "instansi" },
    {
      label: "Penanggungjawab",
      key: "penanggungJawab",
      hideSm: true,
      hideMd: true,
    },
    { label: "Nomor Telepon", key: "nomorTelepon", hideSm: true, hideMd: true },
    { label: "Nomor Surat Disposisi", key: "nomorSuratDisposisi", hide: true },
    {
      label: "Nomor Surat Permohonan",
      key: "nomorSuratPermohonan",
      hide: true,
    },
    {
      label: "Tanggal Mulai",
      key: "tanggalMulai",
      hideSm: true,
      hideMd: true,
      render: (row: PeminjamanOperasional) => {
        return getFormattedDate(row.tanggalMulai);
      },
    },
    {
      label: "Tanggal Selesai",
      key: "tanggalSelesai",
      hideSm: true,
      render: (row: PeminjamanOperasional) => {
        return getFormattedDate(row.tanggalSelesai);
      },
    },
    {
      label: "Aksi",
      key: "id",
      render: (
        row: PeminjamanOperasional,
        showView: boolean,
        setViewRow: any,
        onOpen: any
      ) => {
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
              {row.fileSuratDisposisi ? (
                <Link href={row.fileSuratDisposisiUrl} isExternal>
                  <MenuItem>Download Surat Disposisi</MenuItem>
                </Link>
              ) : null}
              {row.fileSuratPermohonan ? (
                <Link href={row.fileSuratPermohonanUrl} isExternal>
                  <MenuItem>Download Surat Permohonan</MenuItem>
                </Link>
              ) : null}
              <NextLink
                href="/dashboard/peminjaman-operasional/edit/[id]"
                as={`/dashboard/peminjaman-operasional/edit/${row.id}`}
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
              <Text fontSize="l">Peminjaman Operasional</Text>
              <NextLink href="/dashboard/peminjaman-operasional/tambah">
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
                  data={data.peminjamanOperasionals}
                  tableCaption="Peminjaman Operasional"
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

export default DashboardPeminjamanOperasionalIndex;

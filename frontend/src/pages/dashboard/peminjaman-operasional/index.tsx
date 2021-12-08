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
import { FaEdit, FaFileDownload, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { DeleteDialog } from "../../../components/DeleteDialog";
import { TableClient } from "../../../components/TableClient";
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
        limit: 0,
        page: 0,
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

  const columns = useMemo<Column<PeminjamanOperasional>[]>(
    () => [
      {
        Header: "Kendaraan",
        id: "kendaraan",
        accessor: (row) => {
          return row.kendaraan.nomorPolisi;
        },
      },
      {
        Header: "Instansi",
        accessor: "instansi",
      },
      {
        Header: "Penanggungjawab",
        accessor: "penanggungJawab",
        hidden: true,
      },
      {
        Header: "Nomor Telepon",
        accessor: "nomorTelepon",
        hidden: true,
      },
      {
        Header: "Nomor Surat Disposisi",
        accessor: "nomorSuratDisposisi",
        hidden: true,
      },
      {
        Header: "Nomor Surat Permohonan",
        accessor: "nomorSuratPermohonan",
        hidden: true,
      },
      {
        Header: "Tanggal Mulai",
        id: "tanggalMulai",
        accessor: (row) => {
          return getFormattedDate(row.tanggalMulai);
        },
        hidden: true,
      },
      {
        Header: "Tanggal Selesai",
        id: "tanggalSelesai",
        accessor: (row) => {
          return getFormattedDate(row.tanggalSelesai);
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
              {cellObj.row.original.fileSuratDisposisiUrl ? (
                <Tooltip
                  label="Download File Surat Disposisi"
                  aria-label="Download File Surat Disposisi"
                >
                  <Link
                    href={cellObj.row.original.fileSuratDisposisiUrl}
                    isExternal
                  >
                    <IconButton
                      size="sm"
                      aria-label="Download File Surat Disposisi"
                      bgColor="transparent"
                      color="green.500"
                      icon={<FaFileDownload />}
                    ></IconButton>
                  </Link>
                </Tooltip>
              ) : null}

              {cellObj.row.original.fileSuratPermohonanUrl ? (
                <Tooltip
                  label="Download File Surat Permohonan"
                  aria-label="Download File Surat Permohonan"
                >
                  <Link
                    href={cellObj.row.original.fileSuratPermohonanUrl}
                    isExternal
                  >
                    <IconButton
                      size="sm"
                      aria-label="Download File Surat Permohonan"
                      bgColor="transparent"
                      color="yellow.500"
                      icon={<FaFileDownload />}
                    ></IconButton>
                  </Link>
                </Tooltip>
              ) : null}
              <NextLink
                href={`/dashboard/peminjaman-operasional/edit/${cellObj.row.values.id}`}
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
                  setCurrentRow(cellObj.row.values as PeminjamanOperasional);
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
              {!loading && data?.peminjamanOperasionals.data ? (
                <TableClient
                  columns={columns}
                  data={data.peminjamanOperasionals.data}
                  tableCaption="Pengguna Operasional Kendaraan"
                  sortBy={[{ id: "kendaraan", desc: false }]}
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

export default DashboardPeminjamanOperasionalIndex;

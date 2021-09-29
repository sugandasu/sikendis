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
  useKendaraanOperationalsQuery,
  usePeminjamansQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const DashboardKendaraanOperationalIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Kendaraan Operational", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = useKendaraanOperationalsQuery({
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
        cache.evict({ id: `KendaraanOperational:${currentRow.id}` });
      },
    });
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteDialogClose = () => setDeleteDialogOpen(false);
  const deleteDialogCancel = React.useRef();
  const dialogKey = "nomorDisposisi";

  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!loading && !data?.kendaraanOperationals?.data) {
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
    { label: "Jenis Peminjam", key: "jenisPeminjam", hideSm: true },
    { label: "Nama Dinas", key: "namaDinas", hide: true },
    { label: "Nip Pegawai", key: "nipPegawai", hide: true },
    { label: "Nama Pegawai", key: "namaPegawai", hide: true },
    { label: "Jabatan Pegawai", key: "jabatanPegawai", hide: true },
    { label: "Instansi Pegawai", key: "instansiPegawai", hide: true },
    { label: "Sub Bagian Pegawai", key: "subBagianPegawai", hide: true },
    {
      label: "Foto Pegawai",
      key: "fotoProfilPegawai",
      hide: true,
      render: (row) => {
        return row.fotoProfilPegawaiUrl ? (
          <Avatar size="sm" src={row.fotoProfilPegawaiUrl}></Avatar>
        ) : (
          <Avatar size="sm"></Avatar>
        );
      },
    },
    { label: "Nomor Disposisi", key: "nomorDisposisi", hide: true },
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
      render: (row: any) => {
        return getFormattedDate(row.tanggalMulai);
      },
    },
    {
      label: "Tanggal Selesai",
      key: "tanggalSelesai",
      hideSm: true,
      render: (row: any) => {
        return getFormattedDate(row.tanggalSelesai);
      },
    },
    { label: "Nomor HP Supir", key: "nomorHpSupir", hide: true },
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
                  <MenuItem>Download Surat Disposisi</MenuItem>
                </Link>
              </NextLink>
              <NextLink href="" as={``}>
                <Link>
                  <MenuItem>Download Surat Permohonan</MenuItem>
                </Link>
              </NextLink>
              <NextLink
                href="/dashboard/kendaraan-operational/edit/[id]"
                as={`/dashboard/kendaraan-operational/edit/${row.id}`}
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
              <Text fontSize="l">Kendaraan Operational</Text>
              <NextLink href="/dashboard/kendaraan-operational/tambah">
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
                data={data.kendaraanOperationals}
                tableCaption="Kendaraan Operational"
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

export default DashboardKendaraanOperationalIndex;

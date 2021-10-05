import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
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
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { SimpleTable } from "../../../components/SimpleTable";
import { SimpleTableLimit } from "../../../components/SimpleTableLimit";
import { SimpleTablePagination } from "../../../components/SimpleTablePagination";
import {
  Kendaraan,
  TipeStatusKendaraan,
  useMonitoringKendaraanOperasionalsQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const DashboardMonitoringKendaraanOperasionalIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Monitoring Kendaraan", link: "#", isCurrentPage: true },
  ];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useMonitoringKendaraanOperasionalsQuery({
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
    { label: "Merek", key: "merek", hide: true },
    {
      label: "Ukuran CC",
      key: "ukuranCc",
      hide: true,
    },
    { label: "Bahan", key: "bahan", hide: true },
    {
      label: "Tahun Pembelian",
      key: "tahunPembelian",
      hide: true,
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
      key: "statusPenggunaan",
      render: (row: Kendaraan) => {
        let statusPenggunaan = `${row.statusPenggunaan.status}`;
        if (row.statusPenggunaan.status === TipeStatusKendaraan.Dipakai) {
          statusPenggunaan += ` oleh instansi ${
            row.statusPenggunaan.peminjamanOperasionalLast.instansi
          } dari tanggal ${getFormattedDate(
            row.statusPenggunaan.peminjamanOperasionalLast.tanggalMulai
          )} sampai ${getFormattedDate(
            row.statusPenggunaan.peminjamanOperasionalLast.tanggalSelesai
          )}, nomor yang bisa dihubungi ${
            row.statusPenggunaan.peminjamanOperasionalLast.nomorTelepon
          }`;
        }
        return statusPenggunaan;
      },
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
              <Text fontSize="l">Monitoring Kendaraan Operasional</Text>
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
                  tableCaption="Kendaraan Operasional"
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
    </DashboardLayout>
  );
};

export default DashboardMonitoringKendaraanOperasionalIndex;

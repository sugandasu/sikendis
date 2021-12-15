import { Box } from "@chakra-ui/layout";
import { Flex, Stack, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Column } from "react-table";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { TableClient } from "../../../components/TableClient";
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

  const { data, loading } = useMonitoringKendaraanOperasionalsQuery({
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
        hidden: true,
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
        accessor: "harga",
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
        Header: "Status",
        id: "statusPenggunaan",
        accessor: (row) => {
          let statusPenggunaan = `${row.statusPenggunaan.status}`;
          if (row.statusPenggunaan.status === TipeStatusKendaraan.Dipakai) {
            statusPenggunaan += ` - ${
              row.statusPenggunaan.peminjamanOperasionalLast.instansi
            }, ${getFormattedDate(
              row.statusPenggunaan.peminjamanOperasionalLast.tanggalMulai
            )} - ${getFormattedDate(
              row.statusPenggunaan.peminjamanOperasionalLast.tanggalSelesai
            )}, ${row.statusPenggunaan.peminjamanOperasionalLast.nomorTelepon}`;
          }
          return statusPenggunaan;
        },
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
              <Text fontSize="l">Monitoring Kendaraan Operasional</Text>
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
    </DashboardLayout>
  );
};

export default DashboardMonitoringKendaraanOperasionalIndex;

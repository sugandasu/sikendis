import { Box } from "@chakra-ui/layout";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Column } from "react-table";
import { TableClientDisplay } from "../components/TableClientDisplay";
import {
  Kendaraan,
  useMonitoringKendaraanOperasionalsQuery,
} from "../generated/graphql";
import { useIsAuth } from "../middlewares/useIsAuth";
import { getFormattedDate } from "../utils/getFormattedDate";

const Display: React.FC<{}> = ({}) => {
  useIsAuth();

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
        Header: "Nomor Polisi",
        accessor: "nomorPolisi",
      },
      {
        Header: "Status",
        id: "statusPenggunaan",
        accessor: (row) => {
          return row.statusPenggunaan.status;
        },
      },
      {
        Header: "Instansi",
        id: "instansi",
        accessor: (row) => {
          if (row.statusPenggunaan.peminjamanOperasionalLast) {
            return row.statusPenggunaan.peminjamanOperasionalLast.instansi;
          }
          return "-";
        },
      },
      {
        Header: "Kontak",
        id: "kontak",
        accessor: (row) => {
          if (row.statusPenggunaan.peminjamanOperasionalLast) {
            return row.statusPenggunaan.peminjamanOperasionalLast.nomorTelepon;
          }
          return "-";
        },
      },
      {
        Header: "Tanggal Mulai",
        id: "tanggalMulai",
        accessor: (row) => {
          if (row.statusPenggunaan.peminjamanOperasionalLast) {
            return getFormattedDate(
              row.statusPenggunaan.peminjamanOperasionalLast.tanggalMulai
            );
          }
          return "-";
        },
      },
      {
        Header: "Tanggal Selesai",
        id: "tanggalSelesai",
        accessor: (row) => {
          if (row.statusPenggunaan.peminjamanOperasionalLast) {
            return getFormattedDate(
              row.statusPenggunaan.peminjamanOperasionalLast.tanggalSelesai
            );
          }
          return "-";
        },
      },
    ],
    []
  );

  return (
    <Box width="100%" height="100vh" bgColor="gray.50" p={10} maxHeight="100vh">
      <Box boxShadow="md" bg="white">
        <Box p={5}>
          <Flex align="center" justifyContent="space-between" mb={8}>
            <Heading fontSize="xl">Kendaraan Operasional</Heading>
          </Flex>
          <Box>
            {!loading && data?.kendaraans.data ? (
              <TableClientDisplay
                columns={columns}
                data={data.kendaraans.data}
                tableCaption="Kendaraan Operasional"
                sortBy={[{ id: "nomorPolisi", desc: false }]}
                size="sm"
              ></TableClientDisplay>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Display;

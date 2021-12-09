import { Box } from "@chakra-ui/layout";
import { Flex, Stack, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Column } from "react-table";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { TableClient } from "../../../components/TableClient";
import { Simda, useIntegrasiSimdasQuery } from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const DashboardIntegrasiSimdaIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Integrasi Simda", link: "#", isCurrentPage: true },
  ];

  const { data, loading } = useIntegrasiSimdasQuery({
    variables: {
      options: {
        limit: 0,
        page: 0,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const columns = useMemo<Column<any>[]>(
    () => [
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
        Header: "Nama Aset",
        accessor: "nmAset",
        hidden: true,
      },
      {
        Header: "Merek",
        accessor: "merk",
        hidden: true,
      },
      {
        Header: "Tipe",
        accessor: "type",
        hidden: true,
      },
      {
        Header: "CC",
        accessor: "cc",
        hidden: true,
      },
      {
        Header: "Tanggal Perolehan",
        accessor: "tglPerolehan",
        hidden: true,
      },
      {
        Header: "Nomor Pabrik",
        accessor: "nomorPabrik",
        hidden: true,
      },
      {
        Header: "Nomor BPKB",
        accessor: "nomorBpkb",
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
        Header: "Tahun",
        accessor: "tahun",
        hidden: true,
      },
      {
        Header: "Nomor SP2D",
        accessor: "noSp2d",
        hidden: true,
      },
      {
        Header: "Tanggal Pembukuan",
        id: "tglPembukuan",
        accessor: (row: Simda) => {
          if (row.tglPembukuan) {
            return getFormattedDate(row.tglPembukuan);
          }
          return "";
        },
        hidden: true,
      },
      {
        Header: "Kondisi",
        accessor: "kondisi",
        hidden: true,
      },
      {
        Header: "Uraian",
        accessor: "uraian",
      },
      {
        Header: "Keterangan",
        accessor: "keterangan",
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
              <Text fontSize="l">Integrasi Simda</Text>
            </Flex>
            <Box my={4}>
              {!loading && data?.simdas.data ? (
                <TableClient
                  columns={columns}
                  data={data.simdas.data}
                  tableCaption="Integrasi Simda"
                  sortBy={[{ id: "nomorRangka", desc: false }]}
                ></TableClient>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardIntegrasiSimdaIndex;

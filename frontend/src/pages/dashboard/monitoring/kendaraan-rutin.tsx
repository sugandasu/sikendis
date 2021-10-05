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
  useMonitoringKendaraanRutinsQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";

const DashboardMonitoringKendaraanRutinIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Monitoring Kendaraan", link: "#", isCurrentPage: true },
  ];
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useMonitoringKendaraanRutinsQuery({
    variables: {
      options: {
        limit,
        page,
        filter: {
          columns: [
            { name: "tipeKendaraan", value: "Kendaraan Rutin", operation: "=" },
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
      key: "keterangan",
      hide: true,
    },
    {
      label: "Keterangan",
      key: "statusPenggunaan",
      render: (row: Kendaraan) => {
        let statusPenggunaan = `${row.statusPenggunaan.status}`;
        if (row.statusPenggunaan.penggunaRutinLast) {
          statusPenggunaan += ` oleh ${row.statusPenggunaan.penggunaRutinLast.pengguna.nama}`;
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
              <Text fontSize="l">Monitoring Kendaraan Rutin</Text>
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
                  tableCaption="Kendaraan Rutin"
                />
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

export default DashboardMonitoringKendaraanRutinIndex;

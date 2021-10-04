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
import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { SimpleTable } from "../../../components/SimpleTable";
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
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const headers = [
    {
      label: "Nomor Rangka",
      key: "nomorRangka",
    },
    {
      label: "Nomor Mesin",
      key: "nomorMesin",
      hideSm: true,
      hideMd: true,
    },
    {
      label: "Nama Aset",
      key: "nmAset",
      hide: true,
    },
    { label: "Merek", key: "merk", hide: true },
    { label: "Tipe", key: "type", hide: true },
    { label: "CC", key: "cc", hide: true },
    { label: "Bahan", key: "bahan", hide: true },
    {
      label: "Tanggal Perolehan",
      key: "tglPerolehan",
      hide: true,
      render: (row: Simda) => {
        if (row.tglPerolehan) {
          return getFormattedDate(row.tglPerolehan);
        }
        return "";
      },
    },
    { label: "Nomor Pabrik", key: "nomorPabrik", hide: true },
    { label: "Nomor Bpkb", key: "nomorBpkb", hide: true },
    { label: "Asal Usul", key: "asalUsul", hide: true },
    { label: "Harga", key: "harga", hide: true },
    { label: "Tahun", key: "tahun", hide: true },
    { label: "Nomor SP2D", key: "noSp2d", hide: true },
    {
      label: "Tanggal Pembukuan",
      key: "tglPembukuan",
      hide: true,
      render: (row: Simda) => {
        if (row.tglPembukuan) {
          return getFormattedDate(row.tglPembukuan);
        }
        return "";
      },
    },
    {
      label: "Kondisi",
      key: "kondisi",
      hide: true,
    },
    {
      label: "Uraian",
      key: "uraian",
    },
    {
      label: "Keterangan",
      key: "keterangan",
      hide: true,
    },
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
              <Text fontSize="l">Integrasi Simda</Text>
            </Flex>
            <Box>
              {loading ? (
                "Loading..."
              ) : (
                <SimpleTable
                  headers={headers}
                  data={data.simdas}
                  tableCaption="Integrasi Simda"
                ></SimpleTable>
              )}
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardIntegrasiSimdaIndex;

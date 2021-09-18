import { Button, IconButton } from "@chakra-ui/button";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { DashboardLayout } from "../../../components/DashboardLayout";
import { SimpleTable } from "../../../components/SimpleTable";
import {
  useDeletePenggunaMutation,
  usePenggunasQuery,
} from "../../../generated/graphql";
import { useIsAuth } from "../../../middlewares/useIsAuth";

const DashboardPenggunaIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [
    { text: "Dashboard", link: "/dashboard", isCurrentPage: false },
    { text: "Pengguna", link: "#", isCurrentPage: true },
  ];
  const { data, loading } = usePenggunasQuery({
    variables: {
      options: {
        limit: 10,
        page: 1,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const [deletePengguna] = useDeletePenggunaMutation();
  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (!loading && !data?.penggunas?.data) {
    return <Box>Error data...</Box>;
  }

  const headers = [
    { label: "#", key: "fotoProfil", hideSm: true },
    { label: "Nama", key: "nama" },
    { label: "Nip", key: "nip", hideSms: true },
    { label: "Jabatan", key: "jabatan", hideSm: true, hideMd: true },
    { label: "Instansi", key: "instansi", hideSm: true, hideMd: true },
    { label: "Sub Bagian", key: "subBagian", hideSm: true, hideMd: true },
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
              {showView ? (
                <MenuItem
                  onClick={() => {
                    setViewRow(row);
                    onOpen();
                  }}
                >
                  <Text>View</Text>
                </MenuItem>
              ) : null}
              <MenuItem>
                <NextLink
                  href="/dashboard/pengguna/edit/[id]"
                  as={`/dashboard/pengguna/edit/${row.id}`}
                >
                  <Link>
                    <Text>Edit</Text>
                  </Link>
                </NextLink>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deletePengguna({
                    variables: { id: row.id },
                  });
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
        <Box borderWidth="1px" borderRadius="md">
          <Box p={5}>
            <Flex align="center" justifyContent="space-between" mb={2}>
              <Text fontSize="l">Pengguna</Text>
              <NextLink href="/dashboard/pengguna/tambah">
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
                data={data.penggunas}
              ></SimpleTable>
            </Box>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardPenggunaIndex;

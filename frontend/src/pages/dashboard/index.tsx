import { Box, Flex, Icon, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { AiFillCar } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GiCarKey } from "react-icons/gi";
import { MdDirectionsCar } from "react-icons/md";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useIsAuth } from "../../middlewares/useIsAuth";
import { useDashboardCardQuery } from "../../generated/graphql";

const dashboardIndex: React.FC<{}> = ({}) => {
  useIsAuth();
  const breadCrumbs = [{ text: "Dashboard", link: "#", isCurrentPage: true }];
  const { data, loading } = useDashboardCardQuery();
  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Wrap spacing={4}>
        <Flex
          rounded="lg"
          boxShadow="md"
          p={8}
          bg="white"
          minWidth="25%"
          flexGrow={1}
        >
          <Flex align="center">
            <Box p={4}>
              <Icon as={AiFillCar} w={12} h={12} color="green.500" />
            </Box>
            <Box p={4}>
              <Text fontSize="md" fontWeight="semibold">
                Kendaran Rutin
              </Text>
              <Text fontSize="xl">
                {!loading && data?.dashboardCard
                  ? data.dashboardCard.kendaraanRutin
                  : null}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          rounded="lg"
          boxShadow="md"
          p={8}
          bg="white"
          minWidth="25%"
          flexGrow={1}
        >
          <Flex align="center">
            <Box p={4}>
              <Icon as={MdDirectionsCar} w={12} h={12} color="red.500" />
            </Box>
            <Box p={4}>
              <Text fontSize="md" fontWeight="semibold">
                Kendaran Operasional
              </Text>
              <Text fontSize="xl">
                {!loading && data?.dashboardCard
                  ? data.dashboardCard.kendaraanOperasional
                  : null}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          rounded="lg"
          boxShadow="md"
          p={8}
          bg="white"
          minWidth="25%"
          flexGrow={1}
        >
          <Flex align="center">
            <Box p={4}>
              <Icon as={MdDirectionsCar} w={12} h={12} color="gray.600" />
            </Box>
            <Box p={4}>
              <Text fontSize="md" fontWeight="semibold">
                Kendaraan Operasional Bebas
              </Text>
              <Text fontSize="xl">
                {!loading && data?.dashboardCard
                  ? data.dashboardCard.kendaraanOperasionalBebas
                  : null}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          rounded="lg"
          boxShadow="md"
          p={8}
          bg="white"
          minWidth="25%"
          flexGrow={1}
        >
          <Flex align="center">
            <Box p={4}>
              <Icon as={FaUsers} w={12} h={12} color="yellow.500" />
            </Box>
            <Box p={4}>
              <Text fontSize="md" fontWeight="semibold">
                Pengguna
              </Text>
              <Text fontSize="xl">
                {!loading && data?.dashboardCard
                  ? data.dashboardCard.pengguna
                  : null}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          rounded="lg"
          boxShadow="md"
          p={8}
          bg="white"
          minWidth="25%"
          flexGrow={1}
        >
          <Flex align="center">
            <Box p={4}>
              <Icon as={GiCarKey} w={12} h={12} color="blue.500" />
            </Box>
            <Box p={4}>
              <Text fontSize="md" fontWeight="semibold">
                Peminjaman Kendaraan
              </Text>
              <Text fontSize="xl">
                {!loading && data?.dashboardCard
                  ? data.dashboardCard.peminjamanKendaraan
                  : null}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Wrap>
    </DashboardLayout>
  );
};

export default dashboardIndex;

import { Box, Flex, Grid, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import React from "react";
import { DashboardLayout } from "../../components/DashboardLayout";

const dashboardIndex: React.FC<{}> = ({}) => {
  const breadCrumbs = [{ text: "Dashboard", link: "#", isCurrentPage: true }];
  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Grid templateColumns="repeat(2, 1fr)" gap={5}>
        <Box width="md" rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Text fontSize="l"></Text>
          </Box>
        </Box>
        <Box width="md" rounded="md" boxShadow="md" bg="white">
          <Box p={8}>
            <Text fontSize="l"></Text>
          </Box>
        </Box>
      </Grid>
    </DashboardLayout>
  );
};

export default dashboardIndex;

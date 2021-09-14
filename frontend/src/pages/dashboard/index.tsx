import { Box, Text } from "@chakra-ui/layout";
import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { DashboardLayout } from "../../components/DashboardLayout";

const dashboardIndex: React.FC<{}> = ({}) => {
  const breadCrumbs = [{ text: "Dashboard", link: "#", isCurrentPage: true }];
  return (
    <DashboardLayout headerText="Dashboard" breadCrumbs={breadCrumbs}>
      <Stack>
        <Box borderWidth="1px" borderRadius="md">
          <Box p={5}>
            <Text fontSize="l">Dashboard</Text>
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default dashboardIndex;

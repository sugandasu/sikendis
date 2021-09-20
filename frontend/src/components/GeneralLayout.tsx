import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface GeneralLayoutProps {}

export const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <Box mx={2} height="100vh">
      {children}
    </Box>
  );
};

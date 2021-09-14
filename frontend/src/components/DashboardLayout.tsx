import {
  Box,
  Flex,
  Heading,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { BreadCrumb, BreadCrumbItem } from "./BreadCrumb";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  headerText: string;
  breadCrumbs: BreadCrumbItem[];
}

const Sidebar = dynamic(() => import("./Sidebar"), {
  ssr: false,
});

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  headerText,
  breadCrumbs,
}) => {
  const [largerThan840] = useMediaQuery("(min-width: 840px)");
  const {
    isOpen: menuIsOpen,
    onOpen: setMenuIsOpen,
    onClose: setMenuIsClose,
  } = useDisclosure({ defaultIsOpen: largerThan840 });
  return (
    <Flex>
      <Sidebar
        menuIsOpen={menuIsOpen}
        setMenuIsClose={setMenuIsClose}
      ></Sidebar>
      <Box width="100%">
        <Box mb={6}>
          <Navbar
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            setMenuIsClose={setMenuIsClose}
          />
        </Box>
        <Box mx={2}>
          <Box maxW="1024px" mx="auto">
            <Box mb={5}>
              <Heading mb={1}>{headerText}</Heading>
              <BreadCrumb breadCrumbs={breadCrumbs}></BreadCrumb>
            </Box>
            <Box mx="auto">{children}</Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

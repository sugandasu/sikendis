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
        <Box>
          <Navbar
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            setMenuIsClose={setMenuIsClose}
          />
        </Box>
        <Box width="100%" position="relative">
          <Box
            position="absolute"
            bgColor="gray.600"
            width="100%"
            height="150px"
            zIndex={-1}
          />
        </Box>
        <Box mt={2} mx={5}>
          <Box mx="auto">
            <Box>
              <Heading mb={2} color="white">
                {headerText}
              </Heading>
              <BreadCrumb breadCrumbs={breadCrumbs}></BreadCrumb>
            </Box>
            <Box mx="auto" pt={5} pb={10}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

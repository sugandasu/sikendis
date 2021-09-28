import {
  Box,
  Button,
  Heading,
  Icon,
  Link,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaCarSide, FaHome, FaUsers } from "react-icons/fa";
import { SidebarMenu } from "./SidebarMenu";

interface SidebarProps {
  menuIsOpen: boolean;
  setMenuIsClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuIsOpen, setMenuIsClose }) => {
  const [lessThan640] = useMediaQuery("(max-width: 640px)");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {menuIsOpen ? (
        <Box>
          <Box
            boxShadow="md"
            height="100vh"
            width="300px"
            bgColor={colorMode === "light" ? "white" : "gray.800"}
            position={lessThan640 ? "fixed" : null}
            zIndex={2}
          >
            <Box>
              <NextLink href="/dashboard">
                <Link _hover={{ textDecoration: "none" }}>
                  <Button
                    fontWeight="regular"
                    width="100%"
                    variant="link"
                    py="18px"
                    bgColor="white"
                    color="black"
                    borderRadius={0}
                    fontSize="2xl"
                  >
                    <Heading fontSize="l">SIKENDIS</Heading>
                  </Button>
                </Link>
              </NextLink>
            </Box>
            <SidebarMenu
              link="/dashboard/"
              text="Dashboard"
              color="blue.500"
              icon={FaHome}
            />
            <SidebarMenu
              link="/dashboard/kendaraan"
              text="Kendaraan"
              color="red.500"
              icon={FaCarSide}
            />
            <SidebarMenu
              link="/dashboard/pengguna"
              text="Pengguna"
              color="gray.700"
              icon={FaUsers}
            />
          </Box>
          {lessThan640 ? (
            <Box
              height="100vh"
              width="100%"
              bgColor="gray"
              opacity="25%"
              position="absolute"
              zIndex={1}
              onClick={() => {
                setMenuIsClose();
              }}
            ></Box>
          ) : null}
        </Box>
      ) : null}
    </>
  );
};

export default Sidebar;

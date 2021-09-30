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
import {
  RiCarWashingFill,
  RiEBikeFill,
  RiGovernmentFill,
} from "react-icons/ri";
import { AiFillCar } from "react-icons/ai";
import { GiCarKey, GiCarWheel } from "react-icons/gi";
import { BiServer } from "react-icons/bi";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarMenuLevel } from "./SidebarMenuLevel";

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
            top="0"
            bgColor={colorMode === "light" ? "white" : "gray.800"}
            position={lessThan640 ? "fixed" : "sticky"}
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
              link="/dashboard"
              text="Dashboard"
              color="blue.500"
              icon={FaHome}
            />
            <SidebarMenuLevel text="Kendaraan" color="red.500" icon={FaCarSide}>
              <SidebarMenu
                link="/dashboard/kendaraan-roda-2"
                text="Kendaraan Roda 2"
                color="green.500"
                icon={RiEBikeFill}
              />
              <SidebarMenu
                link="/dashboard/kendaraan-roda-4"
                text="Kendaraan Roda 4"
                color="gray.500"
                icon={AiFillCar}
              />
              <SidebarMenu
                link="/dashboard/kendaraan-rutin"
                text="Kendaraan Rutin"
                color="yellow.500"
                icon={GiCarWheel}
              />
              <SidebarMenu
                link="/dashboard/kendaraan-operational"
                text="Kendaraan Operational"
                color="pink.500"
                icon={GiCarKey}
              />
            </SidebarMenuLevel>
            <SidebarMenu
              link="/dashboard/pengguna"
              text="Pengguna"
              color="gray.700"
              icon={FaUsers}
            />
            <SidebarMenuLevel
              text="Integrasi Aplikasi"
              color="blue.600"
              icon={BiServer}
            >
              <SidebarMenu
                link="/dashboard/data-samsat"
                text="Data SAMSAT"
                color="green.500"
                icon={RiCarWashingFill}
              />
              <SidebarMenu
                link="/dashboard/data-simda"
                text="Data SIMDA BMD"
                color="red.500"
                icon={RiGovernmentFill}
              />
            </SidebarMenuLevel>
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

import {
  Box,
  Button,
  Heading,
  Link,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { AiFillCar } from "react-icons/ai";
import { BiServer } from "react-icons/bi";
import { FaCarSide, FaHome, FaUsers } from "react-icons/fa";
import { FiCodesandbox } from "react-icons/fi";
import { GiCarKey } from "react-icons/gi";
import { IoCarSharp } from "react-icons/io";
import { MdNaturePeople } from "react-icons/md";
import { RiCarWashingFill, RiGovernmentFill } from "react-icons/ri";
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
                link="/dashboard/kendaraan-rutin"
                text="Kendaraan Rutin"
                color="green.500"
                icon={AiFillCar}
              />
              <SidebarMenu
                link="/dashboard/kendaraan-operasional"
                text="Kendaraan Operasional"
                color="gray.500"
                icon={IoCarSharp}
              />
            </SidebarMenuLevel>
            <SidebarMenuLevel
              text="Penggunaan"
              color="yellow.500"
              icon={FiCodesandbox}
            >
              <SidebarMenu
                link="/dashboard/pengguna-rutin"
                text="Pengguna Rutin"
                color="yellow.500"
                icon={MdNaturePeople}
              />
              <SidebarMenu
                link="/dashboard/peminjaman-operasional"
                text="Peminjaman Operasional"
                color="pink.500"
                icon={GiCarKey}
              />
            </SidebarMenuLevel>
            <SidebarMenu
              link="/dashboard/pengguna-kendaraan"
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

import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { AiFillCar } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { FaCarSide, FaHome, FaTv, FaUsers } from "react-icons/fa";
import { FiCodesandbox } from "react-icons/fi";
import { GiBlackBook, GiCarKey } from "react-icons/gi";
import { MdDirectionsCar, MdNaturePeople } from "react-icons/md";
import { RiCarWashingFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { SiElectron } from "react-icons/si";
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
                    <Image
                      maxHeight={12}
                      bgColor="transparent"
                      name="Sikendis"
                      src="/sikendis-logo.png"
                      mr={4}
                    />
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
                icon={MdDirectionsCar}
              />
            </SidebarMenuLevel>
            <SidebarMenu
              link="/dashboard/pengguna-kendaraan"
              text="Pengguna"
              color="green.500"
              icon={FaUsers}
            />
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
            <SidebarMenuLevel
              text="Monitoring"
              color="blue.600"
              icon={BiNetworkChart}
            >
              <SidebarMenu
                link="/dashboard/monitoring/kendaraan-rutin"
                text="Kendaraan Rutin"
                color="green.500"
                icon={RiCarWashingFill}
              />
              <SidebarMenu
                link="/dashboard/monitoring/kendaraan-operasional"
                text="Kendaraan Operasional"
                color="blue.500"
                icon={RiCarWashingFill}
              />
              <SidebarMenu
                link="/display"
                text="Display"
                color="red.500"
                icon={FaTv}
              />
            </SidebarMenuLevel>
            <SidebarMenuLevel
              text="Integrasi"
              color="blue.600"
              icon={SiElectron}
            >
              <SidebarMenu
                link="/dashboard/integrasi/pajak-kendaraan"
                text="Pajak Kendaraan"
                color="green.500"
                icon={RiMoneyDollarBoxFill}
              />
              <SidebarMenu
                link="/dashboard/integrasi/simda"
                text="Simda"
                color="yellow.500"
                icon={GiBlackBook}
              />
            </SidebarMenuLevel>
          </Box>
          {lessThan640 ? (
            <Box
              height="100%"
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

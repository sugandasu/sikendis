import {
  Box,
  Button,
  Icon,
  Link,
  StackDivider,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { FaCarSide, FaUsers } from "react-icons/fa";

interface SidebarProps {
  menuIsOpen: boolean;
  setMenuIsClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuIsOpen, setMenuIsClose }) => {
  const [lessThan640] = useMediaQuery("(max-width: 640px)");
  return (
    <>
      {menuIsOpen ? (
        <Box>
          <Box
            height="100vh"
            width="320px"
            bgColor="white"
            position={lessThan640 ? "absolute" : null}
            zIndex={2}
          >
            <Box>
              <NextLink href="/dashboard">
                <Link>
                  <Button
                    width="100%"
                    variant="link"
                    py="14px"
                    bgColor="red.500"
                    color="white"
                    borderRadius={0}
                    fontSize="2xl"
                  >
                    SIKENDIS
                  </Button>
                </Link>
              </NextLink>
            </Box>
            <VStack
              mt={2}
              align="stretch"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <Box>
                <NextLink href="/dashboard/kendaraan">
                  <Link>
                    <Button
                      isFullWidth
                      leftIcon={<Icon as={FaCarSide} />}
                      py={6}
                      borderRadius={0}
                      bgColor="transparent"
                      justifyContent="left"
                    >
                      <Text fontSize="l">Kendaraan</Text>
                    </Button>
                  </Link>
                </NextLink>
              </Box>
              <Box>
                <NextLink href="/dashboard/pengguna">
                  <Link>
                    <Button
                      isFullWidth
                      leftIcon={<Icon as={FaUsers} />}
                      py={6}
                      borderRadius={0}
                      bgColor="transparent"
                      justifyContent="left"
                    >
                      <Text fontSize="l">Pengguna</Text>
                    </Button>
                  </Link>
                </NextLink>
              </Box>
            </VStack>
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

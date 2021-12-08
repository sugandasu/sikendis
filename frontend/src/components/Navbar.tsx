import { IconButton } from "@chakra-ui/button";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";
import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import { useLogoutMutation } from "../generated/graphql";

interface NavbarProps {
  menuIsOpen: boolean;
  setMenuIsOpen: () => void;
  setMenuIsClose: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  menuIsOpen,
  setMenuIsOpen,
  setMenuIsClose,
}) => {
  const [logout, { client }] = useLogoutMutation();

  return (
    <Flex width="100%" py={3} px={5} bg="gray.600" align="center">
      <IconButton
        focusable="false"
        onClick={() => {
          if (menuIsOpen) {
            setMenuIsClose();
          } else {
            setMenuIsOpen();
          }
        }}
        aria-label="menu"
        bg="transparent"
        color="white"
        icon={<HamburgerIcon />}
      ></IconButton>
      <Spacer />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="avatar"
          isRound
          bg="transparent"
          color="white"
        >
          <Avatar size="sm">
            <AvatarBadge boxSize="1.25em" bg="red.500" />
          </Avatar>
        </MenuButton>
        <MenuList>
          <MenuItem>Akun</MenuItem>
          <MenuItem
            onClick={async () => {
              await logout({
                update: (cache) => {
                  cache.evict({ fieldName: "me" });
                },
              });
              await client?.resetStore();
              Router.replace("/");
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

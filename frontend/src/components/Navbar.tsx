import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import React from "react";

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
  return (
    <Flex width="100%" py={2} px={2} bg="red.500" align="center">
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
        icon={<HamburgerIcon w="100%" />}
      ></IconButton>
      <Spacer />
      <IconButton aria-label="avatar" isRound bg="transparent" color="white">
        <Avatar size="sm">
          <AvatarBadge boxSize="1.25em" bg="red.500" />
        </Avatar>
      </IconButton>
    </Flex>
  );
};

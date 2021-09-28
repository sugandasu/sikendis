import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Link } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface SidebarMenuProps {
  link: string;
  color: string;
  icon: IconType;
  text: string;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  link,
  text,
  icon,
  color,
}) => {
  return (
    <NextLink href={link}>
      <Link _hover={{ textDecoration: "none" }}>
        <Box>
          <Button
            fontWeight="regular"
            isFullWidth
            leftIcon={<Icon ml={3} color={color} as={icon} />}
            py={7}
            borderRadius={0}
            bgColor="transparent"
            justifyContent="left"
          >
            <Text fontSize="l" color="gray.700">
              {text}
            </Text>
          </Button>
        </Box>
      </Link>
    </NextLink>
  );
};

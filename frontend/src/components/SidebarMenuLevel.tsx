import Icon from "@chakra-ui/icon";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useBoolean,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface SidebarMenuLevelProps {
  color: string;
  icon: IconType;
  text: string;
}

export const SidebarMenuLevel: React.FC<SidebarMenuLevelProps> = ({
  children,
  text,
  icon,
  color,
}) => {
  const [menuOpen, setMenuOpen] = useBoolean();
  return (
    <Box>
      <Accordion allowToggle>
        <AccordionItem p={0} m={0} border={0}>
          <AccordionButton
            _hover={{ bgColor: "gray.200" }}
            color="gray.700"
            px={5}
            py={4}
          >
            <Flex width="100%" align="center">
              <Icon ml={2} mr="8px" color={color} as={icon} />
              {text}
            </Flex>
            <AccordionIcon mr={10} />
          </AccordionButton>
          <AccordionPanel p={0}>
            <Box bgColor="gray.50">{children}</Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface SimpleTableModalProps {
  onClose: () => void;
  isOpen: boolean;
  headers: any[];
  row: any;
}

const showHeaderRender = (header, row, i) => {
  if (header.key === "id") {
    return null;
  }

  return (
    <Box width="100%" key={i}>
      <Text>
        {header.label + ": "} {header.render(row)}
      </Text>
    </Box>
  );
};

export const SimpleTableModal: React.FC<SimpleTableModalProps> = ({
  onClose,
  isOpen,
  headers,
  row,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent mx={5} pb={5}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {row ? (
            <VStack>
              {headers.map((header, i) => {
                return typeof header.render !== "function" ? (
                  <Box width="100%" key={i}>
                    <Text>{header.label + ": " + row[header.key]}</Text>
                  </Box>
                ) : (
                  showHeaderRender(header, row, i)
                );
              })}
            </VStack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

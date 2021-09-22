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

export const SimpleTableModal: React.FC<SimpleTableModalProps> = ({
  onClose,
  isOpen,
  headers,
  row,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
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
                ) : null;
              })}
            </VStack>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

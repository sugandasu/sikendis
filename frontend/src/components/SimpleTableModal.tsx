import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  OrderedList,
  ListItem,
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
            <OrderedList>
              {headers.map((header, i) => (
                <ListItem key={i}>
                  {header.label + ": " + row[header.key]}
                </ListItem>
              ))}
            </OrderedList>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

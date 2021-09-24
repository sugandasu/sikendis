import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, useState } from "react";
import { FaCarSide } from "react-icons/fa";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  options: any[];
  fieldName: string;
  setSearch: (value: any) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const AutoCompleteField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  options,
  fieldName,
  setSearch,
  setFieldValue,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [field, { error }] = useField(props);
  const [value, setValue] = useState("");
  return (
    <FormControl isInvalid={!!error} mb={2}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        value={value}
        id={field.name}
        onChange={onOpen}
        onClick={() => {
          onOpen();
          setValue(field.value);
        }}
      />
      <Input type="hidden" {...field} {...props} />
      {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      <Modal size="xl" isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={2}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaCarSide color="gray.300" />}
              />
              <Input
                placeholder="Kendaraan"
                value={value}
                autoComplete="off"
                onChange={(event) => {
                  setValue(event.currentTarget.value);
                  setSearch(event.currentTarget.value);
                }}
              />
            </InputGroup>
            {options ? (
              <VStack my={2} align="left">
                {options.map((option) => (
                  <Box
                    key={option.id}
                    px={2}
                    py={2}
                    border="1px"
                    borderColor="gray.100"
                    onClick={() => {
                      onClose();
                      setValue(option[fieldName]);
                      setFieldValue(field.name, option.id);
                    }}
                  >
                    {option[fieldName]}
                  </Box>
                ))}
              </VStack>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};

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
import { IconType } from "react-icons";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
  ChildrenIcon: IconType;
  options: any[];
  fieldName: string;
  initialValue?: string;
  setSearch: (value: any) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const AutoCompleteField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  ChildrenIcon,
  size: _,
  options,
  fieldName,
  initialValue,
  setSearch,
  setFieldValue,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [field, { error }] = useField(props);
  const [value, setValue] = useState(initialValue);
  return (
    <FormControl isInvalid={!!error} mb={2}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        value={value}
        id={field.name}
        placeholder={placeholder}
        onChange={onOpen}
        onClick={() => {
          onOpen();
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
                children={<ChildrenIcon color="gray.300" />}
              />
              <Input
                placeholder={placeholder}
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

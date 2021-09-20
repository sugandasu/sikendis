import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type SelectionFieldProps = InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  placeholder: string;
  options?: {
    text: string;
    value: string;
  }[];
};

export const SelectionField: React.FC<SelectionFieldProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} mb={2}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props} id={field.name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
      {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

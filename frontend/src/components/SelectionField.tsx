import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { SelectHTMLAttributes } from "react";

type SelectionFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  placeholder: string;
  options: any[];
  textField: string;
  valueField: string;
};

export const SelectionField: React.FC<SelectionFieldProps> = ({
  label,
  placeholder,
  options,
  textField,
  valueField,
  ...props
}) => {
  const [field, { error }] = useField(props);
  // console.log(props);
  return (
    <FormControl isInvalid={!!error} my={5}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select id={field.name} placeholder={placeholder} {...field}>
        {options.map((option, i) => (
          <option key={i} value={option[valueField]}>
            {option[textField]}
          </option>
        ))}
      </Select>
      {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

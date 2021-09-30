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
  required?: boolean | false;
  options: any[];
  textField: string;
  valueField: string;
};

export const SelectionField: React.FC<SelectionFieldProps> = ({
  label,
  placeholder,
  required,
  options,
  textField,
  valueField,
  ...props
}) => {
  const [field, { error }] = useField(props);
  // console.log(props);
  return (
    <FormControl isInvalid={!!error} my={5}>
      <FormLabel htmlFor={field.name}>
        {label}
        {required ? <sup> *</sup> : null}
      </FormLabel>
      <Select
        id={field.name}
        required={required}
        placeholder={placeholder}
        {...field}
      >
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

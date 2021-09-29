import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import getNewFileName from "../utils/getNewFileName";

type FileFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  setFile: (value: any) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const FileField: React.FC<FileFieldProps> = ({
  label,
  size: _,
  setFile,
  setFieldValue,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl my={2}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        type="file"
        {...props}
        id={field.name}
        onChange={(event) => {
          setFile(event.currentTarget.files[0]);
          setFieldValue(
            field.name,
            getNewFileName(event.currentTarget.files[0].name)
          );
        }}
      />
      {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

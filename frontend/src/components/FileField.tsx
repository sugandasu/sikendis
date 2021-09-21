import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type FileFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  setFile: (file) => void;
};

export const FileField: React.FC<FileFieldProps> = ({
  name,
  label,
  size: _,
  setFile,
  ...props
}) => {
  // const [field, { error }] = useField(props);
  return (
    <FormControl mb={2}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        type="file"
        {...props}
        id={name}
        onChange={(event) => {
          setFile(event.currentTarget.files[0]);
        }}
      />
      {/* {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null} */}
    </FormControl>
  );
};

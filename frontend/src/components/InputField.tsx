import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  required?: boolean | false;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea: any = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} my={5}>
      <FormLabel htmlFor={field.name}>
        {label}
        {required ? <sup> *</sup> : null}
      </FormLabel>
      <InputOrTextarea
        required={required}
        {...field}
        {...props}
        id={field.name}
      />
      {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

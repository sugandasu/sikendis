import { UserInput } from "../inputs/UserInput";

export const registerValidation = ({
  username,
  email,
  password,
}: UserInput) => {
  if (username.trim().length < 6) {
    return {
      errors: [
        {
          field: "username",
          message: "Username minimal memiliki 6 karakter",
        },
      ],
    };
  }

  if (username.includes("@")) {
    return {
      errors: [
        {
          field: "username",
          message: "Username tidak valid, tidak boleh memiliki karakter @",
        },
      ],
    };
  }

  if (!email.includes("@")) {
    return {
      errors: [
        {
          field: "email",
          message: "Email tidak valid",
        },
      ],
    };
  }

  if (password.trim().length < 6) {
    return {
      errors: [
        {
          field: "password",
          message: "Password minimal memiliki 6 karakter",
        },
      ],
    };
  }

  return null;
};

import { User } from "../../entities/User";
import { AkunInput } from "./../inputs/AkunInput";

export const akunValidation = async (
  payload: AkunInput,
  id: number | undefined
) => {
  if (payload.username.trim().length < 6) {
    return [
      {
        field: "username",
        message: "Username minimal memiliki 6 karakter",
      },
    ];
  }

  if (payload.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username tidak valid, tidak boleh memiliki karakter @",
      },
    ];
  }

  const usernameExists = await User.findOne({ username: payload.username });
  if (usernameExists && usernameExists.id !== id) {
    return [
      {
        field: "username",
        message: "Username telah digunakan",
      },
    ];
  }

  if (!payload.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Email tidak valid",
      },
    ];
  }

  const emailExists = await User.findOne({ email: payload.email });
  if (emailExists && emailExists.id !== id) {
    return [
      {
        field: "email",
        message: "Email telah digunakan",
      },
    ];
  }

  if (payload.password) {
    if (payload.password.trim().length < 6) {
      return [
        {
          field: "password",
          message: "Password minimal memiliki 6 karakter",
        },
      ];
    }
  }

  return null;
};

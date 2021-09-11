import { UserInput } from "../inputs/UserInput";
import { User } from "../../entities/User";

export const registerValidation = async (payload: UserInput) => {
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
  if (usernameExists) {
    return [
      {
        field: "username",
        message: "Username telah terdaftar",
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
  if (emailExists) {
    return [
      {
        field: "email",
        message: "Email telah terdaftar",
      },
    ];
  }

  if (payload.password.trim().length < 6) {
    return [
      {
        field: "password",
        message: "Password minimal memiliki 6 karakter",
      },
    ];
  }

  return null;
};

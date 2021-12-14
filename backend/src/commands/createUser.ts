import argon2 from "argon2";
import "dotenv-safe/config";
import { createConnection, getConnection } from "typeorm";
import { User } from "../entities/User";
import { __prod__ } from "./../constants";

type params = {
  username: string;
  password: string;
  email: string;
  role: "operator" | "observer";
};

const createUser = async ({
  username,
  email,
  password = "password",
  role = "observer",
}: params) => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [User],
  });

  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) {
    console.log("Username is already taken. Please choose another username.");
    return;
  }

  if (!email.includes("@")) {
    console.log("Email is not valid");
    return;
  }

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    console.log("Email is already taken. Please choose another username.");
    return;
  }

  const hashedPassword = await argon2.hash(password);
  const user = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      username,
      email,
      password: hashedPassword,
      role,
    })
    .execute();

  console.log("User created ,", user);
};

const argv = process.argv.slice(2);
const params: any = {};

argv.forEach((arg) => {
  if (!arg.includes("=")) {
    return;
  }
  const [key, value] = arg.split("=");
  params[key] = value;
});

if (params.username && params.email && params.password && params.role) {
  createUser(params);
} else {
  console.log(
    "Parameters must have username=USERNAME, email=EMAIL, password=PASSWORD, and role=ROLE"
  );
}

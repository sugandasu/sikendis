import { __prod__ } from "../constants";
import argon2 from "argon2";
import { User } from "../entities/User";
import "dotenv-safe/config";
import { createConnection, getConnection } from "typeorm";

type params = {
  username: string;
};

const createUser = async ({ username }: params) => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [User],
  });

  const user = await User.findOne({ where: { username } });
  if (!user) {
    console.log("Username does not exist.");
    return;
  }

  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      password: await argon2.hash("password"),
    })
    .where("id = :id", { id: user.id })
    .execute();

  console.log("User reset ,", user);
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

if (params.username) {
  createUser(params);
} else {
  console.log("Parameters must have username=USERNAME");
}

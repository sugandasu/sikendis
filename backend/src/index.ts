import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { createConnection } from "typeorm";
import path from "path";
import { Kendaraan } from "./entities/Kendaraan";
import { Peminjaman } from "./entities/Peminjaman";
import { Pengguna } from "./entities/Pengguna";
import { User } from "./entities/User";

const main = async () => {
  const app = express();

  // const conection = await createConnection({
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Kendaraan, Pengguna, User, Peminjaman],
  });

  // await conection.runMigrations();

  app.get("/", ({ res }) => {
    res?.send("Hello world!");
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `backend is listening on port ${process.env.DOMAIN_NAME}:${process.env.PORT}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});

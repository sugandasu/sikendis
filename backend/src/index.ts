import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";

const main = async () => {
  const app = express();

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

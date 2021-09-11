import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Kendaraan } from "./entities/Kendaraan";
import { Peminjaman } from "./entities/Peminjaman";
import { Pengguna } from "./entities/Pengguna";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/HelloResolver";
import { PenggunaResolver } from "./resolvers/PenggunaResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { MyContext } from "./types/myContext";

const main = async () => {
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

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PenggunaResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(
      `backend is listening on port ${process.env.DOMAIN_NAME}:${process.env.PORT}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});

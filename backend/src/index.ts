import { ApolloServer, Config, ExpressContext } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { Kendaraan } from "./entities/Kendaraan";
import { Peminjaman } from "./entities/Peminjaman";
import { PeminjamanOperasional } from "./entities/PeminjamanOperasional";
import { Pengguna } from "./entities/Pengguna";
import { PenggunaRutin } from "./entities/PenggunaRutin";
import { Simda } from "./entities/Simda";
import { User } from "./entities/User";
import { DashboardResolver } from "./resolvers/DashboardResolver";
import { HelloResolver } from "./resolvers/HelloResolver";
import { KendaraanResolver } from "./resolvers/KendaraanResolver";
import { PeminjamanOperasionalResolver } from "./resolvers/PeminjamanOperasionalResolver";
import { PeminjamanResolver } from "./resolvers/PeminjamanResolver";
import { PenggunaResolver } from "./resolvers/PenggunaResolver";
import { PenggunaRutinResolver } from "./resolvers/PenggunaRutinResolver";
import { SimdaResolver } from "./resolvers/SimdaResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { MyContext } from "./types/myContext";

const main = async () => {
  // const conection = await createConnection({
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [
      Kendaraan,
      Pengguna,
      User,
      Peminjaman,
      PeminjamanOperasional,
      PenggunaRutin,
      Simda,
    ],
  });

  // await conection.runMigrations();

  const apolloServer = new ApolloServer({
    uploads: false,
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        PenggunaResolver,
        KendaraanResolver,
        PeminjamanOperasionalResolver,
        PeminjamanResolver,
        PenggunaRutinResolver,
        DashboardResolver,
        SimdaResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
    }),
  } as Config<ExpressContext>);

  await apolloServer.start();
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

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
        secure: __prod__,
        domain: __prod__ ? process.env.DOMAIN_NAME : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const dir = path.join(__dirname, "./../uploads");
  app.use("/static", express.static(dir));

  if (__prod__) {
    app.set("trust proxy", 1);
  }

  app.get("/", function (req, res) {
    res.send("It works!");
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

declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    CORS_ORIGIN: string;
    BACKEND_URL: string;
    DOMAIN_NAME: string;
    COOKIE_NAME: string;
  }
}
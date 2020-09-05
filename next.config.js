const withSASS = require("@zeit/next-sass");
const withTypescript = require("@zeit/next-typescript");

module.exports = [
  withSASS,
  withTypescript,
  {
    plugins: ["react-hooks"],
    rules: {
      "react-hooks/rules-of-hooks": "error", // Проверяем правила хуков
      "react-hooks/exhaustive-deps": "warn", // Проверяем зависимости эффекта
    },
  },
];

const { env } = process;

module.exports.env = {
  HOSTNAME: env.HOSTNAME,
  PORT: env.PORT,
  HOST: env.HOST,
  HOST_API: env.HOST_API,
  GRAPHQL: env.GRAPHQL,
  HOST_GRAPHQL: env.HOST_GRAPHQL,
  HOST_WS: env.HOST_WS,
  EMPTY_AVATAR_USER: env.EMPTY_AVATAR_USER,
  EMPTY_AVATAR_CHAT: env.EMPTY_AVATAR_CHAT,
  DB_NAME: env.DB_NAME,
  DB_LOGIN: env.DB_LOGIN,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_GET: env.DB_GET,
  DB_HOST_WITHOUT_GET: env.DB_HOST_WITHOUT_GET,
  DB_HOST: env.DB_HOST,

  //auth
  GOOGLE_ID: env.GOOGLE_ID,
  GOOGLE_SECRET: env.GOOGLE_SECRET,
};

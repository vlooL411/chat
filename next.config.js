require("./RunServers")();
const withSASS = require("@zeit/next-sass")();
const withTypescript = require("@zeit/next-typescript")();

module.exports = {
  withSASS,
  withTypescript,
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error", // check rules of hooks
    "react-hooks/exhaustive-deps": "warn", // check dependencies effect
  },
};

const { env } = process;

module.exports.env = {
  PORT: env.PORT,
  HOSTNAME: env.HOSTNAME,
  HOST: env.HOST,
  HOST_API: env.HOST_API,

  //GRAPHQL
  PORT_GRAPHQL: env.PORT_GRAPHQL,
  GRAPHQL: env.GRAPHQL,
  GRAPHQLSUB: env.GRAPHQLSUB,
  HOST_GRAPHQL: env.HOST_GRAPHQL,
  HOST_GRAPHGQLSUB: env.HOST_GRAPHGQLSUB,
  RUN_APOLLO_SERVER: env.RUN_APOLLO_SERVER,

  //Empty img
  EMPTY_AVATAR_USER: env.EMPTY_AVATAR_USER,
  EMPTY_AVATAR_CHAT: env.EMPTY_AVATAR_CHAT,

  //TODO if necessary
  //DB data
  DB_HOST: env.DB_HOST,
  DB_HOST_WITHOUT_GET: env.DB_HOST_WITHOUT_GET,

  //TODO if necessary
  //auth
  NEXTAUTH_URL: env.NEXTAUTH_URL,
  GOOGLE_ID: env.GOOGLE_ID,
  GOOGLE_SECRET: env.GOOGLE_SECRET,
};

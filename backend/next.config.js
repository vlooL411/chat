if (process.env.NODE_ENV === 'development')
  require('./RunServers')()

const { NEXTAUTH_URL_CALLBACK } = process.env
module.exports = {
  headers: () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: NEXTAUTH_URL_CALLBACK },
        { key: "Access-Control-Allow-Credentials", value: "true" }
      ]
    }
  ]
}

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

  //TODO if necessary
  //DB data
  DB_HOST: env.DB_HOST,
  DB_HOST_WITHOUT_GET: env.DB_HOST_WITHOUT_GET,

  //TODO if necessary
  //auth
  NEXTAUTH_URL: env.NEXTAUTH_URL,
  NEXTAUTH_URL_CALLBACK: env.NEXTAUTH_URL_CALLBACK,
  SIGN_OUT: env.SIGN_OUT,
  SIGN_ERROR: env.SIGN_ERROR,

  //GOOGLE
  GOOGLE_ID: env.GOOGLE_ID,
  GOOGLE_SECRET: env.GOOGLE_SECRET,
};

import 'colors'

import schema from 'apolloclient/schema'
import detect from 'detect-port'
import dbConnect from 'utils/dbConnect'
import { ApolloServer } from 'apollo-server'

const { HOST } = process.env;
const { GRAPHQL } = process.env;
const { GRAPHQLSUB } = process.env;
const { PORT_GRAPHQL } = process.env;

const isDev = process.env.NODE_ENV === "development";

//TODO apollo-server-micro(better) check, current version have work trouble subscribes
detect(PORT_GRAPHQL, (err, port) => {
  if (err)
    console.log(`Apollo server listen error (Port: ${port}):`.bgRed, err);

  if (PORT_GRAPHQL != port) return;

  const apolloServer = new ApolloServer({
    schema,
    context: async (ctx) => {
      await dbConnect();
      return ctx;
    },
    cors: {
      origin: HOST,
      credentials: true,
    },
    playground: isDev,
    introspection: isDev,
    tracing: isDev,
    subscriptions: {
      path: GRAPHQLSUB,
      onConnect: isDev
        ? () => console.log("Subscription connect".bgGreen)
        : null,
      onDisconnect: isDev
        ? () => console.log("Subscription disconnect".bgBlue)
        : null,
    },
  });

  //don't work
  apolloServer.graphqlPath = GRAPHQL;

  // TODO figure out how to set another PORT and graphqlPath
  apolloServer.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`.bgMagenta);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`.bgMagenta);
  });
});

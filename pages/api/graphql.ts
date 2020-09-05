import ws from "ws";
import http from "http";
import dbConnect from "../../utils/dbConnect";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "./../../apolloclient/schema";

const { GRAPHQL } = process.env;
const { GRAPHQLSUB } = process.env;
const { HOST_WS } = process.env;

const isDev = process.env.NODE_ENV === "development";

const apolloServer = new ApolloServer({
  schema,
  context: async (ctx) => {
    await dbConnect();
    return ctx;
  },
  playground: isDev,
  introspection: true,
  tracing: isDev,
  subscriptions: {
    path: `/api${GRAPHQLSUB}`,
    keepAlive: 9000,
    onConnect: () => console.log("connected subscriptions"),
    onDisconnect: () => console.log("disconnected subscriptions"),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const httpServer = http.createServer();

const wss = new ws.Server({ path: `/api${GRAPHQL}`, server: httpServer });

wss.on("connection", (ws: ws) => {
  ws.on("message", (message: string) => {
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });
  ws.send("Hi there, I am a WebSocket server");
});

/* httpServer.listen(`/api${GRAPHQL}`, () => {
  console.log(`Server started on port ${httpServer.address()} :)`);
});
 */

apolloServer.installSubscriptionHandlers(wss);

export default apolloServer.createHandler({ path: `/api${GRAPHQL}` });

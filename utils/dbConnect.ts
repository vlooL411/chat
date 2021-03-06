import "colors";
import { connect, connection } from "mongoose";

const { DB_HOST } = process.env;

const readyStates = [
  "disconnected",
  "connected",
  "connecting",
  "disconnecting",
];

export default async () => {
  const { readyState } = connection;

  console.info("MongoDB State:".green, readyStates[readyState]);
  if (connection.readyState == 1) return;

  await connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.info("MongoDB Connection:".green, readyStates[readyState]);

  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", () => console.log("MongoDB Open connection"));
};

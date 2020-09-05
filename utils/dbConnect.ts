import { connect, connection } from "mongoose";

const { DB_HOST } = process.env;

const readyStates = [
  "disconnected",
  "connected",
  "connecting",
  "disconnecting",
];

const dbConnect = async () => {
  const { readyState } = connection;

  console.info("State:", readyStates[readyState]);
  if (connection.readyState == 1) return;

  await connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.info("Connection:", readyStates[readyState]);

  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", () => console.log("Open connection"));
};

export default dbConnect;

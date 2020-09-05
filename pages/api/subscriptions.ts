import ws from "ws";
import http from "http";

const server = http.createServer();

const wss = new ws.Server({ server });

wss.on("connection", (ws: ws) => {
  ws.on("message", (message: string) => {
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });
  ws.send("Hi there, I am a WebSocket server");
});

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${server.address()} :)`);
});

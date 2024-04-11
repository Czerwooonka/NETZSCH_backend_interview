import { WebSocketServer } from "ws";
import { createServer } from "http";

const port = process.env.port || 8080;

const server = createServer();
const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (connection) => {
  console.log(`Received a new connection.`);

  connection.on("message", (message) => {
    const content = JSON.parse(message.toString()).content;
    // connection.send(JSON.stringify(content));
    wsServer.clients.forEach((client) => client.send(JSON.stringify(content)));
    console.log(connection.readyState);
    console.log(content);
  });
});

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// import express from "express";
// import bodyParser from "body-parser";

// const port = process.env.port || 8080;
// const app = express();

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;

//   console.log(err.message, err.stack);

//   res.status(statusCode).json({ message: err.message });
// });

// app.get("/", (req, res, next) => {
//   res.json({ message: "ok" });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}...`);
// });

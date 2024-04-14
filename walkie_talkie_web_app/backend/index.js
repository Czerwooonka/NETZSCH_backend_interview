import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";
import { randomUUID } from "crypto";
import { parse } from "url";

const port = process.env.port || 8080;
const connections = {};
const users = {};

const server = createServer();
const wsServer = new WebSocketServer({ server });

const authenticate = (params) => {
  let result = false;

  if (params.query) {
    const token = params.query.split("=")[1];
    if (token === "abc") {
      result = true;
    }
  }

  return result;
};

function broadcastMessage(toAdmins, message) {
  const data = JSON.stringify(message);

  for (let userId in connections) {
    if (toAdmins ? users[userId].admin : !users[userId].admin) {
      let client = connections[userId];
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  }
}

const handleMessage = (data, uuid) => {
  const message = JSON.parse(data.toString());

  if (users[uuid].admin) {
    broadcastMessage(false, message.content);
  } else {
    broadcastMessage(true, message.content);
  }
};

const handleClose = (uuid) => delete connections[uuid];

wsServer.on("connection", (connection, req) => {
  const isAdmin = authenticate(parse(req.url));

  const uuid = randomUUID();
  connections[uuid] = connection;
  users[uuid] = { admin: isAdmin };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

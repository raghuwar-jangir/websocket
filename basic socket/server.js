const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("✅ Connected Successfully");
  socket.on("close", () => {
    console.log("❌ socket connection closed");
  });
});

server.listen(4001, () => {
  console.log("✅ server is listening");
});

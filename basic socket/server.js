const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("✅ Connected Successfully");

  socket.send(
    JSON.stringify({
      sender: "Bot",
      text: "Hello! I am your WebSocket Bot. Ask me anything!",
    }),
  );

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log("Received:", parsedMessage);

    // Simple Bot Logic: Echo back with a response
    setTimeout(() => {
      const botReply = {
        sender: "Bot",
        text: `You said: "${parsedMessage.text}". I am listening!`,
      };
      // Send message back down the socket
      socket.send(JSON.stringify(botReply));
    }, 500); // Artificial delay for realism
  });

  socket.on("close", () => console.log("Client disconnected."));
});

server.listen(4001, () => {
  console.log("✅ server is listening");
});

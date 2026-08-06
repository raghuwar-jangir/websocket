const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS configured for our React frontend
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your React app URL
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // 1. Send an initial greeting from the Bot when a user connects
  socket.emit('bot_message', {
    sender: 'ChatBot',
    text: 'Hello! I am your AI assistant. How can I help you today?'
  });

  // 2. Listen for incoming user messages
  socket.on('user_message', (data) => {
    console.log(`Received from ${socket.id}:`, data.text);

    // Simulate Bot thinking delay
    setTimeout(() => {
      const botResponse = generateBotReply(data.text);
      
      // Emit the reply back ONLY to the specific user who asked
      socket.emit('bot_message', {
        sender: 'ChatBot',
        text: botResponse
      });
    }, 1000);
  });

  // 3. Handle user disconnects
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Simple Bot Logic
function generateBotReply(userText) {
  const text = userText.toLowerCase();
  if (text.includes('hello') || text.includes('hi')) {
    return "Hey there! Hope you're having a great day.";
  } else if (text.includes('socket')) {
    return 'Socket.io makes real-time bidirectional communication super clean!';
  } else {
    return `You asked: "${userText}". I am a simple bot, but I am listening!`;
  }
}

server.listen(4001, () => {
  console.log('Socket.io server running on http://localhost:4001');
});
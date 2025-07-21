// import { Server } from 'socket.io';
// import http from 'http';
// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: '*', methods: ['GET', 'POST'] }
// });

// io.on('connection', (socket) => {
//   console.log('Socket connected:', socket.id);

//   socket.on('register', (userId) => {
//     socket.join(userId);
//   });

//   socket.on('disconnect', () => {
//     console.log('Socket disconnected:', socket.id);
//   });
// });

// export { io, server, app };




// config/socket.js

import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: ['https://lab.dooper.in'], // replace or extend as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json()); // ✅ Parse JSON body in requests

// ✅ Create HTTP server and bind it to the express app
const server = http.createServer(app);

// ✅ Setup socket.io server
const io = new Server(server, {
  cors: {
    origin: ['https://lab.dooper.in'], // match your frontend domain
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Socket events
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  // Listen for user registration
  socket.on('register', (userId) => {
    console.log(`User ${userId} joined their own room`);
    socket.join(userId); // Join room named after userId
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});

// ✅ Export everything needed
export { io, server, app };

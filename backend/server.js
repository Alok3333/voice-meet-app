require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ACTIONS = require('./actions');

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cookieParser());

const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));

// console.log(process.env);
const PORT = process.env.PORT || 5500;
DbConnect();

app.use(express.json({ limit: '8mb' }));
app.use(router);

app.get('/', (req, res) => {
  res.send("<h1>Hi... I'm Express.</h1>");
});

// Sockets

const socketUserMapping = {};

io.on('connection', (socket) => {
  console.log('new connection', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;

    // new Map
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
    });

    socket.emit(ACTIONS.ADD_PEER, {
      peerId: clientId,
      createOffer: true,
      user: socketUserMapping[clientId],
    });

    socket.join(roomId);
  });

  // Handle relay Ice
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.RELAY_ICE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // Handle relay sdp (session description)
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.RELAY_SDP, {
      peerId: socket.id,
      sessionDescription,
    });
  });
});

server.listen(PORT, () => {
  console.log(`You are connecting on port number ${PORT}`);
});

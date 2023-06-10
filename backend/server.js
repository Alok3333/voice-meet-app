require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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

server.listen(PORT, () => {
  console.log(`You are connecting on port number ${PORT}`);
});

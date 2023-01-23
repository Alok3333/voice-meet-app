require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database');
const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
}
app.use(cors(corsOption));

// console.log(process.env);
const PORT = process.env.PORT || 5500;
DbConnect();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send("<h1>Hi... I'm Express.</h1>")
});

app.listen(PORT, () => {
    console.log(`You are connecting on port number ${PORT}`);
});
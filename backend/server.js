require('dotenv').config();
const express = require('express');
const router = require('./routes');
const DbConnect = require('./database');


// console.log(process.env);
const app = express();
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
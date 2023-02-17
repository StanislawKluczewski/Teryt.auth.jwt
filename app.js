const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoUrl = 'mongodb://localhost:27023/teryt-auth-db';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(
    console.log('Connected to database')
).catch(error => {
    console.log('Connection failed. ' + error);
})


module.exports = app;
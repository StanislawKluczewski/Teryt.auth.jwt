require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MONGO_URI } = process.env;
const userRoutes = require('./routes/user.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/users', userRoutes);

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
}).then(
    console.log('Connected to database')
).catch(error => {
    console.log('Connection failed. ' + error);
})


module.exports = app;
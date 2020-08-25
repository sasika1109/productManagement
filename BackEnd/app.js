const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//request routing
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

const apiURL = '/api/v1';

// body parser
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

    next();
});

app.use(`${apiURL}/users`, userRoute);
app.use(`${apiURL}/products`, productRoute);

module.exports = app;
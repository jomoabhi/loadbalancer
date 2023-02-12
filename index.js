const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const { json, response } = require('express');
require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//home page route of master server
app.use('/', require('./routes/home'));
//route to calculate nearest server
app.use('/nearestServer', require('./routes/servers'));
// Listen on PORT 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  err
    ? console.log('Failed to listen on PORT 8080')
    : console.log('Load Balancer Server ' + 'listening on PORT ' + PORT);
});

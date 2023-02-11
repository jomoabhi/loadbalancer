const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const { json, response } = require('express');
require('dotenv').config();
// app.set('trust proxy', true);
// const path = require('path');
app.use(express.static('public'));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Application servers

// Track the current application server to send request

// Serve favicon.ico image
// app.get('/favicon.ico', (req, res) => res.sendFile('/favicon.ico'));
// app.get('/nearestServer/server', (req, res) => {
//   res.render('server');
// });
// When receive new request
// Pass it to handler method

app.use('/', require('./routes/home'));
app.use('/nearestServer', require('./routes/servers'));
// Listen on PORT 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  err
    ? console.log('Failed to listen on PORT 8080')
    : console.log('Load Balancer Server ' + 'listening on PORT ' + PORT);
});

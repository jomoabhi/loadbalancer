const router = require('express').Router();

const IP = require('ip');

const axios = require('axios');
var server, code1, location;
var data = require('./serverInformation/serversInfo').data;

//Array to store current server of that location
var current = [0, 0, 0];

//function to distribute traffic using Round Robin's Algorithm
const Distribute_traffic = (code) => {
  current[code - 1] === data[code - 1].url.length - 1
    ? (current[code - 1] = 0)
    : current[code - 1]++;
  server = data[code - 1].url[current[code - 1]];
};

// Receive new request
// Forward to application server

const handler = async (req, res) => {
  // Destructure following properties from request object
  const { method, url, headers } = req;

  // console.log(req.cookies.server);
  if (req.cookies.server_code != undefined) {
    location = req.cookies.location;

    Distribute_traffic(Number(req.cookies.server_code));
    return res.json({
      count_server: current[Number(req.cookies.server_code) - 1],
      server,
      server_no: req.cookies.location,
    });
  } else {
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&ip_address=${req.body.data}`
      )
      .then(async (response) => {
        const { getServer } = require('./helper/nearestserver');

        //Fuction to get nearest server
        const nearest_server = getServer(
          response.data.latitude,
          response.data.longitude
        );

        code = nearest_server.code;
        location = nearest_server.location;
        Distribute_traffic(nearest_server.code);
        //saving server code and location in cookie
        res.cookie('server_code', nearest_server.code);
        res.cookie('location', nearest_server.location);
        // console.log('cookie created successfully');

        return res.json({
          count_server: current[nearest_server.code - 1],
          server,
          server_no: nearest_server.location,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

//route to get nearest server
router.post('*', async (req, res) => {
  // console.log(req.body);

  await handler(req, res);
});

module.exports = router;

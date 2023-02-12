const router = require('express').Router();

const IP = require('ip');
let current = 0;
const axios = require('axios');
var server, code1, location;
var data = require('./serversInfo').data;
var count_India = 0,
  count_UK = 0,
  count_US = 0;
var count = [0, 0, 0];
const calServ = (code) => {
  switch (code) {
    case 1:
      server = data[0].url[count_India];
      count_India === data[0].url.length - 1
        ? (count_India = 0)
        : count_India++;
      break;
    case 2:
      server = data[1].url[count_India];
      count_UK === data[1].url.length - 1 ? (count_UK = 0) : count_UK++;
      break;
    case 3:
      server = data[2].url[count_India];
      count_US === data[2].url.length - 1 ? (count_US = 0) : count_US++;
      break;
  }
};
const calServ1 = (code) => {
  count[code - 1] === data[code - 1].url.length - 1
    ? (count[code - 1] = 0)
    : count[code - 1]++;
  server = data[code - 1].url[count[code - 1]];
};
// Receive new request
// Forward to application server

const handler = async (req, res) => {
  // Destructure following properties from request object
  const { method, url, headers } = req;

  // console.log(req.cookies.server);
  if (req.cookies.server_code != undefined) {
    // console.log('cookie', req.cookies);
    // code = req.cookies.server_code;
    location = req.cookies.location;
    console.log(req.cookies.server_code);
    calServ1(Number(req.cookies.server_code));
    return res.json({
      count_server: count[Number(req.cookies.server_code) - 1],
      server,
      server_no: req.cookies.location,
    });
  } else {
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&ip_address=${req.body.data}`
      )
      .then(async (response) => {
        const { getServer } = require('./nearestserver');

        const near = getServer(response.data.latitude, response.data.longitude);
        // var server;
        code = near.code;
        location = near.location;
        calServ1(near.code);
        res.cookie('server_code', near.code);
        res.cookie('location', near.location);
        console.log('cookie created successfully');
        // console.log();
        console.log({ data: near.location, base_url: server });

        return res.json({
          count_server: count[near.code - 1],
          server,
          server_no: near.location,
        });
        // console.log(server);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

router.post('*', async (req, res) => {
  console.log(req.body);

  await handler(req, res);
});

module.exports = router;

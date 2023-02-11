const router = require('express').Router();

const IP = require('ip');
let current = 0;
const axios = require('axios');

// Receive new request
// Forward to application server
const handler = async (req, res) => {
  // Destructure following properties from request object
  const { method, url, headers } = req;
  console.log(url);

  axios
    .get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&ipaddress=${req.body.ip}`
    )
    .then(async (response) => {
      const { getServer } = require('./nearestserver');

      const near = getServer(response.data.latitude, response.data.longitude);
      const server = near.url;
      var body = {
        ...req.body,
        ...near,
      };
      console.log(server);

      try {
        const response = await axios({
          url: `${server}${url}`,
          method: method,
          headers: headers,
          data: body,
        });

        console.log({ data: near.location, base_url: server });

        return res.json({ server, server_no: near.location });
      } catch (err) {
        console.log(err);
        res.status(500).send('Server error!');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
router.post('*', async (req, res) => {
  console.log(req.body);

  await handler(req, res);
});

module.exports = router;

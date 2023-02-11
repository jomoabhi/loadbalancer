const router = require('express').Router();
// const handler=re
const servers = ['http://localhost:3000', 'http://localhost:3001'];
const IP = require('ip');
let current = 0;
const axios = require('axios');

// Receive new request
// Forward to application server
// const handler = async (req, res) => {
//   // Destructure following properties from request object
//   const { method, url, headers, body } = req;
//   console.log(url);
//   // Select the current server to forward the request
//   const server = servers[current];
//   console.log(server);

//   // Update track to select next server
//   current === servers.length - 1 ? (current = 0) : current++;

//   try {
//     // Requesting to underlying application server
//     const response = await axios({
//       url: `${server}${url}`,
//       method: method,
//       headers: headers,
//       data: body,
//     });
//     // Send back the response data
//     // from application server to client
//     console.log({ data: response.data.num, base_url: server });
//     // return res.json({ data: response.data.num });
//     return { response, server };
//   } catch (err) {
//     // Send back the error message
//     console.log(err);
//     res.status(500).send('Server error!');
//   }
// };
router.post('*', async (req, res) => {
  //   console.log(process.env.API_KEY);
  //   const ipAddress = req.headers['x-forwarded-for'];
  ipaddress = req.socket.remoteAddress;
  console.log(req.ip);
  //   res.send("your IP is: " + req.ip);

  //   console.log(ipAddress);
  //   res.send({ data: 'hi' });
  // const response = await handler(req, res);
  // res.writeHead(301, {
  //   Location: 'http://' + req.headers['3000'] + '',
  // });

  return res.json({
    // server_no: response.response.data.num,
    // base_url: response.server,
    ipaddress,
  });
});

module.exports = router;

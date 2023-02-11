const backURL = `/nearestServer`;
// const serverText = document.getElementById('servertext');
const serverText = document.querySelector('#servertext');

let url = '';
// console.log(serverText);
// // const axios = require('axios');
// src = 'https://unpkg.com/axios/dist/axios.min.js';
// fetch(
//   `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.API_KEY}`,
//   { method: 'GET' }
// )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
const getServer = (latitude, longitude) => {
  body = {
    latitude,
    longitude,
  };
  fetch(backURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data, base_url) => {
      // serverText.style.color = 'blue';
      //   window.location = '/nearestServer/server';
    });

  // Requesting to underlying application server
  //     const response = await axios({
  //       url: `${backURL}`,
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     // Send back the response data
  //     // from application server to client
  //     console.log(response);
  //   } catch (err) {
  //     // Send back the error message
  //     // res.status(500).send('Client error!');
  //     console.log('error', err);
  //   }
};

const successCallback = (position) => {
  console.log(position.coords);
  //   getServer();
  body = {
    latitude: position.coords.latitude,
    longitude: position.coords.latitude,
  };
  //   };
  fetch(backURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      serverText.innerHTML = `Connected to server ${data.server_no}`;
      console.log(data.base_url);
      // console.log(data);
    });
};

const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

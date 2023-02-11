const backURL = `/nearestServer`;
// const serverText = document.getElementById('servertext');
const serverText = document.querySelector('#servertext');
// import API_KEY from '../../../LoadBalancer/public/js/config';
// console.log(API_KEY);
let url = '';
// console.log(process.env.NEXT_PUBLIC_API_KEY);
// $.getJSON('http://www.geoplugin.net/json.gp', function (data) {
//   console.log(JSON.stringify(data, null, 2));
// });
$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
  console.log(JSON.stringify(data, null, 2));
  const body = { data: data.ip };
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
});
// const successCallback = (position) => {
//   console.log(position.coords);
//   //   getServer();
//   const body = {
//     latitude: position.coords.latitude,
//     longitude: position.coords.longitude,
//   };
//   //   };
//   fetch(backURL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       serverText.innerHTML = `Connected to server ${data.server_no}`;
//       console.log(data.base_url);
//       // console.log(data);
//     });
// };

// const errorCallback = (error) => {
//   console.log(error);
// };
// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

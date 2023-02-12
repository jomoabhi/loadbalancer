const backURL = `/nearestServer`;

const serverText = document.querySelector('#servertext');

// if (document.cookie) {
//   console.log(decodeURIComponent(document.cookie));
// }

let url = '';

$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
  // console.log(JSON.stringify(data, null, 2));
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
      serverText.innerHTML = `Connected to server number ${data.count_server} at ${data.server_no}`;
    });
});

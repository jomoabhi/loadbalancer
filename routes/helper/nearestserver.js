//data about servers
var data = require('../serverInformation/serversInfo').data;

let radians = function (degree) {
  // degrees to radians
  let rad = (degree * Math.PI) / 180;

  return rad;
};
//calculating distance between 2 places using lat and long
const haversine = (lat1, lon1, lat2, lon2) => {
  let dlat, dlon, a, c, R;
  // if (lon2 < 0) lon1 = lon1 * -1;
  R = 6372.8; // km
  dlat = radians(lat2 - lat1);
  dlon = radians(lon2 - lon1);
  lat1 = radians(lat1);
  lat2 = radians(lat2);
  a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) * Math.cos(lat2);
  // console.log(a);
  c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
};

//function to find nearest server
const getServer = (poslat, poslng) => {
  var smallest = haversine(poslat, poslng, data[0].lat, data[0].lng);

  nearest_server = {
    location: data[0].location,
    code: data[0].code,
    url: data[0].url,
  };
  for (var i = 1; i < data.length; i++) {
    const curr_dist = haversine(poslat, poslng, data[i].lat, data[i].lng);

    if (curr_dist < smallest) {
      small = curr_dist;
      nearest_server = {
        location: data[i].location,
        code: data[i].code,
        url: data[i].url,
      };
    }
  }

  // console.log(small, nearest_server);
  return nearest_server;
};

module.exports = { getServer };

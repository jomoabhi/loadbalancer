var data = require('./serversInfo').data;
// console.log(data);
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
    dist = dist * 1.609344;
  }
  if (unit == 'N') {
    dist = dist * 0.8684;
  }
  return dist;
}

let radians = function (degree) {
  // degrees to radians
  let rad = (degree * Math.PI) / 180;

  return rad;
};

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

//   var html = "";
// var poslat = 26.8756;
// var poslng = 80.9115;

const getServer = (poslat, poslng) => {
  var small = haversine(poslat, poslng, data[0].lat, data[0].lng);
  // var nearest_server = '' + data[0].location + ' - ' + data[0].code;
  nearest_server = {
    location: data[0].location,
    code: data[0].code,
    url: data[0].url,
  };
  for (var i = 1; i < data.length; i++) {
    const sm = haversine(poslat, poslng, data[i].lat, data[i].lng);
    console.log(sm);
    // if this location is within 0.1KM of the user, add it to the list
    if (sm < small) {
      small = sm;
      nearest_server = {
        location: data[i].location,
        code: data[i].code,
        url: data[i].url,
      };
    }
  }

  console.log(small, nearest_server);
  return nearest_server;
};

module.exports = { getServer };

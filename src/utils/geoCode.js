const request = require("request")

const geoCode = (address, callBack) => {
  const geoCodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWJkdWxyYWhtYW45OSIsImEiOiJjazdic2o0amgwNHYzM2dwZHFxNmhmY3M0In0.CS0BqoPYR73lM2PwYCqgsA&limit=1"

  request({ url: geoCodeURL, json: true }, (error, response) => {
    if (error) {
      callBack("unable to connect geoloction service", undefined)
    } else if (response.body.features.length === 0) {
      callBack("unable to find location,Try another Search", undefined)
    } else {
      const latitude = response.body.features[0].center[1]
      const longitude = response.body.features[0].center[0]
      const location = response.body.features[0].place_name
      callBack(undefined, { latitude, longitude, location })
    }
  })
}

module.exports = geoCode

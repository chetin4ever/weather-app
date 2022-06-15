const request = require("request")

// const url =
//   "http://api.weatherstack.com/current?access_key=29c50b83c677a29054e01c47f7362dab&query=Jalgaon&units=m"
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather service")
//   } else if (response.body.error) {
//     console.log("unable to find location")
//   } else {
//     //   const data = JSON.parse(response.body)
//     console.log(
//       response.body.current.weather_descriptions[0] +
//         ". It is currently " +
//         response.body.current.temperature +
//         " degress out."
//     )
//   }
// })

const forecast = (location, callBack) => {
  //   console.log(location)
  const url =
    "http://api.weatherstack.com/current?access_key=29c50b83c677a29054e01c47f7362dab&query=" +
    location.latitude +
    "," +
    location.longitude +
    "&units=m"
  //   console.log(url)
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack("Unable to connect to weather service", undefined)
    } else if (response.body.error) {
      callBack("unable to find location", undefined)
    } else {
      //   const data = JSON.parse(response.body)

      const weather = response.body.current.weather_descriptions[0]
      const temp = response.body.current.temperature

      callBack(undefined, { weather, temp })
    }
  })
}

module.exports = forecast

console.log("client side javascript run")
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const address = document.querySelector(".location")
const weatherText = document.querySelector(".weather-text")

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const location = search.value
  console.log(location)
  fetch("/weather?search=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        address.textContent = data.error
      } else {
        console.log(data)
        const wtext = `its ${data.data.weather} and the current tempreture is ${data.data.temp}`
        weatherText.textContent = wtext
        address.textContent = `Location:${data.location.location}`
      }
    })
  })
})

const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geoCode = require("./utils/geoCode")
const forecast = require("./utils/forecast")
const port = process.env.PORT || 3000

const app = express()
// html page templating using hbs
app.set("view engine", "hbs")

const publicDriectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
// console.log(publicDriectoryPath)
app.set("views", viewsPath)

hbs.registerPartials(partialsPath)
app.use(express.static(publicDriectoryPath))
app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term",
    })
  }
  // console.log(req.query.search)
  // const data=
  // res.send({
  //   forecast: "its raning",
  //   location: req.query.search,
  // })
  const address = req.query.search
  geoCode(address, (error, location = {}) => {
    if (error) {
      return res.send({
        error: "cannot find result try again",
      })
    }

    forecast(location, (error, data) => {
      res.send({ location, data })
      console.log("Data", location)
      console.log(data, error)
    })
  })
})

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "chetan mahajan",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    version: "1.0.0",
    name: "chetan mahajan",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "chetan mahajan",
  })
})
app.listen(port, () => {
  console.log("server is running on port:", port)
})

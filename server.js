const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./router')
const {port, mongoUrl} = require('./config')
const app = express()

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(router)

var server = null
const startServer = () => {
  return mongoose.connect(mongoUrl, {
    //old urlParser deprecated
    useNewUrlParser: true
  })
    .then(() => {
      console.log('connected to db')
      server = app.listen(port, () => {
        console.log(`Server listening on port: ${port}`)
      })
    })
}

const closeServer = () => {
  return mongoose.disconnect()
  .then(() => {
    server.close()
  })
  .catch((err) => {
    //eslint-disable-next-line
    console.log(err)
    server.close()
  })
}

if(require.main === module) {
  console.log(mongoUrl)
  startServer()
}

module.exports = {startServer, closeServer}
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./router')
const {port, mongoUrl} = require('./config')
const app = express()
const passport = require('passport')
const strategy = require('./passport-strategy')
const session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

passport.use(strategy)

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
app.use(router)

const startServer = () => {
  return mongoose.connect(mongoUrl, {
    //old urlParser deprecated
    useNewUrlParser: true
  })
    .then(() => {
      console.log('connected to db')
      app.listen(port, () => {
        console.log(`Server listening on port: ${port}`)
      })
    })
}

startServer()
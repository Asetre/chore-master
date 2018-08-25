import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './router'
import * as Config from './config'

const app = express()

app.use(router)

const startServer = () => {
  return mongoose.connect(Config.mongoUrl, {
    //old urlParser deprecated
    useNewUrlParser: true
  })
    .then(() => {
      app.listen(Config.port, () => {
        console.log(`Server listening on port: ${Config.port}`)
      })
    })
}
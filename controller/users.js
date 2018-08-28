const express = require('express')
const userRouter = express.Router()
const UserRepository = require('../repository/users')()
const UserService = require('../service/users')(UserRepository)

userRouter.post('/create', (req, res) => {
  try {
    let user = UserService.createUser('Test User')
    res.status(201).send(user)
  }catch(err) {
    //eslint-disable-next-line
    console.log(err)
    res.status(500).send('Unable to create user')
  }
})

userRouter.get('/info/:id', (req, res) => {
  let userID = req.params.id
  UserRepository.findByID(userID)
  .then((user) => {
    res.status(200).send(user)
  })
  .catch((err) => {
    //eslint-disable-next-line
    console.log(err)
    res.status(500).send('Unable to find user')
  })
})

module.exports = userRouter
const express = require('express')
const userRouter = require('./controller/users')
const teamRouter = require('./controller/teams')

const router = express.Router()

router.use('/user', userRouter)
router.use('/team', teamRouter)

//Health check
router.get('/health', (req, res) => {
  res.status(200).send('Healthy')
})

router.get('/login',
  (req, res) => {
    console.log('login attempt')
    res.send('test')
  }
)

module.exports = router
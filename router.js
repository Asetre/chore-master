const express = require('express')
const passport = require('passport')
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
  passport.authenticate('auth0', {}),
  (req, res) => {
    res.redirect('/')
  }
)

module.exports = router
const { authDomain, authClientID, authClientSecret, authCallbackURL } = require('./config')
const Auth0Strategy = require('passport-auth0')
const passport = require('passport')

const strategy = new Auth0Strategy({
  domain: authDomain,
  clientID: authClientID,
  clientSecret: authClientSecret,
  callbackURL: authCallbackURL
}, (accessToken, refreshToken, extraParams, profile, done) => {
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
  return done(null, profile)
})

module.exports = strategy

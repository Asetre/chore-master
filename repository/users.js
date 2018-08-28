const Users = require('../models/users')

module.exports = function() {
  return {
    findByID: (id) => {
      return Users.findById(id)
      .then((user) => user)
    },
    findByAuthID: (authID) => {
      return Users.findOne({authID: authID})
      .then((user) => user)
    },
    createUser: (userInfo) => {
      return Users.create(userInfo, (err, user) => {
        if(err) return err
        else return user
      })
    }
  }
}
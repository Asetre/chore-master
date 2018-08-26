const Teams = require('../models/teams')

module.exports = function() {
  return {
    findByID: (id) => {
      return Teams.findById({_id: id})
      .then((team) => team)
    },
    createTeam: (newTeam) => {
      return Teams.create({newTeam}, (err, team) => {
        if(err) return err
        else return team
      })
    }
  }
}
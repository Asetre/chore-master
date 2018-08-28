const Teams = require('../models/teams')

module.exports = function() {
  return {
    findByID: (id) => {
      return Teams.findById(id)
      .then((team) => team)
    },
    createTeam: (newTeam) => {
      return Teams.create(newTeam)
    },
    updateTeam: (updates, teamID) => {
      return Teams.update(
        {_id: teamID}, 
        {$set: {...updates}}
      )
      .then((team) => team)
    },
    removeTaskFromTeam: (taskID, teamID) => {
      return Teams.update(
        {_id: teamID},
        {$pull: {tasks: taskID}}
      )
    }
  }
}
const Teams = require('../models/teams')

module.exports = function() {
  return {
    findByID: (id) => {
      return Teams.findById(id)
      .then((team) => team.deleted_at ? null : team)
    },
    createTeam: (newTeam) => {
      return Teams.create(newTeam)
      .then((team) => team)
    },
    updateTeam: (updates, teamID) => {
      return Teams.updateOne(
        {_id: teamID}, 
        {$set: {...updates}}
      )
    },
    removeTaskFromTeam: (taskID, teamID) => {
      return Teams.update(
        {_id: teamID},
        {$pull: {tasks: taskID}}
      )
    }
  }
}
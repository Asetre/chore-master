const Teams = require('./_team-db')()

module.exports = function() {
  return {
    resetDB: () => {
      Teams.resetDB()
    },
    findByID: (id) => {
      return Teams.findById(id)
      .then((team) => team)
    },
    createTeam: (newTeam) => {
      return Teams.create(newTeam)
    },
    updateTeam: (updates, teamID) => {
      return Teams.update(updates, teamID)
    },
    removeTaskFromTeam: (taskID, teamID) => {
      return Teams.update(
        {_id: teamID},
        {$pull: {tasks: taskID}}
      )
    }
  }
}
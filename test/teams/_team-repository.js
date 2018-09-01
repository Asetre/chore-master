const Teams = require('./_team-db')()

module.exports = function () {
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
      return Teams.findById(teamID)
        .then((team) => {
          let teamTasks = team.tasks
          let indexOfTask = teamTasks.indexOf(taskID)

          teamTasks.splice(indexOfTask, 1)

          let updates = {
            tasks: teamTasks
          }

          return Teams.update(updates, teamID)
        })
    }
  }
}
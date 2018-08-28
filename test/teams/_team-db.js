const uniqid = require('uniqid')

module.exports = function () {
  return new class Teams {
    constructor() {
      this.db = {}
    }

    resetDB() {
      this.db = {}
    }

    create(newTeam) {
      return new Promise((resolve, reject) => {
        let newID = uniqid()
        newTeam = {
          _id: newID,
          tasks: [],
          rewards: [],
          completedTasks: [],
          ...newTeam
        }
        this.db[newID] = newTeam
        resolve(this.db[newID])
      })

    }

    findById(teamID) {
      return new Promise((resolve, reject) => {
        let team = this.db[teamID]
        resolve(team)
      })
    }

    update(updates, teamID) {
      return new Promise((resolve, reject) => {
        let team = this.db[teamID]
        team = {
          ...team,
          ...updates
        }

        let updatedTeam = this.db[teamID] = team
        resolve(updatedTeam)
      })
    }
  }
}
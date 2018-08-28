const uniqid = require('uniqid')

module.exports = function () {
  return new class Tasks {
    constructor() {
      this.db = {}
    }

    resetDB() {
      this.db = {}
    }

    create(newTask) {
      return new Promise((resolve, reject) => {
        let newID = uniqid()

        newTask = {
          _id: newID,
          ...newTask
        }

        this.db[newID] = newTask
        resolve(this.db[newID])
      })

    }

    findById(taskID) {
      return new Promise((resolve, reject) => {
        let task = this.db[taskID]
        resolve(task)
      })
    }

    update(updates, taskID) {
      return new Promise((resolve, reject) => {
        let team = this.db[taskID]
        let task = {
          ...task,
          ...updates
        }

        let updatedTask = this.db[taskID] = task
        resolve(updatedTask)
      })
    }
  }
}
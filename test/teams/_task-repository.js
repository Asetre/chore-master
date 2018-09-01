const Tasks = require('./_task-db')()

module.exports = function() {
  return {
    resetDB: () => {
      Tasks.resetDB()
    },
    findByID: (id) => {
      return Tasks.findById(id)
      .then((task) => task)
    },
    createTask: (taskInfo) => {
      return Tasks.create(taskInfo)
   },
   updateTask: (updates, taskID) => {
     return Tasks.update(updates, taskID)
     .then((task) => task)
   }
  }
}
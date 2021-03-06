const Tasks = require('../models/tasks')

module.exports = function() {
  return {
    findByID: (id) => {
      return Tasks.findById({_id: id})
    },
    createTask: (taskInfo) => {
      return Tasks.create(taskInfo)
   },
   updateTask: (updates, taskID) => {
     return Tasks.update(
       {_id: taskID},
       {$set: {...updates}}
    )
   }
  }
}
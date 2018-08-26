const Tasks = require('../models/tasks')

module.exports = function() {
  return {
    findByID: (id) => {
      return Tasks.findById({_id: id})
    },
    createTask: (taskInfo) => {
      Tasks.create(taskInfo, (err, task) => {
        if(err) return err
        else return task
      })
   }
  }
}
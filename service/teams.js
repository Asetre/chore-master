String.prototype.slugify = function () {
  this.toLocaleLowerCase()
  let escapeRegexChars = this.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
  return escapeRegexChars.replace(new RegExp(' ', 'g'), '-');
}

module.exports = function (TeamRepository, TaskRepository) {
  return {
    createTeam: (name, userID) => {
      //todo: check if user has created the maximum allowed teams
      //todo: check if the user is allowed to create teams

      let slug = name.slugify()
      let newTeam = {
        name,
        slug,
        members: [userID],
        leaders: [userID],
        created_at: new Date().toISOString()
      }

      return TeamRepository.createTeam(newTeam)
    },
    deleteTeam: async (teamID, userID) => {
      let teamToDelete = await TeamRepository.findByID(teamID)

      //todo: custom err
      if (!teamToDelete) throw ('Team does not exist')
      if (teamToDelete.deleted_at) throw ('Team already deleted')
      if(!!!teamToDelete.leaders.find((id) => id === userID)) throw('User does not have permissions to delete')

      let updates = {
        deleted_at: new Date().toISOString()
      }

      return TeamRepository.updateTeam(updates, teamID)
    },
    addTask: async (userID, teamID, taskInfo) => {
      let {name, reward} = taskInfo
      let team = await TeamRepository.findByID(teamID)
      //todo: custom err
      if(!!!team || !!team.deleted_at) throw('Team does not exist')

      let newTask = {
        name,
        slug: name.slugify(),
        reward,
        created_by: userID,
        created_at: new Date().toISOString()
      }

      let createdTask = await TaskRepository.createTask(newTask)
      if(!!!createdTask) throw('Error creating task')

      let taskID = createdTask._id
      team.tasks.push(taskID)
      let teamUpdates = {
        tasks: team.tasks
      }

      await TeamRepository.updateTeam(teamUpdates, teamID)
      return createdTask
    },
    deleteTask: async (taskID, userID, teamID) => {
      let team = await TeamRepository.findByID(teamID)
      let task = await TaskRepository.findByID(taskID)

      if(!!!task || !!task.deleted_at) throw('Task does not exist')
      if(!!!team || !!team.deleted_at) throw('Team does not exist')
      if(!!!team.leaders.find((id) => id === userID)) throw('User cannot delete task')
      //todo: check if user exists

      let taskUpdates = {
        deleted_at: new Date().toISOString
      }

      await TeamRepository.removeTaskFromTeam(taskID, teamID)
      await TaskRepository.updateTask(taskUpdates, taskID)
    },
    updateTask: async (teamID, userID, taskID,taskUpdates) => {
      let team = await TeamRepository.findByID(teamID)
      let task = await TaskRepository.findByID(taskID)

      //todo: check if user is allowed to update task
      await TaskRepository.updateTask(taskUpdates, taskID)
    }
  }
}
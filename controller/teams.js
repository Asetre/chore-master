const express = require('express')
const teamRouter = express.Router()
const TeamRepository = require('../repository/teams')()
const TaskRepository = require('../repository/tasks')()
const UserRepository = require('../repository/users')()
const TeamService = require('../service/teams')(TeamRepository, TaskRepository)

//teamRouter.use(validateUserExists)

teamRouter.get('/:teamID', (req, res) => {
  let {teamID} = req.params

  TeamRepository.findByID(teamID)
    .then((team) => {
      if(!!team.deleted_at) return res.status(200).send('Team deleted')
      res.status(200).send(team)
    })
    .catch((err) => {
      //todo: log the error
      //eslint-disable-next-line
      console.log(err)

      res.status(500).send('Unable to find team')
    })
})

teamRouter.post('/create/:userID', (req, res) => {
  let { teamName } = req.body
  let {userID} = req.params

  try {
    TeamService.createTeam(teamName, userID)
      .then((team) => {
        res.status(201).send(team)
      })
      .catch((err) => {
        //eslint-disable-next-line
        console.log(err)
        throw (err)
      })
  } catch (err) {
    res.status(500).send('Unable to create team')
  }
})

teamRouter.delete('/:teamID/:userID', (req, res) => {
  let { teamID, userID } = req.params
  return TeamService.deleteTeam(teamID, userID)
    .then(() => {
      res.status(200).send('Deleted')
    })
    .catch((err) => {
      //eslint-disable-next-line
      console.log(err)
      res.status(500).send('Error deleting the team')
    })
})

teamRouter.put('/task/add/:teamID/:userID', (req, res) => {
  let teamID = req.params.teamID
  let taskInfo = req.body

  TeamService.addTask(userID, teamID, taskInfo)
})

teamRouter.delete('/task/:teamID/:taskID/:userID', (req, res) => {
  let {taskID, userID, teamID} = req.params

  TeamService.deleteTask(taskID, userID, teamID)
  .then(() => {
    res.send('Task deleted')
  })
  .catch((err) => {
    //eslint-disable-next-line
    console.log(err)
    res.status(500).send('Error deleting task')
  })
})

teamRouter.put('/task/update/:teamID/:userID/:taskID', (req, res) => {
  let {taskUpdates} = req.body
  let {teamID, userID, taskID} = req.params

  TeamService.updateTask(teamID, userID, taskID, taskUpdates)
  .then(() => {
    //todo: send updated task
    res.status(200).send('Task updated')
  })
  .catch((err) => {
    //eslint-disable-next-line
    console.log(err)
    res.status(500).send('Error updating task')
  })
})

//this function is currently not used
//-----------------------------------
async function validateUserExists(req, res, next) {
  let userID = req.params.userID

  let user = await UserRepository.findByID(userID)
  if(!!user || !!!user.deleted_at) return next()
  else res.send('User does not exist')
}
//-----------------------------------

module.exports = teamRouter
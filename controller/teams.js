const express = require('express')
const teamRouter = express.Router()
const TeamRepository = require('../repository/teams')
const TeamService = require('../service/teams')(TeamRepository)

teamRouter.get('/:id', (req, res) => {
  let teamID = req.params.id

  try {
    TeamRepository.findByID(teamID)
    .then((team) => {
      res.status(200).send(team)
    })
    .catch((err) => {
      //todo: log the error
      //eslint-disable-next-line
      console.log(err)
      throw(err)
    })

  }catch(err) {
    //todo: custom errors
    res.status(500).send('Unable to find team')
  }
})

teamRouter.post('/create/:id', (req, res) => {
  let {teamName} = req.body
  let userID = req.params.id

  try {
    TeamService.createTeam(teamName, userID)
    .then((team) => {
      res.status(201).send(team)
    })
    .catch((err) => {
      //eslint-disable-next-line
      console.log(err)
      throw(err)
    })
  }catch(err) {
    res.status(500).send('Unable to create team')
  }
})

teamRouter.post('/delete/:id', (req, res) => {
})

teamRouter.put('/task/add/:teamID', (req, res) => {
  let teamID = req.params.teamID
  let taskInfo = req.body

  try {
    TeamService.addTask(teamID, taskInfo)
  } catch (err) {
  }
})

teamRouter.put('/task/delete/:id', (req, res) => {
})

teamRouter.put('/task/edit/:id', (req, res) => {
})

teamRouter.put('/reward/create/:id', (req, res) => {
})

teamRouter.put('/reward/delete/:id', (req, res) => {
})

teamRouter.put('/reward/edit/:id', (req, res) => {
})

module.exports = teamRouter
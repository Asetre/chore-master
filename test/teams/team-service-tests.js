const chai = require('chai')
const TeamRepository = require('./_team-repository')()
const TaskRepository = require('./_task-repository')()
const TeamService = require('../../service/teams')(TeamRepository, TaskRepository)
const assert = chai.assert
const { startServer, closeServer } = require('../../server')
const uniqid = require('uniqid')

const _createTeam = async () => {
  let userID = uniqid()
  let team = await TeamService.createTeam('Foo bar Bizz Bazz', userID)
  let teamID = team._id

  return { userID, teamID }
}

const _createTask = async (userID, teamID) => {
  let newTask = {
    name: 'First task',
    reward: 'test reward'
  }

  let createdTask = await TeamService.addTask(userID, teamID, newTask)
  return createdTask._id
}


describe('Team Service Unit Test', function () {
  before(async function () {
    await startServer()
  })

  beforeEach(function () {
    TeamRepository.resetDB()
    TaskRepository.resetDB()
  })

  after(async function () {
    await closeServer()
  })

  it('Should create a team', async function () {
    let userID = uniqid()
    let teamName = 'Test team One ABC'

    let team = await TeamService.createTeam(teamName, userID)
    let foundTeam = await TeamRepository.findByID(team._id)

    assert.deepEqual(team, foundTeam)
  })

  it('Should delete a team', async function () {
    let teamName = 'Foo bar'
    let userID = uniqid()

    let team = await TeamService.createTeam(teamName, userID)
    let teamID = team._id

    await TeamService.deleteTeam(teamID, userID)

    team = await TeamRepository.findByID(team._id)

    assert.exists(team)
    assert.exists(team.deleted_at)
  })

  it('Should add a task', async function () {
    let { userID, teamID } = await _createTeam()

    let newTask = {
      name: 'First task',
      reward: 'test reward'
    }

    let createdTask = await TeamService.addTask(userID, teamID, newTask)
    let updatedTeam = await TeamRepository.findByID(teamID)

    let taskID = createdTask._id
    let foundTaskInTeam = updatedTeam.tasks.find((id) => taskID === id)

    assert.exists(createdTask)
    assert.equal(createdTask.name, newTask.name)
    assert.equal(createdTask.reward, newTask.reward)
    assert.equal(foundTaskInTeam, taskID)
  })

  it('Should delete a task', async function () {
    let { userID, teamID } = await _createTeam()
    let taskID = await _createTask(userID, teamID)
    let team = await TeamRepository.findByID(teamID)

    await TeamService.deleteTask(taskID, userID, teamID)
  })
})
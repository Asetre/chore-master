const chai = require('chai')
const assert = chai.assert
const { startServer, closeServer } = require('../../server')
const Teams = require('../../models/teams')
const Tasks = require('../../models/tasks')
const Users = require('../../models/users')
const mongoose = require('mongoose')

const TeamRepository = require('../../repository/teams')()

String.prototype.slugify = function () {
  this.toLocaleLowerCase()
  let escapeRegexChars = this.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
  return escapeRegexChars.replace(new RegExp(' ', 'g'), '-');
}

const resetDB = async () => {
  await Teams.remove({})
  await Tasks.remove({})
  await Users.remove({})
}

const _createTeamAndUser = async (name) => {
  let newUser = {
    name,
    slug: name.slugify(),
    created_at: new Date().toISOString()
  }

  let userID = await Users.create(newUser)
    .then((user) => user._id)

  let newTeam = {
    name,
    slug: name.slugify(),
    created_at: new Date().toISOString(),
    members: [userID],
    leaders: [userID],
    deleted_at: null
  }

  let teamID = await Teams.create(newTeam)
    .then((team) => team._id)

    return {
      userID,
      teamID
    }
}

describe('Team Repository Unit Tests', function () {
  before(async function () {
    await startServer()
  })

  after(async function () {
    await resetDB()
    await closeServer()
  })

  beforeEach(async function () {
    await resetDB()
  })

  it('Should be able to find by id', async function () {
    //todo: userID not currently used
    let {userID, teamID} = await _createTeamAndUser('Test One')
    let team = await TeamRepository.findByID(teamID)

    //convert objectIDs to strings
    teamID = teamID.toString()
    team._id = team._id.toString()

    assert.exists(team)
    assert.equal(team._id, teamID)
    assert.notExists(team.deleted_at)
  })

  it('Should create a team', async function () {
    let {userID} = _createTeamAndUser('Test Two')

    let newTeam = {
      name: 'test',
      slug: 'test',
      created_at: new Date().toISOString(),
      leaders: [userID],
      members: [userID]
    }

    let team = await TeamRepository.createTeam(newTeam)

    assert.exists(team)
    assert.exists(team.created_at)
    assert.equal(team.name, newTeam.name)
    assert.equal(team.slug, newTeam.slug)
    assert.include(team.members, userID)
    assert.include(team.leaders, userID)
  })

  it('Should be able to update a team', async function() {
     let {teamID} = await _createTeamAndUser('Test Three')

     let teamUpdates = {
       name: 'new Name',
       slug: 'new-name'
     }

    await TeamRepository.updateTeam(teamUpdates, teamID)

    let team = await TeamRepository.findByID(teamID)

    assert.equal(team.name, teamUpdates.name)
    assert.equal(team.slug, teamUpdates.slug)
  })

  it('Should be able to remove a task from a team', async function() {
    let {teamID} = await _createTeamAndUser('Test four')
    let taskID = mongoose.Types.ObjectId()

    let teamUpdates = {
      tasks: [taskID]
    }

    await TeamRepository.updateTeam(teamUpdates, teamID)
    await TeamRepository.removeTaskFromTeam(taskID, teamID)

    let team = await TeamRepository.findByID(teamID)

    assert.isEmpty(team.tasks)
  })
})
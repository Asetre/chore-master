const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  members: Array,
  leaders: Array,
  tasks: Array,
  rewards: Array,
  completedTasks: Array,
  created_at: {type: Date, required: true},
  deleted_at: Date
})

const Teams = mongoose.model('Teams', teamSchema)

module.exports = Teams
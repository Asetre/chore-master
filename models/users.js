const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  teams: Array,
  authID: String,
  points: Number,
  tasks: Array,
  completedTasks: Array,
  rewards: Array,
  created_at: {type: Date, required: true},
  deleted_at: Date
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users
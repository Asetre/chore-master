const mongoose = require('mongoose')
const Schema = mongoose.Schema

//todo: remove slug
const tasksSchema = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  reward: String,
  team: {type: String, required: true},
  user: String,
  completed: Boolean,
  created_by: {type: String, required: true},
  created_at: {type: Date, required: true},
  deleted_at: Date
})

const Tasks = mongoose.model('Tasks', tasksSchema)

module.exports = Tasks
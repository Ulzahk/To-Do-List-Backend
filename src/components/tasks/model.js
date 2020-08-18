const mongoose = require('mongoose')
const { Schema } = mongoose

const Tasks = new Schema({
  task_name: { type: String, required: true },
  completed: { type: Boolean, required: true }
})

module.exports = mongoose.model('Tasks', Tasks)

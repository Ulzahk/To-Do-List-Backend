const mongoose = require('mongoose')
const { Schema } = mongoose

const Tasks = new Schema({
  taskname: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true }
})

module.exports = mongoose.model('Tasks', Tasks)

const mongoose = require('mongoose')
const { Schema } = mongoose

const Lists = new Schema({
  list_title: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [{
    _id: String,
    task_name: String,
    completed: Boolean
  }
  ],
  tags: { type: Array, required: false }
})

module.exports = mongoose.model('Lists', Lists)

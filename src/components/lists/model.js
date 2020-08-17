const mongoose = require('mongoose')
const { Schema } = mongoose

const Lists = new Schema({
  list_title: { type: String, required: true },
  description: { type: String, required: true },
  tasks: { type: Array, required: false },
  tags: { type: Array, required: false }
})

module.exports = mongoose.model('Lists', Lists)

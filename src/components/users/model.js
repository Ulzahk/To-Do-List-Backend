const mongoose = require('mongoose')
const { Schema } = mongoose

const Users = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  lists: { type: Array, require: false }
},
{
  timestamps: true
})

module.exports = mongoose.model('Users', Users)

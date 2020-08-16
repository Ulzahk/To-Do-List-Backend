const mongoose = require('mongoose')
const { config } = require('../config/index')

const DB_USER = encodeURIComponent(config.dbUser)
const DB_PASSWORD = encodeURIComponent(config.dbPassword)
const DB_HOST = encodeURIComponent(config.dbHost)
const DB_NAME = encodeURIComponent(config.dbName)

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log('Connection to MongoDB was successful'))
  .catch(error => console.error('There is a problem with the connection to MongoDB ' + error))

module.exports = mongoose

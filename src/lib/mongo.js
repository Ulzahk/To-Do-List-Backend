const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config/index')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_HOST = encodeURIComponent(config.dbHost)
const DB_NAME = encodeURIComponent(config.dbName)

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor () {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    this.dbName = DB_NAME
  }

  connect () {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err)
          }
          console.log('Connected succesfully to MongoDB')
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
  }

  getAll (collection, query) {
    return this.connect().then(db => {
      return db.collection(collection).find(query).toArray()
    })
  }

  get (collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })
    })
  }

  create (collection, data) {
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data)
    }).then(result => result.insertedId)
  }

  // Update List
  update (collection, id, data) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    }).then(result => result.upsertId || id)
  }

  // Update Task to Completed
  updateTask (collection, id, order, completedState) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id), 'tasks.order': parseInt(order) }, { $set: { 'tasks.$.completed': completedState } })
    }).then(result => result.upsertId || id)
  }

  // Update to Add task
  updateAddTask (collection, id, data) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $push: { tasks: data } })
    }).then(result => result.upsertId || id)
  }

  // Update to Remove Task
  updateRemoveTask (collection, id, order) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $pull: { tasks: { order: parseInt(order) } } })
    }).then(result => result.upsertId || id)
  }

  delete (collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id) })
    }).then(() => id)
  }
}

module.exports = MongoLib

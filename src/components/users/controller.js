const Users = require('./model')
const Lists = require('../lists/model')
const bcrypt = require('bcrypt')
const { config } = require('../../config/index')
const jwt = require('jwt-simple')
const moment = require('moment')
const usersController = {}

usersController.getUsers = async (req, res) => {
  try {
    const users = await Users.find()
    res.json({
      state: 200,
      message: 'Users Listed',
      body: users
    })
  } catch (error) {
    console.log(error)
  }
}

usersController.getOneUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id)
    res.json({
      state: 200,
      message: 'Users listed',
      body: user
    })
  } catch (error) {
    next(error)
  }
}

usersController.createUser = async (req, res, next) => {
  try {
    const user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password = bcrypt.hashSync(req.body.password, 10)
    })
    await user.save()
    console.log(user)
    res.redirect('/login')
    /* res.json({
      state: 201,
      message: 'User created',
      body: user
    }) */
  } catch (error) {
    next(error)
  }
}

usersController.updateUser = async (req, res, next) => {
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      lists: req.body.lists
    }
    await Users.findByIdAndUpdate(req.params.id, { $set: user }, { omitUndefined: true, new: true })
    res.json({
      state: 200,
      message: 'User updated',
      body: user
    })
  } catch (error) {
    next(error)
  }
}

usersController.deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id)
    res.json({
      state: 200,
      message: `User ${req.params.id} deleted`
    })
  } catch (error) {
    next(error)
  }
}

// Login
const createToken = (user) => {
  const payload = {
    userId: user._id,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload, config.tokenKey)
}

usersController.loginUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email }).exec()
    if (user === undefined) {
      res.json({
        error: 'Error, email or password not found'
      })
    } else {
      const equals = await bcrypt.compare(req.body.password, user.password)
      if (!equals) {
        res.json({
          error: 'Error, email or password not found'
        })
      } else {
        createToken(user)
        res.redirect('/home')
        /* res.json({
          state: 200,
          done: 'Login correct',
          succesfull: createToken(user)
        }) */
      }
    }
  } catch (error) {
    next(error)
  }
}

usersController.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.userId)
    res.json({
      state: 200,
      message: 'User with token listed',
      body: user
    })
  } catch (error) {
    next(error)
  }
}
// End Login

usersController.addList = async (req, res, next) => {
  try {
    // Find List
    const list = await Lists.findById(req.body.id_list)
    // Add list to User
    await Users.findByIdAndUpdate(
      req.params.id,
      { $push: { lists: list } },
      { omitUndefined: true, new: true })
    // Get data from User
    const user = await Users.findById(req.params.id)
    res.json({
      state: 200,
      message: 'User updated with a new list',
      body: user
    })
  } catch (error) {
    next
  }
}

usersController.removeList = async (req, res, next) => {
  try {
    // Search List
    const list = await Lists.findById(req.body.id_list)
    // Remove List from User
    await Users.findByIdAndUpdate(
      req.params.id,
      { $pull: { lists: list } },
      { omitUndefined: true, new: true })
    console.log(req.body.id_list)
    // Delete List
    await Lists.findByIdAndDelete(req.body.id_list)
    // Get data from User
    const user = await Users.findById(req.params.id)

    res.json({
      state: 200,
      message: 'A list was remove from User',
      body: user
    })
  } catch (error) {
    next(error)
  }
}

module.exports = usersController

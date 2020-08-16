const Users = require('./model')
const Lists = require('../lists/model')
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
      password: req.body.password
    })
    await user.save()
    res.json({
      state: 201,
      message: 'User created',
      body: user
    })
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

usersController.addList = async (req, res, next) => {
  try {
    // Find List
    const list = await Lists.findById(req.body.id_list)
    // Add list to User
    await Users.findByIdAndUpdate(
      req.params.id, 
      { $push: { lists: list} }, 
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
    //Search List
    const list = await Lists.findById(req.body.id_list)
    //Remove List from User
    await Users.findByIdAndUpdate(
      req.params.id,
      { $pull: { lists: list } }, 
      {omitUndefined: true, new: true})
      console.log(req.body.id_list)
    //Delete List
    await Lists.findByIdAndDelete(req.body.id_list)
    //Get data from User
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

const Users = require('./model')
const usersController = {}

usersController.getUsers = async (req, res, next) => {
  try {
    const users = await Users.find()
    res.json({
      state: 200,
      message: 'Users Listed',
      body: users
    })
  } catch (error) {
    next(error)
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

module.exports = usersController

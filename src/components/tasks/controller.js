const Tasks = require('./model')
const tasksController = {}

tasksController.getTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find()
    res.json({
      state: 200,
      message: 'Tasks listed',
      body: tasks
    })
  } catch (error) {
    next(error)
  }
}

tasksController.getOneTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.params.id)
    res.json({
      state: 200,
      message: 'Task listed',
      body: task
    })
  } catch (error) {
    next(error)
  }
}

tasksController.createTask = async (req, res, next) => {
  try {
    const task = new Tasks({
      taskname: req.body.taskname,
      completed: false,
    })
    await task.save()
    res.json({
      state: 201,
      message: 'Task created',
      body: task
    })
  } catch (error) {
    next(error)
  }
}

tasksController.updateTask = async (req, res, next) => {
  try {
    const task = {
      taskname: req.body.taskname,
      completed: req.body.completed
    }
    await Tasks.findByIdAndUpdate(req.params.id, { $set: task }, { omitUndefined: true, new: true })
    res.json({
      state: 200,
      message: 'Task updated',
      body: task
    })
  } catch (error) {
    next(error)
  }
}

tasksController.deleteTask = async (req, res, next) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id)
    res.json({
      state: 200,
      message: `Task ${req.params.id} deleted`
    })
  } catch (error) {
    next(error)
  }
}

module.exports = tasksController

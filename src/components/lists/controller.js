const Lists = require('./model')
const Tasks = require('../../components/tasks/model')
const listsController = {}

listsController.getLists = async (req, res, next) => {
  try {
    const lists = await Lists.find()
    res.json({
      state: 200,
      message: 'Lists readed',
      body: lists
    })
  } catch (error) {
    next(error)
  }
}

listsController.getOneList = async (req, res, next) => {
  try {
    const list = await Lists.findById(req.params.id)
    res.json({
      state: 200,
      message: 'Lists read',
      body: list
    })
  } catch (error) {
    next(error)
  }
}

listsController.createList = async (req, res, next) => {
  try {
    const list = new Lists({
      list_title: req.body.list_title,
      description: req.body.description
    })
    await list.save()
    res.json({
      state: 201,
      message: 'List created',
      body: list
    })
  } catch (error) {
    next(error)
  }
}

listsController.updateList = async (req, res, next) => {
  try {
    const list = {
      list_title: req.body.list_title,
      description: req.body.description,
      tasks: req.body.tasks,
      tags: req.body.tags
    }
    await Lists.findByIdAndUpdate(req.params.id, { $set: list }, { omitUndefined: true, new: true })
    res.json({
      state: 200,
      message: 'List updated',
      body: list
    })
  } catch (error) {
    next(error)
  }
}

listsController.deleteList = async (req, res, next) => {
  try {
    const list = await Lists.findByIdAndDelete(req.params.id)
    res.json({
      state: 200,
      message: `List ${req.params.id} deleted`
    })
  } catch (error) {
    next(error)
  }
}

listsController.deleteListButton = async (req, res, next) => {
  try {
    const list = await Lists.findByIdAndDelete(req.body._id)
    res.redirect('/home')
  } catch (error) {
    next(error)
  }
}


listsController.addTask = async (req, res, next) => {
  try {
    //Create task
    const task = new Tasks({
      task_name: req.body.task_name,
      completed: false,
    })
    await task.save()
    //Find task
    const taskSaved = await Tasks.findOne({task_name: req.body.task_name}).exec()
    //Add task
    await Lists.findByIdAndUpdate(
      req.body.id_list,
      { $push: { tasks: taskSaved } },
      { omitUndefined: true, new: true }
    )
    res.redirect('/home')
  } catch (error) {
    next(error)
  }
}
listsController.removeTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.body.id_task)
    await Lists.findByIdAndUpdate(
      req.body.id_list,
      {$pull: {tasks: task } },
      { omitUndefined: true, new: true}
    )
    await Tasks.findByIdAndDelete(req.body.id_task)
    res.redirect('/home')
  } catch (error) {
    next(error)
  }
}


module.exports = listsController

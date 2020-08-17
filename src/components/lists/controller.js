const Lists = require('./model')
const { Schema } = require('mongoose')
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

module.exports = listsController

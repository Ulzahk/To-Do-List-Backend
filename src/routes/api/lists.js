const express = require('express')
const ListsServices = require('../../services/lists')
const { listIdSchema, createListSchema, updateListSchema } = require('../../utils/schemas/lists')
const validationHandlers = require('../../utils/middleware/validationHandlers')

function toDoListApi (app) {
  const router = express.Router()
  app.use('/api/lists', router)

  const listsServices = new ListsServices()

  // Read Lists
  router.get('/', async function (req, res, next) {
    const { tags } = req.query
    try {
      const lists = await listsServices.getLists({ tags })
      res.status(200).json({
        data: lists,
        message: 'lists readed'
      })
    } catch (error) {
      next(error)
    }
  })

  // Read List
  router.get('/:listId', validationHandlers({ listId: listIdSchema }, 'params'), async function (req, res, next) {
    const { listId } = req.params
    try {
      const list = await listsServices.getList({ listId })
      res.status(200).json({
        data: list,
        message: 'list retrieved'
      })
    } catch (error) {
      next(error)
    }
  })

  // Create List
  router.post('/', validationHandlers(createListSchema), async function (req, res, next) {
    const { body: list } = req
    try {
      const createdListId = await listsServices.createList({ list })

      res.status(201).json({
        data: createdListId,
        message: 'list created'
      })
    } catch (error) {
      next(error)
    }
  })

  // Update List
  router.put('/:listId', validationHandlers({ listId: listIdSchema }, 'params'), validationHandlers(updateListSchema), async function (req, res, next) {
    const { listId } = req.params
    const { body: list } = req
    try {
      const updatedListId = await listsServices.updateList({ listId, list })

      res.status(200).json({
        data: updatedListId,
        message: 'list updated'
      })
    } catch (error) {
      next(error)
    }
  })

  // Update Task
  router.put('/:listId/:taskOrder', async function (req, res, next) {
    const { listId } = req.params
    const { taskOrder } = req.params
    const { completed: completedState } = req.body
    try {
      const updatedCompletedState = await listsServices.updateTask({ listId, taskOrder, completedState })

      res.status(200).json({
        data: updatedCompletedState,
        message: 'task updated'
      })
    } catch (error) {
      next(error)
    }
  })

  // Update To Add Task
  router.patch('/:listId', async function (req, res, next) {
    const { listId } = req.params
    const { body: task } = req
    try {
      const updatedListTasks = await listsServices.updateAddTask({ listId, task })

      res.status(200).json({
        data: updatedListTasks,
        message: 'tasks updated'
      })
    } catch (error) {
      next(error)
    }
  })

  // Update to Remove Task
  router.patch('/:listId/:taskOrder', async function (req, res, next) {
    const { listId } = req.params
    const { taskOrder } = req.params
    try {
      const updatedTaskRemoved = await listsServices.updateRemoveTask({ listId, taskOrder })

      res.status(200).json({
        data: updatedTaskRemoved,
        message: 'tasks removed'
      })
    } catch (error) {
      next(error)
    }
  })

  // Delete List
  router.delete('/:listId', validationHandlers({ listId: listIdSchema }, 'params'), async function (req, res, next) {
    const { listId } = req.params
    try {
      const deletedListId = await listsServices.deleteList({ listId })

      res.status(200).json({
        data: deletedListId,
        message: 'list deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = toDoListApi

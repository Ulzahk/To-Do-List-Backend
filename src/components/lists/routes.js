const express = require('express')
const router = express.Router()
const lists = require('./controller')

router.get('/api/lists', lists.getLists),
router.get('/api/lists/:id', lists.getOneList),
router.post('/api/lists', lists.createList)
router.patch('/api/lists/:id', lists.updateList)
router.delete('/api/lists/:id', lists.deleteList)

// Lists Home
router.post('/deleteList', lists.deleteListButton)
router.post('/authAddTask', lists.addTask)
router.post('/removeTask',lists.removeTask)
router.post('/taskCompleted', lists.markTask)
router.post('/taskUncompleted', lists.unmarkTask)


module.exports = router

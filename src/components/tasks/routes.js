const express = require('express')
const router = express.Router()
const tasks = require('./controller')

router.get('/api/tasks', tasks.getTasks),
router.get('/api/tasks/:id', tasks.getOneTask),
router.post('/api/tasks', tasks.createTask)
router.patch('/api/tasks/:id', tasks.updateTask)
router.delete('/api/tasks/:id', tasks.deleteTask)

module.exports = router

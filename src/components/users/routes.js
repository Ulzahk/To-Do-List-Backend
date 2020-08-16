const express = require('express')
const router = express.Router()
const users = require('./controller')

router.get('/api/users', users.getUsers)
router.get('/api/users/:id', users.getOneUser)
router.post('/api/users', users.createUser)
router.patch('/api/users/:id', users.updateUser)
router.delete('/api/users/:id', users.deleteUser)

router.patch('/api/users/add-list/:id', users.addList)
router.patch('/api/users/remove-list/:id', users.removeList)

module.exports = router

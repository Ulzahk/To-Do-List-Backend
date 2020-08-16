const express = require('express')
const router = express.Router()
const users = require('./controller')

router.get('/api/users', users.getUsers)
router.get('/api/users/:id', users.getOneUser)
router.post('/api/users', users.createUser)
router.patch('/api/users/:id', users.updateUser)
router.delete('/api/users/:id', users.deleteUser)

module.exports = router

const express = require('express')
const router = express.Router()
const users = require('./controller')
const middleware = require('./middleware')


router.get('/api/users', users.getUsers)
router.get('/api/users/:id', users.getOneUser)
router.patch('/api/users/:id', users.updateUser)
router.delete('/api/users/:id', users.deleteUser)

// Lists Update
router.patch('/api/users/add-list/:id', users.addList)
router.patch('/api/users/remove-list/:id', users.removeList)

// Login
router.post('/authregister', users.createUser)
router.post('/authlogin', users.loginUser)

//List
router.post('/authCreateList', users.addOneList)

/* router.use(middleware.checkToken)
router.get('/mainUser', users.getUserById) */


module.exports = router

const express = require('express')
const router = express.Router()
const lists = require('./controller')

router.get('/api/lists', lists.getLists),
router.get('/api/lists/:id', lists.getOneList),
router.post('/api/lists', lists.createList)
router.patch('/api/lists/:id', lists.updateList)
router.delete('/api/lists/:id', lists.deleteList)

module.exports = router

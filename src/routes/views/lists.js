const express = require('express')
const router = express.Router()
const ListsServices = require('../../services/lists')
const { config } = require('../../config/index')

const listsServices = new ListsServices()

router.get('/', async function (req, res, next) {
  const { tags } = req.query
  try {
    const lists = await listsServices.getLists({ tags })
    res.render('lists', { lists, dev: config.dev })
  } catch (error) {
    next(error)
  }
})

module.exports = router

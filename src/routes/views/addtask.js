const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.render('addtask', { layout: 'index', id_list: req.query.id_list})
  } catch (error) {
    next(error)
  }
})

module.exports = router

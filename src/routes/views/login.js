const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
/*     res.render('view1', { layout: 'index', suggestedChamps: arregloPrueba, listExists: true, allowedProtoMethods: true }) */
    res.render('login', { layout: 'index' })
  } catch (error) {
    next(error)
  }
})

module.exports = router

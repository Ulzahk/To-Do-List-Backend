const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
      res.render('view2', { layout: 'index' })
    } catch (error) {
      next(error)
    }
})
  
module.exports = router

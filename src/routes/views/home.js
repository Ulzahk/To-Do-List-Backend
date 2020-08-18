const express = require('express')
const router = express.Router()
const users = require('../../components/users/controller')
const Users = require('../../components/users/model')
const Lists = require('../../components/lists/model')
router.get('/', async (req, res, next) => {
    try {
      let list = await Lists.find().lean()
      console.log(list)
      res.render('home', { layout: 'index', list: list})
    } catch (error) {
      next(error)
    }
})
  
module.exports = router
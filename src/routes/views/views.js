const express = require('express')
const router = express.Router()
const users = require('../../components/users/controller')
const Users = require('../../components/users/model')

router.get('/', async (req, res, next) => {
    try {
        const usersRequest = await Users.find().lean()
        res.render('main', {layout: 'index', suggestedChamps: usersRequest, listExists: true, allowedProtoMethods: true});
    } catch (error) {
        next(error)
    }
});


module.exports = router
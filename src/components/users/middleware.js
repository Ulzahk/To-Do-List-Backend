const jwt = require('jwt-simple')
const moment = require('moment')
const { config } = require('../../config/index')

const checkToken = (req, res, next) => {
  if (!req.headers['user_token']) {
    return res.json({
      error: 'You must include your header'
    })
  }

  const token = req.headers['user_token']
  let payload = null
  try {
    payload = jwt.decode(token, config.tokenKey)
  } catch (error) {
    return res.json({
      error: 'Invalid token',
      message: error
    })
  }

  if (moment().unix() > payload.expiresAt) {
    return res.json({
      error: 'Expired token'
    })
  }
  req.userId = payload.userId
  next()
}

module.exports = {
    checkToken: checkToken
}


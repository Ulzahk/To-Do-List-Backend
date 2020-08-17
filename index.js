const express = require('express')
const path = require('path')
const { config } = require('./src/config/index')
// This const mongoose is use for the connection to MongoDB
const { mongoose } = require('./src/lib/mongodb')
/* Old Configuration
const toDoListApi = require('./src/routes/api/lists')
const listsRouter = require('./src/routes/views/lists')
 */
const handlebars = require('express-handlebars')
const loginRouter = require('./src/routes/views/login')
const registerRouter = require('./src/routes/views/register')
const homeRouter = require('./src/routes/views/home')
const { logErrors, wrapErrors, errorHandler } = require('./src/utils/middleware/errorHandlers')

const app = express()

// Body parser
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// View engine setup
/* app.set('views', path.join(__dirname, 'src/views')) */
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({
  layoutsDir: `${__dirname}/views/layouts/`,
  partialsDir: `${__dirname}/views/partials/`,
  extname: 'hbs',
  defaultLayout: 'planB'
}))

// Routes
/*  Old Configuration
  toDoListApi(app)
  app.use('/lists', listsRouter)
  */
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/home', homeRouter)
app.use('/', require('./src/components/users/routes'))
app.use('/', require('./src/components/tasks/routes'))
app.use('/', require('./src/components/lists/routes'))

// Connection static files
app.use(express.static('public'))

// Redirect(
app.get('/', function (req, res) {
  res.redirect('/login')
})

// Errors middleware
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

// Server
const server = app.listen(config.port, function () {
  console.log(`Server listening at http://localhost:${config.port}`)
})

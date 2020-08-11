const express = require('express');
const path = require('path');
const app = express();
const { config } = require('./src/config/index')
const listsRouter = require('./src/routes/views/lists')
const toDoListApi = require('./src/routes/api/lists')
const { logErrors, wrapErrors, errorHandler} = require('./src/utils/middleware/errorHandlers')

// Body parser
app.use(express.json());

// View engine setup
app.set('views', path.join(__dirname,"src/views"));
app.set('view engine', 'pug');

// Routes´
app.use('/lists', listsRouter)
toDoListApi(app);

// Redirect(
app.get('/', function(req, res){
    res.redirect('/lists')
})

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Server
const server = app.listen(config.port, function() {
    console.log(`Server listening at http://localhost:${config.port}`);
} )
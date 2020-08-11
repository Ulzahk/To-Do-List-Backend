const express = require('express');
const app = express();
const { config } = require('./config/index')
const toDoListApi = require('./routes/lists')

// Body parser
app.use(express.json());

// Routes
toDoListApi(app);

// Redirect(
app.get('/', function(req, res){
    res.redirect('/api/to-do')
})

// Server
const server = app.listen(config.port, function() {
    console.log(`Server listening at http://localhost:${config.port}`);
} )
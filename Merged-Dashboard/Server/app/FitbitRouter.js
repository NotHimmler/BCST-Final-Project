var express = require('express');
var fitbitRouter = express.Router();

fitbitRouter.get('/', function(req,res) {
    res.send("Hello World! This is fitbit router!");
});

// 404 not found
fitbitRouter.get('*', function(req,res) {
    res.status(404).send('404 not found')
});

module.exports = fitbitRouter;
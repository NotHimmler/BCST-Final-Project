var express = require('express');
var patientRouter = express.Router();

patientRouter.get('/', function(req,res) {
    res.send("Hello World! This is patient router!");
});

// 404 not found
patientRouter.get('*', function(req,res) {
    res.status(404).send('404 not found')
});

module.exports = patientRouter;
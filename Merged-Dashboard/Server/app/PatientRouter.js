var express = require('express');
var patientRouter = express.Router();
const db = require('../../Database/models'); // new require for db object  

// Get all patients
patientRouter.get('/', function(req,res) {
    return db.Patient.findAll()
    .then((patients) => res.send(patients))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

patientRouter.get('/current', function(req,res) {
    return db.Patient.findAll({
        where: {
            is_archived: false,
        }
      })
    .then((patients) => res.send(patients))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

patientRouter.get('/archived', function(req,res) {
    return db.Patient.findAll({
        where: {
            is_archived: true,
        }
      })
    .then((patients) => res.send(patients))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

// 404 not found
patientRouter.get('*', function(req,res) {
    res.status(404).send('404 not found')
});

module.exports = patientRouter;
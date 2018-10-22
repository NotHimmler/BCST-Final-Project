let express = require('express');
let goalRouter = express.Router();
const db = require('../../Database/models/index.js'); // new require for db object

patientRouter.get('/', function(req,res) {
    return db.Goal.findAll()
    .then(goalList => res.send(goalList))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err));
      return res.send(err);
    });
});

patientRouter.post('/addGoal', function(req,res) {
   	let body = req.body.patientInfo;
    return db.Goal.findOrCreate({where: {MRN: body.mrn}, defaults: {first_name: body.firstName, last_name: body.lastName, ward:body.ward, age:body.age, sex: body.gender}})
    .then(data => {
        let isNewRecord = data[0]._options.isNewRecord;
        console.log(data)
        res.status(200);
        if (isNewRecord) {
            res.send({okay: "Patient added"})
        } else {
            res.send({error: "Patient with this mrn already exists"});
        }
    }).catch(err => {
        res.status(400);
        res.send({error: "Error with the database"});
         console.log(err);
     });
});
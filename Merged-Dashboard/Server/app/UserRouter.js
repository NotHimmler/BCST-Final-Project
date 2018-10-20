var express = require('express');
var patientRouter = express.Router();
const db = require('../../Database/models/index.js');

patientRouter.post('/login', function(req,res) {
    let body = req.body.userInfo;
    let user_id = body.userid;
    let password = body.password;
    return db.User.findOne({where: {user_id: user_id, password: password}})
    .then(patient => {
        if (patient != null) {
            res.status(200);
            res.send(patient);
        } else {
            res.status(200);
            res.send({error: "Username or Password incorrect"})
        }
    })
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

patientRouter.post('/register', function(req, res) {
    let body = req.body.userInfo;
    
    db.User.create(body)
    .then(data => {
        console.log(data);
        res.status(200);
        res.send();
    }).catch(err => {
        console.log(err);
        res.status(400);
        res.send({error: "Database error"});
    })

})

module.exports = patientRouter;
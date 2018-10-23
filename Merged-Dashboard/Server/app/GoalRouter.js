let express = require('express');
let goalRouter = express.Router();
const db = require('../../Database/models/index.js'); // new require for db object

goalRouter.get('/', function (req, res) {
    return db.Goal.findAll()
        .then(goalList => res.send(goalList))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.post('/addGoal', function (req, res) {
    let goalInfo = req.body.goalInfo;
    return db.Goal.create(goalInfo)
        .then(data => {
            console.log(data);
            res.status(200);
            res.send({ success: "Goal added" });
        }).catch(err => {
            res.status(400);
            res.send({
                error: "Error with the database",
                detail: err
            });
            console.log(err);
        });
});

// 404 not found
goalRouter.get('*', function (req, res) {
    res.status(404).send('404 not found');
});

module.exports = goalRouter;
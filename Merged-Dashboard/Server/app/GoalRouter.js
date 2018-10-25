let express = require('express');
let goalRouter = express.Router();
const db = require('../../Database/models/index.js'); // new require for db object

const Sequelize = require('sequelize');
const {gt, lte, ne, eq, like, in: opIn} = Sequelize.Op;

goalRouter.get('/all/mrn/:mrn', function (req, res) {
    const mrn = req.params.mrn;
    return db.Goal.findAll({
        where: {
            MRN: mrn,
        }
    })
        .then(goalList =>
            res.send(goalList))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.get('/global/mrn/:mrn', function (req, res) {
    const mrn = req.params.mrn;
    return db.Goal.findAll({
        where: {
            MRN: mrn,
            parent_goal: {
                [eq]: null,
            }
        }
    })
        .then(goalList =>
            res.send(goalList))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.get('/subgoals/goal_id/:id', function (req, res) {
    const id = req.params.id;
    return db.Goal.findAll({
        where: {
            parent_goal: {
                [eq]: id,
            }
        }
    })
        .then(goalList =>
            res.send(goalList))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.get('/rate/mrn/:mrn', function (req, res) {
    const mrn = req.params.mrn;
    return db.sequelize.query(`SELECT MRN, AVG(coalesce(rating, 0)) as rate FROM Goals WHERE MRN = ${mrn} GROUP BY MRN`)
        .then(data =>
            res.send(data[0]))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.get('/mostBehindGoals', function (req, res) {
    const mrn = req.params.mrn;
    return db.sequelize.query(`SELECT MRN, first_name, last_name, AVG(coalesce(rating, 0)) as rate FROM Patients LEFT OUTER JOIN Goals USING(MRN) GROUP BY MRN ORDER BY rate LIMIT 5`)
        .then(data =>
            res.send(data[0]))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.get('/mostBehindGoals2', function (req, res) {
    const mrn = req.params.mrn;
    return db.sequelize.query(`SELECT MRN, first_name, last_name, AVG(coalesce(rating, 0)) as rate FROM Goals LEFT OUTER JOIN Patients USING(MRN) GROUP BY MRN ORDER BY rate`)
        .then(data =>
            res.send(data[0]))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.get('/goalCompletionRate', function (req, res) {
    const mrn = req.params.mrn;
    return db.sequelize.query(`SELECT AVG(coalesce(rating, 0)) as rate FROM Goals`)
        .then(data =>
            res.send(data[0]))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
            return res.send(err);
        });
});

goalRouter.get('/goalCompletionRate2', function (req, res) {
    const mrn = req.params.mrn;
    return db.sequelize.query(`SELECT AVG(coalesce(rating, 0)) as rate FROM Goals GROUP BY MRN`)
        .then(data =>
            res.send(data[0]))
        .catch((err) => {
            console.log('There was an error querying goalList', JSON.stringify(err));
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

goalRouter.post('/update_rating', function (req, res) {
    let goalInfo = req.body.goalInfo;
    return db.Goal.upsert({
        goal_id: goalInfo.goal_id,
        rating: goalInfo.rating,
    })
        .then(data => {
            console.log(data);
            res.status(200);
            res.send({ success: "Rating updated" });
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
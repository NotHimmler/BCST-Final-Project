var express = require('express');
var todoRouter = express.Router();
const db = require('../../Database/models/index.js');
let moment = require('moment');

todoRouter.get("/getTodos/:user_id", (req, res) =>{
    let user_id = req.params['user_id'];
    db.Todos.findAll({where: {user_id: user_id}})
    .then(data => {
        let todos = data.map(item => {
            let itemValues = item.dataValues;
            let dayAgo = moment().subtract(1, 'days').valueOf()
            if (!itemValues.done || (itemValues.date != null && Number(itemValues.date) > dayAgo)) {
                return itemValues;
            }
        })
        res.send({"okay": "Items retrieved", data: todos})
    }).catch(err => {
        console.log(err);
        res.send({"error": "Database error"});
    })
})

todoRouter.post('/addTodo', (req, res) => {
    let body = req.body;
    db.Todos.findOrCreate({where: body})
    .then(data => {
        console.log(data);
        if (data[1]) {
            res.send({okay: "Item added", todo:data[0].dataValues})
        }
    }).catch(err => {
        console.log(err);
        res.send({"error": "Database Error"});
    })
})

module.exports = todoRouter;
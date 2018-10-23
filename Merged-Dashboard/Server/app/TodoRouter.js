var express = require('express');
var todoRouter = express.Router();
const db = require('../../Database/models/index.js');
let moment = require('moment');

todoRouter.get("/getTodos/:user_id", (req, res) =>{
    let user_id = req.params['user_id'];
    db.Todos.findAll({where: {user_id: user_id}})
    .then(data => {
        let todos = data.map(item => {
            let dayAgo = moment().subtract(1, 'days').valueOf()
            if (item.done || Number(item.date) > dayAgo) {
                return item;
            }
        })
        res.send({"okay": "Items retrieved", data: todos})
    }).catch(err => {
        res.send({"error": "Database error"});
    })
})

module.exports = todoRouter;
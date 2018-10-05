var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbHandler = require('./db-handler/db-handler');

app.use(bodyParser.json());
app.use("/css", express.static("css"));
app.use("/img", express.static("img"));
app.use("/data", express.static("data"));
app.use("/vendors", express.static("vendors"));
app.use("/javascript", express.static("javascript"));
app.use("/main.js", express.static("dist/main.js"));
app.use("/login.html", express.static("Client/login.html"));
require('./app/Routes.js')(app);

let port = process.env.PORT || 8080;

app.all('/api/v1/login', function (req, res) {
    let body = req.body;
    let userInfo = body.userInfo;
    if (!dbHandler.ready) {
        res.send({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.loginHandler(userInfo).then((userInfoRes) => {
        res.send(userInfoRes);
    });
});

app.all('/api/v1/register', function (req, res) {
    let body = req.body;
    let userInfo = body.userInfo;
    if (!dbHandler.ready) {
        res.send({
            error: "DB is not ready"
        });
        return;
    }
    dbHandler.registerHandler(userInfo).then((userInfoRes) => {
        res.send(userInfoRes);
    });
});

app.listen(port, function () {
    console.log("Server listening on port " + port);
});
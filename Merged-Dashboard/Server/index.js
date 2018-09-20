var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use("/css", express.static("css"));
app.use("/img", express.static("img"));
app.use("/data", express.static("data"));
app.use("/vendors", express.static("vendors"));
app.use("/javascript", express.static("javascript"));
app.use("/main.js", express.static("dist/main.js"));
require('./app/Routes.js')(app);

let port = process.env.PORT || 8080
app.listen(port, function() {
    console.log("Server listening on port " + port);
})
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use("/css", express.static("Merged-Dashboard/css"));
app.use("/img", express.static("Merged-Dashboard/img"));
app.use("/data", express.static("Merged-Dashboard/data"));
app.use("/vendors", express.static("Merged-Dashboard/vendors"));
app.use("/javascript", express.static("Merged-Dashboard/javascript"));
app.use("/main.js", express.static("Merged-Dashboard/dist/main.js"));
require('./app/Routes.js')(app);

let port = process.env.PORT || 8080
app.listen(port, function() {
    console.log("Server listening on port " + port);
})
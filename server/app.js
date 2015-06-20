var express = require("express");
var config = require("./config");
var rootRoute = require("./routes/root");
var app = express();

// configure app
config(app);

app.use("/", rootRoute);

module.exports = app;

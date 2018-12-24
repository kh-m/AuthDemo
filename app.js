var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');

app.get("/", function( req, res) {
    res.render("HOME");
})

app.get("/secret", function(req, res) {
    res.render("secret")
});

app.listen(8000);

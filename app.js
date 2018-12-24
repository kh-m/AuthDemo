var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

    User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {useNewUrlParser: true});

var app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("HOME");
})

app.get("/secret", function(req, res) {
    res.render("secret")
});

app.listen(8000, function() {
    console.log("Server running.");
});

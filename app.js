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
// tell express to use Passport (2 lines)
app.use(passport.initialize());
app.use(passport.session());
// to use Express Session
app.use(require("express-session")({
    secret: "Shikoba is the best",
    resave: false,
    saveUninitialized: false
}));

// We are not having to define deserializeUser & serializeUser because we are using the
// ones that come with passport-local-mongoose by plugging it into userSchema.plugin() in user.js
// - responsible for reading the session & taking data from it:
passport.deserializeUser(User.deserializeUser());
// - encodes it and puts it back in session
passport.serializeUser(User.serializeUser());



//=====================//
//       ROUTES
//=====================//

// Route: GET/
app.get("/", function(req, res) {
    res.render("HOME");
})

// Route: GET/secret
app.get("/secret", function(req, res) {
    res.render("secret")
});

// AUTH ROUTES

// Route: GET/resgister
app.get("/register", function(req, res) {
    res.render("register");
});

// Route: POST/register
app.post("/register", function(req, res) {
    res.send("REGISTER POST ROUTE");
});

app.listen(8000, function() {
    console.log("Server running.");
});

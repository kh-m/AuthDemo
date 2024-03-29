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
// connects body-parser
app.use(bodyParser.urlencoded({extended: true}));
// to use Express Session
app.use(require("express-session")({
    secret: "Shikoba is the best",
    resave: false,
    saveUninitialized: false
}));
// tell express to use Passport (2 lines)
app.use(passport.initialize());
app.use(passport.session());

// We are not having to define deserializeUser & serializeUser because we are using the
// ones that come with passport-local-mongoose by plugging it into userSchema.plugin() in user.js
// - creates new local strategy using User.authenticate() (coming from user.js -> passportLocalMongoose plugged into userSchema)
passport.use(new localStrategy(User.authenticate()));
// - responsible for reading the session & taking data from it:
passport.deserializeUser(User.deserializeUser());
// - encodes it and puts it back in session
passport.serializeUser(User.serializeUser());


//===============================//
//            ROUTES
//===============================//

// Route: GET:/
app.get("/", function(req, res) {
    res.render("home");
});

// Route: GET:/secret
// middleware isLoggedIn will check if user is logged in
app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret")
});

//----------AUTH ROUTES----------//

// Route: GET:/resgister
app.get("/register", function(req, res) {
    res.render("register");
});

// Route: POST:/register
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            // return is used here to short-circuit and exit in case something is wrong to go back to registration form
            return res.render('register');
        }
            // ^using an 'else' here would not make this work, because return was used
            // it will run serialize method using 'local' strategy (vs. Facebook or Twiiter etc.)
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            });
    });
});

//----------LOGIN ROUTES----------//

// Route: GET:/login
// renders login form
app.get("/login", function(req, res) {
    res.render("login");
});

// Route: POST:/login
// login logic
// middleware used; between the route and the handler (function) at the end 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res) {
});

// ROTE: GET:/logout
app.get("/logout", function(req, res) {
    // Passport will destroy all the user data in the session i.e. logout
    req.logout();
    res.redirect("/");
});

// to be used as middleware for /secret
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        console.log("you may enter");
        return next();
    }
    console.log("didn't work");
    res.redirect("/login");
};

app.listen(8000, function() {
    console.log("Server running.");
});

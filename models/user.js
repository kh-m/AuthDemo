var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
    // to stop "(node:66492) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead":
    mongoose.set('useCreateIndex', true);

var userSchema = new mongoose.Schema({
    uesrname: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

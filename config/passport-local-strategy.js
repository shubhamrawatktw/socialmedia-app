const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");

//  authentication using passport
// usernameField to detect user that which user it is
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      // ye email and password yaha mil jaenge merko jo user sign in me dalega
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log("error in finding user => passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("invalid username password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//  serializing to user to decide which key to kept in cookies
//  this property is used for setting cookies in encrypted form and then send to browser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//  deserializing to user from  key  in cookies
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("error in finding user");
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;

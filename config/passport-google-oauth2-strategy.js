const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/users");


passport.use(
  new googleStrategy(
    {
      clientID:
        "1052372217268-7ac4463cm13v99p2h4ec013htgjli8lu.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    (accessToken,
    refreshToken,
    profile,
    done) => {
      User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
        if (err) {
          console.log("error in google strategy passport", err);
          return;
        }
        console.log(accessToken,refreshToken);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            (err, user) => {
              if (err) {
                console.log(
                  "error in creating user ingoogle strategy passport",
                  err
                );
                return;
              } else {
                return done(null, user);
              }
            }
          );
        }
      });
    })
  );


module.exports = passport;

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//  use for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require('connect-mongo');
const sassMiddleware = require("node-sass-middleware");


app.use(sassMiddleware({
  src:"./assets/scss",
  dest:"./assets/css",
  debug:true,
  outputStyle:"expanded",
  prefix:"/css"
}))
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
// extract styles and scripts from sub pages into layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// use express router
// app.use("/", require("./routes"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");


// mongo store is used to store the session cookie in the db
app.use(session({
    name: "social",
    // change the secret before deployment
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100),
    },
    store:  MongoStore.create({ mongoUrl:"mongodb://localhost/social_development"})
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// if dont work try this
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`error in running in server : ${err}`);
  }
  console.log(`server is running on port : ${port}`);
});

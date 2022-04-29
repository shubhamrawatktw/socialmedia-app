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

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
// extract styles and scripts from sub pages into layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// use express router
app.use("/", require("./routes"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "social",
    // change the secret before deployment
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// if dont work try this
// app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`error in running in server : ${err}`);
  }
  console.log(`server is running on port : ${port}`);
});

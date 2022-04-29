const express = require("express");
const app = express();
const port = 8000;

// use express router
app.use("/", require("./routes"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("assets"));

app.listen(port, (err) => {
  if (err) {
    console.log(`error in running in server : ${err}`);
  }
  console.log(`server is running on port : ${port}`);
});

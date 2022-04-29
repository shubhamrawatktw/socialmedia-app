const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");
// console.log("router loaded");
const signupController = require("../controllers/signup_controller");
const signinController = require("../controllers/signin_controller");



router.get("/", homeController.home);
router.use("/users", require("./users"));
router.get("/signup", signupController.signup);
router.get("/signin", signinController.signin);

module.exports = router;

const User = require("../models/users");
const fs = require("fs")
const path = require("path")

module.exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "profile",
      profile_user: user,
    });
  } catch (err) {
    console.log("error in profile", err);
    return;
  }
};

module.exports.update = async (req, res) => {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
  //     return res.redirect("back");
  //   });
  // } else {
    // req.flash("error","Unauthorised")
  //   return res.status(401).send("Unauthorised");
  // }

  if (req.user.id == req.params.id) {
        try {
           let user = await User.findById(req.params.id)
            User.uploadedAvatar(req,res,function(err) {
              if (err) {
                console.log("****Multer Error",err);
              }
              // console.log(req.file);
              user.name = req.body.name;
              user.email = req.body.email;
              if (req.file) {

               if (user.avatar) {
                 fs.unlinkSync(path.join(__dirname,"..",user.avatar))
               }


                user.avatar = User.avatarPath + "/" + req.file.filename
              }
              user.save()
              return res.redirect("back")
            })

        } catch (error) {
            req.flash("error",error)
            return res.redirect("back")
        }
  }else{
    req.flash("error","Unauthorised")
    return res.status(401).send("Unauthorised");
  }
};

//render sign up page
module.exports.signup = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "social : sign Up",
  });
};

// render sign in page
module.exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "social : sign In",
  });
};

// get the sign up data
module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirmpassword) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user in signing in");
      return;
    }

    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("error in creating user in signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//  sign in and create the session for user
module.exports.createSession = (req, res) => {
  req.flash("success","logged in successfully")
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout();
  req.flash("success","logged out successfully")
  
  return res.redirect("/");
};

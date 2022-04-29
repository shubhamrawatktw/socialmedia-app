module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "profile:shubham",
    user:"shubham"
  });
};

//render sign up page
module.exports.signup = (req,res)=>{
  return res.render("user_sign_up",{
    title:"social : sign Up"
  })
}

// render sign in page
module.exports.signin = (req,res)=>{
  return res.render("user_sign_in",{
    title:"social : sign In"
  })
}

// get the sign up data
module.exports.create = (req,res)=>{

}

//  sign in and create the session for user
module.exports.createSession = (req,res)=>{

}
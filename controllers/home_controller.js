const Post = require("../models/post")

module.exports.home = (req, res) => {
  // console.log(req.body, "body");
// Post.find({},(err,posts)=>{
//   if (err) {
//     console.log("error in finding posts");
//     return
//   }
//   console.log(posts);
//   return res.render("home", {
//     title: "social-app",
//     posts: posts
//   });

// })
// populate the user of each post
Post.find({})
.populate("user")
.populate({
  path:"comments",
  populate:{
    path:"user"
  }
})
.exec((err,posts)=>{
  if (err) {
    console.log("error in finding user/populate");
    return 
  }
  return res.render("home",{
    title:"Fakebook | Home",
    posts:posts
  })
})
}

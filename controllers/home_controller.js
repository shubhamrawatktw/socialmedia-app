const Post = require("../models/post")

module.exports.home = (req, res) => {
  // console.log(req.body, "body");
Post.find({},(err,posts)=>{
  if (err) {
    console.log("error in finding posts");
    return
  }
  console.log(posts);
  return res.render("home", {
    title: "social-app",
    posts: posts
  });

})
};

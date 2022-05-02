const Post = require("../models/post")

module.exports.createPost = (req,res)=>{
    if (req.isAuthenticated()) {
         Post.create(req.body,(err,post)=>{
             if (err) {
                 console.log("error in creating post");
                 return 
             }
             console.log(post);
            })      
            return res.redirect("back")
    }
    return res.redirect("/users/sign-in")
}
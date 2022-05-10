const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer")

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      let newc = await comment.populate("user" , "name email")
      // console.log(newc);
    
      req.flash("success","Comment published!")

      post.comments.push(comment);
      post.save();
   
  
      commentsMailer.newComment(newc)
      return res.redirect("/");
    }
  } catch (error) {
    req.flash("error",error)
  }
};

module.exports.destroy = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
          let postId = comment.post;
          comment.remove();
          req.flash("success","Comment deleted")
          let post = await Post.findByIdAndUpdate(postId, {
            $pull: { comments: req.params.id },
          });
          return res.redirect("back");
        } else {
          return res.redirect("back");
        }
        
    } catch (error) {
        console.log("error in destroying comment", error);
    }
};

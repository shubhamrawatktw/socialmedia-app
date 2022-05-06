const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  // console.log(req.body,req.xhr);
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

if (req.xhr) {
  return res.status(200).json({
    data:{
      post : post
    },
    message:" Post created!"
  })
}

    req.flash("success","Post published!")
    return res.redirect("back");
  } catch (error) {
   req.flash("error",error)
   return res.redirect("back");
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:"Post deleted successfully"
        })
      }

      req.flash("success","Post deleted!")
      return res.redirect("back");
    } else {
      req.flash("error","you cannot delete this post!")
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error",error)
    return;
  }
 
};

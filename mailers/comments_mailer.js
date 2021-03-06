const nodemailer = require("../config/nodemailer")

module.exports.newComment = (comment)=>{
// console.log("inside new comment mailer",comment);
let htmlString = nodemailer.renderTemplate({comment:comment},"/comments/new_comments.ejs")

nodemailer.transporter.sendMail({
    from: "shubhamrawatktw@gmail.com", 
    to: comment.user.email, 
    subject: "New Comment Published",
    html: htmlString,
    
},(err,info)=>{
    if (err) {
        console.log("error in sending mail",err);
        return
    }
    console.log("msg sent",info);
    return
})
}
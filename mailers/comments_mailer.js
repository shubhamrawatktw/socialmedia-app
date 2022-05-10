const nodemailer = require("../config/nodemailer")

module.exports.newComment = (comment)=>{
console.log("inside new comment mailer",comment);

nodemailer.transporter.sendMail({
    from: "shubhamrawatktw@gmail.com", 
    to: comment.user.email, 
    subject: "New Comment Published",
    html: "<h1>yup, your comment is published ! </h1>",
    
},(err,info)=>{
    if (err) {
        console.log("error in sending mail",err);
        return
    }
    console.log("msg sent",info);
    return
})
}
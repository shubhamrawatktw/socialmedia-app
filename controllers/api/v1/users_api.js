const User = require("../../../models/users")
const jwt = require("jsonwebtoken")


module.exports.createSession = async (req, res) => {
 try {
     let user = await User.findOne({email:req.body.email})

     if (!user || user.password != req.body.password) {
         return res.json(422,{
             message:"Invalid Username/Password"
         })
     }

     return res.json(200,{
         message:"successful , here is your token keep it safe",
         data:{
             token:jwt.sign(user.toJSON(),"codeial",{expiresIn:100000})
         }
     })
     
 } catch (error) {
    return res.json(500,{
        message:"internal server error"
    })
 }

  };
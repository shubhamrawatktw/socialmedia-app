module.exports.home = (req, res) => {
  return res.end("<h1>express is up and ready to return </h1>");
};


module.exports.profile = (req,res)=>{
  return res.end("this is my profile")
}
module.exports.about = (req,res)=>{
  return res.end("this is my about page")
}
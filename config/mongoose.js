const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/social_development");

const db = mongoose.connection

db.on("error",console.error.bind(console,"error connecting to mongodb"))

db.once("open",()=>{
    console.log("connected to database");
})

module.exports =db;
const env = require('dotenv');
const path = require("path")
env.config({path: path.join(__dirname + "/../.env")});

const mdb_username = process.env.MONGODB_USERNAME;
const mdb_password = process.env.MONGODB_PASSWORD;
const dbName = "QuotesX"
const mongoose = require("mongoose");
// cloud config:
const URL = `mongodb+srv://${mdb_username}:${mdb_password}@mycluster0.uegoztc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// OR USE LOCAL
// const URL = "mongodb://localhost:27017/<database>";
mongoose.connect(URL).then(()=>console.log("connected to db"),()=>console.log("Err connecting to db"))

const userschema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    quotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quote"
    }]
})

module.exports = mongoose.model("user",userschema);
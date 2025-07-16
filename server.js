const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const user_model = require("./models/user.model");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
    init();
}).catch(err=>console.log(err)
)
async function init(){
    try{
        const user = await user_model.findOne({userId:"admin"});
        if(user){
            console.log("Admin already exists");
            return
        }

    }catch(err){
        console.log("Error while reading the data",err)
    }
    try{
        const admin = await   user_model.create({
            name:"kiran",
            userId:"admin",
            email:"kiran@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("developer",8)

        })
        console.log("Admin created ",admin);
        

    }catch(err){
        console.log("Error while create admin",err);
    }
}


app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

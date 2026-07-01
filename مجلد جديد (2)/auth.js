// ====================================
// Zyron Authentication
// ====================================

const express = require("express");

const router = express.Router();

const db = require("./database");

// ====================================
// Register
// ====================================

router.post("/signup",(req,res)=>{

const {

fullname,

username,

email,

password

}=req.body;

// التحقق من الحقول

if(

!fullname ||

!username ||

!email ||

!password

){

return res.status(400).json({

status:false,

message:"Missing Fields"

});

}

// التحقق من وجود المستخدم

const exists=

db.findUser(username);

if(exists){

return res.status(409).json({

status:false,

message:"Username Already Exists"

});

}

// إنشاء المستخدم

const user={

id:Date.now(),

fullname,

username,

email,

password,

followers:0,

following:0,

posts:0,

verified:false,

createdAt:new Date()

};

db.addUser(user);

res.status(201).json({

status:true,

message:"Account Created",

user:user

});

});

// ====================================
// Login
// ====================================

router.post("/login",(req,res)=>{

const {

username,

password

}=req.body;

const user=

db.findUser(username);

if(!user){

return res.status(404).json({

status:false,

message:"User Not Found"

});

}

if(user.password!==password){

return res.status(401).json({

status:false,

message:"Wrong Password"

});

}

res.json({

status:true,

message:"Login Success",

user:user

});

});

// ====================================
// Logout
// ====================================

router.post("/logout",(req,res)=>{

res.json({

status:true,

message:"Logout Success"

});

});

// ====================================
// Current User
// ====================================

router.get("/me",(req,res)=>{

res.json({

status:true,

message:"Current User",

user:null

});

});

// ====================================
// Export
// ====================================

module.exports=router;
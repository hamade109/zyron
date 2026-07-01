// ====================================
// Zyron Users
// ====================================

const express = require("express");

const router = express.Router();

const db = require("./database");

// ====================================
// جميع المستخدمين
// ====================================

router.get("/",(req,res)=>{

res.json({

status:true,

users:db.getUsers()

});

});

// ====================================
// مستخدم واحد
// ====================================

router.get("/:username",(req,res)=>{

const username=req.params.username;

const user=db.findUser(username);

if(!user){

return res.status(404).json({

status:false,

message:"User Not Found"

});

}

res.json({

status:true,

user:user

});

});

// ====================================
// تحديث الملف الشخصي
// ====================================

router.put("/:username",(req,res)=>{

const username=req.params.username;

const user=db.findUser(username);

if(!user){

return res.status(404).json({

status:false,

message:"User Not Found"

});

}

const{

fullname,

bio,

avatar

}=req.body;

if(fullname!==undefined){

user.fullname=fullname;

}

if(bio!==undefined){

user.bio=bio;

}

if(avatar!==undefined){

user.avatar=avatar;

}

res.json({

status:true,

message:"Profile Updated",

user:user

});

});

// ====================================
// حذف المستخدم
// ====================================

router.delete("/:username",(req,res)=>{

const username=req.params.username;

const index=db.users.findIndex(

user=>user.username===username

);

if(index===-1){

return res.status(404).json({

status:false,

message:"User Not Found"

});

}

db.users.splice(index,1);

res.json({

status:true,

message:"User Deleted"

});

});

// ====================================
// متابعة مستخدم
// ====================================

router.post("/:username/follow",(req,res)=>{

const username=req.params.username;

const user=db.findUser(username);

if(!user){

return res.status(404).json({

status:false,

message:"User Not Found"

});

}

user.followers=(user.followers||0)+1;

res.json({

status:true,

message:"Followed",

followers:user.followers

});

});

// ====================================
// إلغاء المتابعة
// ====================================

router.post("/:username/unfollow",(req,res)=>{

const username=req.params.username;

const user=db.findUser(username);

if(!user){

return res.status(404).json({

status:false,

message:"User Not Found"

});

}

if((user.followers||0)>0){

user.followers--;

}

res.json({

status:true,

message:"Unfollowed",

followers:user.followers

});

});

// ====================================
// البحث عن المستخدمين
// ====================================

router.get("/search/:text",(req,res)=>{

const text=req.params.text.toLowerCase();

const result=db.getUsers().filter(user=>{

return(

user.username.toLowerCase().includes(text)||

user.fullname.toLowerCase().includes(text)

);

});

res.json({

status:true,

count:result.length,

users:result

});

});

// ====================================
// Export
// ====================================

module.exports=router;
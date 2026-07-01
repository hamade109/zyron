// ====================================
// Zyron Posts
// ====================================

const express = require("express");

const router = express.Router();

const db = require("./database");

// ====================================
// جميع المنشورات
// ====================================

router.get("/", (req, res) => {

res.json({

status: true,

posts: db.getPosts()

});

});

// ====================================
// إنشاء منشور
// ====================================

router.post("/", (req, res) => {

const {

username,

text,

image,

video

} = req.body;

const post = {

id: Date.now(),

username: username,

text: text,

image: image || null,

video: video || null,

likes: 0,

comments: [],

shares: 0,

createdAt: new Date()

};

db.addPost(post);

res.status(201).json({

status: true,

message: "Post Created",

post: post

});

});

// ====================================
// منشور واحد
// ====================================

router.get("/:id", (req, res) => {

const id = Number(req.params.id);

const post = db.getPosts().find(

item => item.id === id

);

if(!post){

return res.status(404).json({

status:false,

message:"Post Not Found"

});

}

res.json({

status:true,

post:post

});

});

// ====================================
// تعديل منشور
// ====================================

router.put("/:id",(req,res)=>{

const id=Number(req.params.id);

const post=db.getPosts().find(

item=>item.id===id

);

if(!post){

return res.status(404).json({

status:false,

message:"Post Not Found"

});

}

post.text=req.body.text || post.text;

res.json({

status:true,

message:"Post Updated",

post:post

});

});

// ====================================
// حذف منشور
// ====================================

router.delete("/:id",(req,res)=>{

const id=Number(req.params.id);

db.deletePost(id);

res.json({

status:true,

message:"Post Deleted"

});

});

// ====================================
// إعجاب
// ====================================

router.post("/:id/like",(req,res)=>{

const id=Number(req.params.id);

const post=db.getPosts().find(

item=>item.id===id

);

if(!post){

return res.status(404).json({

status:false,

message:"Post Not Found"

});

}

post.likes++;

res.json({

status:true,

likes:post.likes

});

});

// ====================================
// تعليق
// ====================================

router.post("/:id/comment",(req,res)=>{

const id=Number(req.params.id);

const post=db.getPosts().find(

item=>item.id===id

);

if(!post){

return res.status(404).json({

status:false,

message:"Post Not Found"

});

}

post.comments.push({

id:Date.now(),

username:req.body.username,

text:req.body.text,

createdAt:new Date()

});

res.json({

status:true,

comments:post.comments

});

});

// ====================================
// مشاركة
// ====================================

router.post("/:id/share",(req,res)=>{

const id=Number(req.params.id);

const post=db.getPosts().find(

item=>item.id===id

);

if(!post){

return res.status(404).json({

status:false,

message:"Post Not Found"

});

}

post.shares++;

res.json({

status:true,

shares:post.shares

});

});

// ====================================
// Export
// ====================================

module.exports = router;
// ====================================
// Zyron Messages API
// ====================================

const express = require("express");

const router = express.Router();

const db = require("./database");

// ====================================
// جميع الرسائل
// ====================================

router.get("/", (req, res) => {

res.json({

status: true,

messages: db.getMessages()

});

});

// ====================================
// إرسال رسالة
// ====================================

router.post("/", (req, res) => {

const {

sender,

receiver,

text

} = req.body;

if(!sender || !receiver || !text){

return res.status(400).json({

status:false,

message:"Missing Fields"

});

}

const message = {

id: Date.now(),

sender: sender,

receiver: receiver,

text: text,

read: false,

createdAt: new Date()

};

db.addMessage(message);

res.status(201).json({

status:true,

message:"Message Sent",

data:message

});

});

// ====================================
// رسائل مستخدم
// ====================================

router.get("/:username",(req,res)=>{

const username=req.params.username;

const messages=

db.getMessages().filter(msg=>{

return(

msg.sender===username ||

msg.receiver===username

);

});

res.json({

status:true,

count:messages.length,

messages:messages

});

});

// ====================================
// تعليم الرسالة كمقروءة
// ====================================

router.put("/:id/read",(req,res)=>{

const id=Number(req.params.id);

const message=

db.getMessages().find(

msg=>msg.id===id

);

if(!message){

return res.status(404).json({

status:false,

message:"Message Not Found"

});

}

message.read=true;

res.json({

status:true,

message:"Message Marked As Read",

data:message

});

});

// ====================================
// حذف رسالة
// ====================================

router.delete("/:id",(req,res)=>{

const id=Number(req.params.id);

const index=

db.messages.findIndex(

msg=>msg.id===id

);

if(index===-1){

return res.status(404).json({

status:false,

message:"Message Not Found"

});

}

db.messages.splice(index,1);

res.json({

status:true,

message:"Message Deleted"

});

});

// ====================================
// حذف جميع رسائل مستخدم
// ====================================

router.delete("/user/:username",(req,res)=>{

const username=req.params.username;

db.messages=

db.messages.filter(msg=>{

return(

msg.sender!==username &&

msg.receiver!==username

);

});

res.json({

status:true,

message:"User Messages Deleted"

});

});

// ====================================
// Export
// ====================================

module.exports = router;
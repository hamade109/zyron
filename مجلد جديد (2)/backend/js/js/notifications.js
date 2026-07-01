// ====================================
// Zyron Notifications API
// ====================================

const express = require("express");

const router = express.Router();

const db = require("./database");

// ====================================
// جميع الإشعارات
// ====================================

router.get("/", (req, res) => {

res.json({

status: true,

notifications: db.getNotifications()

});

});

// ====================================
// إشعارات مستخدم
// ====================================

router.get("/:username", (req, res) => {

const username = req.params.username;

const notifications =

db.getNotifications().filter(notification => {

return notification.username === username;

});

res.json({

status: true,

count: notifications.length,

notifications: notifications

});

});

// ====================================
// إنشاء إشعار
// ====================================

router.post("/", (req, res) => {

const {

username,

title,

message,

type

} = req.body;

if(!username || !title || !message){

return res.status(400).json({

status:false,

message:"Missing Fields"

});

}

const notification = {

id: Date.now(),

username: username,

title: title,

message: message,

type: type || "general",

read: false,

createdAt: new Date()

};

db.addNotification(notification);

res.status(201).json({

status:true,

message:"Notification Created",

notification:notification

});

});

// ====================================
// تعليم إشعار كمقروء
// ====================================

router.put("/:id/read",(req,res)=>{

const id=Number(req.params.id);

const notification=

db.getNotifications().find(

item=>item.id===id

);

if(!notification){

return res.status(404).json({

status:false,

message:"Notification Not Found"

});

}

notification.read=true;

res.json({

status:true,

message:"Notification Updated",

notification:notification

});

});

// ====================================
// حذف إشعار
// ====================================

router.delete("/:id",(req,res)=>{

const id=Number(req.params.id);

const index=

db.notifications.findIndex(

item=>item.id===id

);

if(index===-1){

return res.status(404).json({

status:false,

message:"Notification Not Found"

});

}

db.notifications.splice(index,1);

res.json({

status:true,

message:"Notification Deleted"

});

});

// ====================================
// حذف جميع إشعارات مستخدم
// ====================================

router.delete("/user/:username",(req,res)=>{

const username=req.params.username;

db.notifications=

db.notifications.filter(item=>{

return item.username!==username;

});

res.json({

status:true,

message:"All Notifications Deleted"

});

});

// ====================================
// Export
// ====================================

module.exports = router;
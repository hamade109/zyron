// ===================================
// Zyron Server
// ===================================

const express = require("express");

const path = require("path");

const app = express();

const PORT = 3000;

// ================================
// Middleware
// ================================

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"../")));

// ================================
// الصفحة الرئيسية
// ================================

app.get("/",(req,res)=>{

res.sendFile(path.join(__dirname,"../home.html"));

});

// ================================
// تسجيل الدخول
// ================================

app.get("/login",(req,res)=>{

res.sendFile(path.join(__dirname,"../login.html"));

});

// ================================
// إنشاء حساب
// ================================

app.get("/signup",(req,res)=>{

res.sendFile(path.join(__dirname,"../signup.html"));

});

// ================================
// الملف الشخصي
// ================================

app.get("/profile",(req,res)=>{

res.sendFile(path.join(__dirname,"../profile.html"));

});

// ================================
// الرسائل
// ================================

app.get("/messages",(req,res)=>{

res.sendFile(path.join(__dirname,"../messages.html"));

});

// ================================
// الإشعارات
// ================================

app.get("/notifications",(req,res)=>{

res.sendFile(path.join(__dirname,"../notifications.html"));

});

// ================================
// الاستكشاف
// ================================

app.get("/explore",(req,res)=>{

res.sendFile(path.join(__dirname,"../explore.html"));

});

// ================================
// الإعدادات
// ================================

app.get("/settings",(req,res)=>{

res.sendFile(path.join(__dirname,"../settings.html"));

});

// ================================
// تشغيل الخادم
// ================================

app.listen(PORT,()=>{

console.log("=================================");

console.log("Zyron Server Started");

console.log("http://localhost:"+PORT);

console.log("=================================");

});
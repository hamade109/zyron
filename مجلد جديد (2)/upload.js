// ====================================
// Zyron Upload API
// ====================================

const express = require("express");

const router = express.Router();

const path = require("path");

const fs = require("fs");

// ====================================
// رفع ملف (صورة أو فيديو)
// ====================================

router.post("/", (req, res) => {

res.json({

status: true,

message: "Upload endpoint ready (needs multer setup)"

});

});

// ====================================
// رفع صورة بتمثيل بسيط (بدون multer)
// ====================================

router.post("/image", (req, res) => {

const { imageName } = req.body;

if (!imageName) {

return res.status(400).json({

status: false,

message: "No image provided"

});

}

const fakePath = `/uploads/images/${imageName}`;

res.json({

status: true,

message: "Image uploaded",

path: fakePath

});

});

// ====================================
// رفع فيديو (تمثيل فقط)
// ====================================

router.post("/video", (req, res) => {

const { videoName } = req.body;

if (!videoName) {

return res.status(400).json({

status: false,

message: "No video provided"

});

}

const fakePath = `/uploads/videos/${videoName}`;

res.json({

status: true,

message: "Video uploaded",

path: fakePath

});

});

// ====================================
// Export
// ====================================

module.exports = router;
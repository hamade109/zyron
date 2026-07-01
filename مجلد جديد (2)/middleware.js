// ====================================
// Zyron Middleware
// ====================================

// ====================================
// تسجيل الطلبات (Logger)
// ====================================

function logger(req, res, next) {

console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

next();

}

// ====================================
// حماية بسيطة (Auth Check)
// ====================================

function auth(req, res, next) {

const token = req.headers["authorization"];

if (!token) {

return res.status(401).json({

status: false,

message: "No Token Provided"

});

}

// تمثيل بسيط للتحقق

if (token !== "Zyron-Secret-Token") {

return res.status(403).json({

status: false,

message: "Invalid Token"

});

}

next();

}

// ====================================
// منع الطلبات الفارغة
// ====================================

function validateBody(req, res, next) {

if (!req.body || Object.keys(req.body).length === 0) {

return res.status(400).json({

status: false,

message: "Empty Body"

});

}

next();

}

// ====================================
// Export
// ====================================

module.exports = {

logger,

auth,

validateBody

};
// ====================================
// Zyron Main Server Entry
// ====================================

const express = require("express");

const app = express();

const PORT = 3000;

// ================================
// Middleware
// ================================

const { logger, auth } = require("./middleware");

app.use(express.json());

app.use(logger);

// ================================
// Routes
// ================================

const authRoutes = require("./auth");

const userRoutes = require("./users");

const postRoutes = require("./posts");

const messageRoutes = require("./messages");

const notificationRoutes = require("./notifications");

const routes = require("./routes");

// ================================
// استخدام الروتات
// ================================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api", routes);

// ================================
// تشغيل السيرفر
// ================================

app.listen(PORT, () => {

console.log("=================================");

console.log("🚀 Zyron Server Running");

console.log("http://localhost:" + PORT);

console.log("=================================");

});
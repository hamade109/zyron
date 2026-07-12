// ==============================
// Zyron - Global JavaScript
// ==============================

// قراءة المستخدم الحالي
function getCurrentUser() {
    const user = localStorage.getItem("zyron_current_user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        return null;
    }
}


// التحقق من تسجيل الدخول
function isLoggedIn() {
    return localStorage.getItem("zyron_logged_in") === "true";
}


// حماية الصفحات التي تحتاج تسجيل دخول
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}


// تسجيل الخروج
function logout() {
    localStorage.removeItem("zyron_logged_in");
    localStorage.removeItem("zyron_current_user");

    window.location.href = "login.html";
}


// تشغيل زر تسجيل الخروج إن وجد
document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            logout();
        });
    }

});
// ==============================
// Zyron - إنشاء إشعار جديد
// ==============================

function createNotification(
    userId,
    type,
    text,
    link = ""
) {

    // لا ننشئ إشعارًا بدون مستخدم
    if (!userId) {
        return;
    }

    const notifications =
        JSON.parse(
            localStorage.getItem("zyron_notifications")
        ) || [];


    const newNotification = {

        id:
            Date.now() +
            Math.floor(Math.random() * 1000),

        userId:
            userId,

        type:
            type,

        text:
            text,

        link:
            link,

        read:
            false,

        createdAt:
            new Date().toISOString()

    };


    notifications.push(
        newNotification
    );


    localStorage.setItem(
        "zyron_notifications",
        JSON.stringify(notifications)
    );

}
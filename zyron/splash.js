// ==============================
// Zyron - Splash JavaScript
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    setTimeout(function () {

        // إذا كان المستخدم مسجل الدخول
        if (localStorage.getItem("zyron_logged_in") === "true") {
            window.location.href = "home.html";
        } else {
            window.location.href = "index.html";
        }

    }, 3000);

});
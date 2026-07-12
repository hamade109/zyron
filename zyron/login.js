// ==============================
// Zyron - Login JavaScript
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("password")
            .value;

        if (!email || !password) {
            alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
            return;
        }

        const users = JSON.parse(
            localStorage.getItem("zyron_users")
        ) || [];

        const user = users.find(function (savedUser) {
            return (
                savedUser.email === email &&
                savedUser.password === password
            );
        });

        if (!user) {
            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
            return;
        }

        // حفظ حالة تسجيل الدخول
        localStorage.setItem("zyron_logged_in", "true");

        // حفظ المستخدم الحالي
        localStorage.setItem(
            "zyron_current_user",
            JSON.stringify(user)
        );

        // الانتقال إلى الصفحة الرئيسية
        window.location.href = "home.html";

    });

});
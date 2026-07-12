// ==============================
// Zyron - Signup JavaScript
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    const signupForm =
        document.getElementById("signupForm");

    if (!signupForm) {
        return;
    }


    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ==============================
            // جلب البيانات
            // ==============================

            const name =
                document.getElementById("name")
                    .value.trim();

            let username =
                document.getElementById("username")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim()
                    .toLowerCase();

            const password =
                document.getElementById("password")
                    .value;

            const birth =
                document.getElementById("birth")
                    .value;


            // إزالة @ من اسم المستخدم
            username =
                username.replace(/^@+/, "");


            // ==============================
            // التحقق من الحقول
            // ==============================

            if (
                !name ||
                !username ||
                !email ||
                !password ||
                !birth
            ) {

                alert(
                    "يرجى تعبئة جميع الحقول"
                );

                return;

            }


            // ==============================
            // جلب المستخدمين
            // ==============================

            let users =
                JSON.parse(
                    localStorage.getItem(
                        "zyron_users"
                    )
                ) || [];


            // ==============================
            // التحقق من البريد
            // ==============================

            const emailExists =
                users.some(function (user) {

                    return (
                        user.email &&
                        user.email.toLowerCase() ===
                        email
                    );

                });


            if (emailExists) {

                alert(
                    "البريد الإلكتروني مستخدم بالفعل"
                );

                return;

            }


            // ==============================
            // التحقق من اسم المستخدم
            // ==============================

            const usernameExists =
                users.some(function (user) {

                    return (
                        user.username &&
                        user.username.toLowerCase() ===
                        username.toLowerCase()
                    );

                });


            if (usernameExists) {

                alert(
                    "اسم المستخدم مستخدم بالفعل"
                );

                return;

            }


            // ==============================
            // إنشاء معرف المستخدم
            // ==============================

            let userId;

            if (
                window.crypto &&
                typeof window.crypto.randomUUID ===
                    "function"
            ) {

                userId =
                    crypto.randomUUID();

            } else {

                userId =
                    Date.now().toString() +
                    "-" +
                    Math.random()
                        .toString(36)
                        .substring(2, 10);

            }


            // ==============================
            // إنشاء المستخدم
            // ==============================

            const newUser = {

                id:
                    userId,

                name:
                    name,

                username:
                    username,

                email:
                    email,

                password:
                    password,

                birth:
                    birth,

                bio:
                    "مرحباً، هذا حسابي في منصة Zyron.",

                profileImage:
                    "",

                // المستخدمون الذين يتابعونه
               followers: [],

                // المستخدمون الذين يتابعهم
                following: [],


                posts:
                    [],

                createdAt:
                    new Date().toISOString()

            };


            // ==============================
            // حفظ المستخدم
            // ==============================

            users.push(
                newUser
            );


            localStorage.setItem(
                "zyron_users",
                JSON.stringify(users)
            );


            alert(
                "تم إنشاء الحساب بنجاح"
            );


            window.location.href =
                "login.html";

        }
    );

});
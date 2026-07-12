// ==============================
// Zyron - Settings JavaScript
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    // حماية الصفحة
    requireLogin();


    const currentUser = getCurrentUser();


    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }


    const settingName =
        document.getElementById("settingName");


    const settingBio =
        document.getElementById("settingBio");


    const saveProfileBtn =
        document.getElementById("saveProfileBtn");


    const darkMode =
        document.getElementById("darkMode");


    const privateAccount =
        document.getElementById("privateAccount");


    const deleteAccountBtn =
        document.getElementById("deleteAccountBtn");



    // ==============================
    // عرض بيانات المستخدم
    // ==============================

    settingName.value =
        currentUser.name || "";


    settingBio.value =
        currentUser.bio || "";


    privateAccount.checked =
        currentUser.privateAccount || false;



    // ==============================
    // حفظ التعديلات
    // ==============================

    saveProfileBtn.addEventListener("click", function () {


        currentUser.name =
            settingName.value.trim();


        currentUser.bio =
            settingBio.value.trim();


        currentUser.privateAccount =
            privateAccount.checked;



        // تحديث المستخدم الحالي

        localStorage.setItem(
            "zyron_current_user",
            JSON.stringify(currentUser)
        );



        // تحديث قائمة المستخدمين

        let users =
            JSON.parse(
                localStorage.getItem("zyron_users")
            ) || [];


        const index =
            users.findIndex(function (user) {

                return user.id === currentUser.id;

            });



        if (index !== -1) {

            users[index] = currentUser;

            localStorage.setItem(
                "zyron_users",
                JSON.stringify(users)
            );

        }


        alert("تم حفظ التغييرات بنجاح");


    });



    // ==============================
    // الوضع الداكن
    // ==============================

    darkMode.addEventListener("change", function () {


        if (darkMode.checked) {

            document.body.classList.add("dark-mode");

            localStorage.setItem(
                "zyron_dark_mode",
                "true"
            );


        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem(
                "zyron_dark_mode",
                "false"
            );

        }


    });



    // تشغيل الوضع المحفوظ

    if (
        localStorage.getItem("zyron_dark_mode") === "true"
    ) {

        darkMode.checked = true;

        document.body.classList.add("dark-mode");

    }



    // ==============================
    // حذف الحساب
    // ==============================

    deleteAccountBtn.addEventListener("click", function () {


        const confirmDelete =
            confirm(
                "هل أنت متأكد من حذف الحساب؟"
            );


        if (!confirmDelete) {
            return;
        }



        let users =
            JSON.parse(
                localStorage.getItem("zyron_users")
            ) || [];



        users =
            users.filter(function (user) {

                return user.id !== currentUser.id;

            });



        localStorage.setItem(
            "zyron_users",
            JSON.stringify(users)
        );


        localStorage.removeItem(
            "zyron_current_user"
        );


        localStorage.removeItem(
            "zyron_logged_in"
        );


        alert("تم حذف الحساب");


        window.location.href =
            "signup.html";


    });


});
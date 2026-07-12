// ==============================
// Zyron - Profile JavaScript
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // حماية الصفحة
    // ==============================

    requireLogin();

    let currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }


    // ==============================
    // عناصر الصفحة
    // ==============================

    const profileName =
        document.getElementById("profileName");

    const profileUsername =
        document.getElementById("profileUsername");

    const profileBio =
        document.getElementById("profileBio");

    const profileImage =
        document.getElementById("profileImage");

    const postsCount =
        document.getElementById("postsCount");

    const followersCount =
        document.getElementById("followersCount");

    const followingCount =
        document.getElementById("followingCount");

    const profilePosts =
        document.getElementById("profilePosts");

    const editProfileBtn =
        document.getElementById("editProfileBtn");


    // ==============================
    // عرض معلومات المستخدم
    // ==============================

    profileName.textContent =
        currentUser.name || "مستخدم Zyron";

    profileUsername.textContent =
        "@" + (currentUser.username || "user");

    profileBio.textContent =
        currentUser.bio ||
        "مرحباً، هذا حسابي في منصة Zyron.";

    if (currentUser.profileImage) {
        profileImage.src =
            currentUser.profileImage;
    }


    // ==============================
    // جلب جميع المنشورات
    // ==============================

    let allPosts =
        JSON.parse(
            localStorage.getItem("zyron_posts")
        ) || [];


    // ==============================
    // جلب منشورات المستخدم
    // ==============================

    let userPosts =
        allPosts.filter(function (post) {

            return String(post.userId) ===
                String(currentUser.id);

        });


    // ==============================
    // ترتيب الأحدث أولاً
    // ==============================

    userPosts.sort(function (a, b) {

        return new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0);

    });

// ==============================
// دعم نظام المتابعة الجديد
// ==============================

if (!Array.isArray(currentUser.followers)) {
    currentUser.followers = [];
}

if (!Array.isArray(currentUser.following)) {
    currentUser.following = [];
}


// ==============================
// عرض الإحصائيات
// ==============================

function updateStatistics() {

    postsCount.textContent =
        userPosts.length;

    followersCount.textContent =
        currentUser.followers.length;

    followingCount.textContent =
        currentUser.following.length;

}

updateStatistics();

    // ==============================
    // عرض المنشورات
    // ==============================

    function displayUserPosts() {

        profilePosts.innerHTML = "";


        if (userPosts.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.textContent =
                "لا توجد منشورات حالياً.";

            profilePosts.appendChild(
                emptyMessage
            );

            return;

        }


        userPosts.forEach(function (post) {

            // ==============================
            // بطاقة المنشور
            // ==============================

            const article =
                document.createElement("article");

            article.className =
                "profile-post";


            // ==============================
            // نص المنشور
            // ==============================

            if (post.text) {

                const text =
                    document.createElement("p");

                text.textContent =
                    post.text;

                article.appendChild(
                    text
                );

            }


            // ==============================
            // صورة المنشور
            // ==============================

            if (
                post.media &&
                post.mediaType === "image"
            ) {

                const image =
                    document.createElement("img");

                image.src =
                    post.media;

                image.alt =
                    "صورة المنشور";

                image.className =
                    "post-media";

                article.appendChild(
                    image
                );

            }


            // ==============================
            // فيديو المنشور
            // ==============================

            if (
                post.media &&
                post.mediaType === "video"
            ) {

                const video =
                    document.createElement("video");

                video.src =
                    post.media;

                video.controls =
                    true;

                video.className =
                    "post-media";

                article.appendChild(
                    video
                );

            }


            // ==============================
            // معلومات المنشور
            // ==============================

            const postInfo =
                document.createElement("div");

            postInfo.className =
                "profile-post-info";


            // تاريخ المنشور
            if (post.createdAt) {

                const date =
                    document.createElement("small");

                date.textContent =
                    new Date(
                        post.createdAt
                    ).toLocaleString(
                        "ar-SA"
                    );

                postInfo.appendChild(
                    date
                );

            }


            // عدد الإعجابات
            const likesCount =
                document.createElement("span");

            likesCount.textContent =
                " ❤️ " +
                (
                    Array.isArray(post.likedBy)
                        ? post.likedBy.length
                        : post.likes || 0
                );


            // عدد التعليقات
            const commentsCount =
                document.createElement("span");

            commentsCount.textContent =
                " 💬 " +
                (
                    Array.isArray(post.comments)
                        ? post.comments.length
                        : 0
                );


            postInfo.appendChild(
                likesCount
            );

            postInfo.appendChild(
                commentsCount
            );

            article.appendChild(
                postInfo
            );


            // ==============================
            // أزرار المنشور
            // ==============================

            const actions =
                document.createElement("div");

            actions.className =
                "profile-post-actions";


            // ==============================
            // فتح المنشور
            // ==============================

            const openPostButton =
                document.createElement("a");

            openPostButton.href =
                "home.html?post=" +
                encodeURIComponent(post.id);

            openPostButton.textContent =
                "عرض المنشور";

            openPostButton.className =
                "open-post-btn";


            // ==============================
            // حذف المنشور
            // ==============================

            const deleteButton =
                document.createElement("button");

            deleteButton.type =
                "button";

            deleteButton.textContent =
                "حذف المنشور";

            deleteButton.className =
                "delete-post-btn";


            deleteButton.addEventListener(
                "click",
                function () {

                    const confirmDelete =
                        confirm(
                            "هل تريد حذف هذا المنشور؟"
                        );


                    if (!confirmDelete) {
                        return;
                    }


                    // حذف المنشور من جميع المنشورات
                    allPosts =
                        allPosts.filter(
                            function (savedPost) {

                                return String(savedPost.id) !==
                                    String(post.id);

                            }
                        );


                    // حفظ المنشورات
                    localStorage.setItem(
                        "zyron_posts",
                        JSON.stringify(allPosts)
                    );


                    // تحديث قائمة منشورات المستخدم
                    userPosts =
                        allPosts.filter(
                            function (savedPost) {

                                return String(savedPost.userId) ===
                                    String(currentUser.id);

                            }
                        );


                    // تحديث العرض
                    updateStatistics();

                    displayUserPosts();

                }
            );


            // ==============================
            // إضافة الأزرار
            // ==============================

            actions.appendChild(
                openPostButton
            );

            actions.appendChild(
                deleteButton
            );

            article.appendChild(
                actions
            );


            // ==============================
            // إضافة المنشور للصفحة
            // ==============================

            profilePosts.appendChild(
                article
            );

        });

    }


    displayUserPosts();


    // ==============================
    // تعديل الملف الشخصي
    // ==============================

    editProfileBtn.addEventListener(
        "click",
        function () {

            const newName =
                prompt(
                    "أدخل الاسم الجديد:",
                    currentUser.name || ""
                );


            if (newName === null) {
                return;
            }


            const newBio =
                prompt(
                    "اكتب نبذة عنك:",
                    currentUser.bio || ""
                );


            if (newBio === null) {
                return;
            }


            currentUser.name =
                newName.trim() ||
                currentUser.name;


            currentUser.bio =
                newBio.trim();


            // ==============================
            // تحديث الاسم في المنشورات
            // ==============================

            allPosts.forEach(function (post) {

                if (
                    String(post.userId) ===
                    String(currentUser.id)
                ) {

                    post.name =
                        currentUser.name;

                }

            });


            localStorage.setItem(
                "zyron_posts",
                JSON.stringify(allPosts)
            );


            updateCurrentUser();


            profileName.textContent =
                currentUser.name;

            profileBio.textContent =
                currentUser.bio ||
                "مرحباً، هذا حسابي في منصة Zyron.";


            alert(
                "تم تحديث الملف الشخصي بنجاح"
            );

        }
    );


    // ==============================
    // تحديث بيانات المستخدم
    // ==============================

    function updateCurrentUser() {

        localStorage.setItem(
            "zyron_current_user",
            JSON.stringify(currentUser)
        );


        let users =
            JSON.parse(
                localStorage.getItem(
                    "zyron_users"
                )
            ) || [];


        const userIndex =
            users.findIndex(
                function (user) {

                    return String(user.id) ===
                        String(currentUser.id);

                }
            );


        if (userIndex !== -1) {

            users[userIndex] =
                currentUser;


            localStorage.setItem(
                "zyron_users",
                JSON.stringify(users)
            );

        }

    }

});
// ==============================
// Zyron - User Profile JavaScript
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

    const userProfileImage =
        document.getElementById("userProfileImage");

    const userProfileName =
        document.getElementById("userProfileName");

    const userProfileUsername =
        document.getElementById("userProfileUsername");

    const userProfileBio =
        document.getElementById("userProfileBio");

    const userPostsCount =
        document.getElementById("userPostsCount");

    const userFollowersCount =
        document.getElementById("userFollowersCount");

    const userFollowingCount =
        document.getElementById("userFollowingCount");

    const followUserBtn =
        document.getElementById("followUserBtn");

    const userProfilePosts =
        document.getElementById("userProfilePosts");


    // ==============================
    // جلب ID المستخدم من الرابط
    // ==============================

    const urlParams =
        new URLSearchParams(window.location.search);

    const userId =
        urlParams.get("id");


    if (!userId) {
        alert("لم يتم تحديد المستخدم");
        window.location.href = "explore.html";
        return;
    }


    // ==============================
    // جلب المستخدمين
    // ==============================

    let users =
        JSON.parse(
            localStorage.getItem("zyron_users")
        ) || [];


    let profileUser =
        users.find(function (user) {

            return String(user.id) ===
                String(userId);

        });


    if (!profileUser) {
        alert("المستخدم غير موجود");
        window.location.href = "explore.html";
        return;
    }


    // ==============================
    // إذا فتح المستخدم حسابه
    // ==============================

    if (
        String(profileUser.id) ===
        String(currentUser.id)
    ) {

        window.location.href =
            "profile.html";

        return;

    }


    // ==============================
    // دعم نظام المتابعة
    // ==============================

    if (!Array.isArray(currentUser.following)) {
        currentUser.following = [];
    }

    if (!Array.isArray(currentUser.followers)) {
        currentUser.followers = [];
    }

    if (!Array.isArray(profileUser.followers)) {
        profileUser.followers = [];
    }

    if (!Array.isArray(profileUser.following)) {
        profileUser.following = [];
    }


    // ==============================
    // عرض معلومات المستخدم
    // ==============================

    function displayUserProfile() {

        userProfileName.textContent =
            profileUser.name ||
            "مستخدم Zyron";


        userProfileUsername.textContent =
            "@" +
            (profileUser.username || "user");


        userProfileBio.textContent =
            profileUser.bio ||
            "مستخدم في Zyron";


        if (profileUser.profileImage) {

            userProfileImage.src =
                profileUser.profileImage;

        } else {

            // صورة افتراضية بدون رابط خارجي
            userProfileImage.removeAttribute("src");

        }


        updateStatistics();

        updateFollowButton();

    }


    // ==============================
    // جلب منشورات المستخدم
    // ==============================

    function getUserPosts() {

        const allPosts =
            JSON.parse(
                localStorage.getItem("zyron_posts")
            ) || [];


        return allPosts
            .filter(function (post) {

                return String(post.userId) ===
                    String(profileUser.id);

            })
            .sort(function (a, b) {

                return new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0);

            });

    }


    // ==============================
    // تحديث الإحصائيات
    // ==============================

    function updateStatistics() {

        const userPosts =
            getUserPosts();


        userPostsCount.textContent =
            userPosts.length;


        userFollowersCount.textContent =
            profileUser.followers.length;


        userFollowingCount.textContent =
            profileUser.following.length;

    }


    // ==============================
    // التحقق من المتابعة
    // ==============================

    function isFollowing() {

        return currentUser.following.some(
            function (followedUserId) {

                return String(followedUserId) ===
                    String(profileUser.id);

            }
        );

    }


    // ==============================
    // تحديث زر المتابعة
    // ==============================

    function updateFollowButton() {

        if (isFollowing()) {

            followUserBtn.textContent =
                "إلغاء المتابعة";

            followUserBtn.dataset.following =
                "true";

        } else {

            followUserBtn.textContent =
                "متابعة";

            followUserBtn.dataset.following =
                "false";

        }

    }


    // ==============================
    // متابعة / إلغاء متابعة
    // ==============================

    followUserBtn.addEventListener(
        "click",
        function () {

            // قراءة أحدث البيانات
            users =
                JSON.parse(
                    localStorage.getItem("zyron_users")
                ) || [];


            const currentUserIndex =
                users.findIndex(function (user) {

                    return String(user.id) ===
                        String(currentUser.id);

                });


            const profileUserIndex =
                users.findIndex(function (user) {

                    return String(user.id) ===
                        String(profileUser.id);

                });


            if (
                currentUserIndex === -1 ||
                profileUserIndex === -1
            ) {
                return;
            }


            // التأكد من المصفوفات
            if (
                !Array.isArray(
                    users[currentUserIndex].following
                )
            ) {
                users[currentUserIndex].following = [];
            }


            if (
                !Array.isArray(
                    users[profileUserIndex].followers
                )
            ) {
                users[profileUserIndex].followers = [];
            }


            const followingIndex =
                users[currentUserIndex]
                    .following
                    .findIndex(function (id) {

                        return String(id) ===
                            String(profileUser.id);

                    });


            const followerIndex =
                users[profileUserIndex]
                    .followers
                    .findIndex(function (id) {

                        return String(id) ===
                            String(currentUser.id);

                    });


            // ==============================
            // إضافة المتابعة
            // ==============================

            if (followingIndex === -1) {

                users[currentUserIndex]
                    .following
                    .push(profileUser.id);


                if (followerIndex === -1) {

                    users[profileUserIndex]
                        .followers
                        .push(currentUser.id);

                }

            }

            // ==============================
            // إلغاء المتابعة
            // ==============================

            else {

                users[currentUserIndex]
                    .following
                    .splice(
                        followingIndex,
                        1
                    );


                if (followerIndex !== -1) {

                    users[profileUserIndex]
                        .followers
                        .splice(
                            followerIndex,
                            1
                        );

                }

            }


            // ==============================
            // حفظ البيانات
            // ==============================

            localStorage.setItem(
                "zyron_users",
                JSON.stringify(users)
            );


            currentUser =
                users[currentUserIndex];


            profileUser =
                users[profileUserIndex];


            localStorage.setItem(
                "zyron_current_user",
                JSON.stringify(currentUser)
            );


            // تحديث الصفحة
            updateFollowButton();

            updateStatistics();

        }
    );


    // ==============================
    // عرض منشورات المستخدم
    // ==============================

    function displayUserPosts() {

        const userPosts =
            getUserPosts();


        userProfilePosts.innerHTML =
            "";


        if (userPosts.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.textContent =
                "لا توجد منشورات حالياً.";

            emptyMessage.className =
                "empty-user-posts";


            userProfilePosts.appendChild(
                emptyMessage
            );

            return;

        }


        userPosts.forEach(function (post) {

            const article =
                document.createElement("article");

            article.className =
                "user-profile-post";


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
            // الصورة
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
            // الفيديو
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
                "user-post-info";


            const statistics =
                document.createElement("span");


            const likes =
                Array.isArray(post.likedBy)
                    ? post.likedBy.length
                    : post.likes || 0;


            const comments =
                Array.isArray(post.comments)
                    ? post.comments.length
                    : 0;


            statistics.textContent =
                "❤️ " +
                likes +
                "   💬 " +
                comments;


            postInfo.appendChild(
                statistics
            );


            // التاريخ
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


            article.appendChild(
                postInfo
            );


            // ==============================
            // فتح المنشور
            // ==============================

            const openPost =
                document.createElement("a");

            openPost.href =
                "home.html?post=" +
                encodeURIComponent(post.id);

            openPost.textContent =
                "عرض المنشور";

            openPost.className =
                "open-post-btn";


            article.appendChild(
                openPost
            );


            userProfilePosts.appendChild(
                article
            );

        });

    }


    // ==============================
    // التشغيل الأول
    // ==============================

    displayUserProfile();

    displayUserPosts();

});
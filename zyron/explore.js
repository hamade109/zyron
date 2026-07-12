// ==============================
// Zyron - Explore JavaScript
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
    // تحويل نظام المتابعة القديم للجديد
    // ==============================

    if (!Array.isArray(currentUser.followers)) {
        currentUser.followers = [];
    }

    if (!Array.isArray(currentUser.following)) {
        currentUser.following = [];
    }


    // ==============================
    // عناصر الصفحة
    // ==============================

    const searchInput =
        document.getElementById("searchInput");

    const searchBtn =
        document.getElementById("searchBtn");

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const exploreContainer =
        document.getElementById("exploreContent");


    if (!exploreContainer) {
        console.error(
            "لم يتم العثور على العنصر exploreContent"
        );
        return;
    }


    // ==============================
    // البيانات
    // ==============================

    let users = [];
    let posts = [];

    let currentCategory = "all";
    let currentSearch = "";


    // ==============================
    // تحديث البيانات من LocalStorage
    // ==============================

    function loadData() {

        users =
            JSON.parse(
                localStorage.getItem("zyron_users")
            ) || [];

        posts =
            JSON.parse(
                localStorage.getItem("zyron_posts")
            ) || [];


        // ترتيب المنشورات من الأحدث
        posts.sort(function (a, b) {

            return new Date(b.createdAt || 0) -
                new Date(a.createdAt || 0);

        });

    }


    // ==============================
    // عرض الاستكشاف
    // ==============================

    function displayExploreContent() {

        loadData();

        exploreContainer.innerHTML = "";

        let resultsCount = 0;


        // ==============================
        // عرض المستخدمين
        // ==============================

        if (
            currentCategory === "all" ||
            currentCategory === "users"
        ) {

            const filteredUsers =
                users.filter(function (user) {

                    // عدم عرض المستخدم الحالي
                    if (
                        String(user.id) ===
                        String(currentUser.id)
                    ) {
                        return false;
                    }


                    const userText =
                        (
                            (user.name || "") +
                            " " +
                            (user.username || "") +
                            " " +
                            (user.bio || "")
                        ).toLowerCase();


                    return userText.includes(
                        currentSearch
                    );

                });


            filteredUsers.forEach(
                function (user) {

                    createUserCard(user);

                    resultsCount++;

                }
            );

        }


        // ==============================
        // عرض المنشورات
        // ==============================

        if (
            currentCategory === "all" ||
            currentCategory === "posts"
        ) {

            const filteredPosts =
                posts.filter(function (post) {

                    const postText =
                        (
                            (post.text || "") +
                            " " +
                            (post.name || "") +
                            " " +
                            (post.username || "")
                        ).toLowerCase();


                    return postText.includes(
                        currentSearch
                    );

                });


            filteredPosts.forEach(
                function (post) {

                    createPostCard(post);

                    resultsCount++;

                }
            );

        }


        // ==============================
        // لا توجد نتائج
        // ==============================

        if (resultsCount === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.className =
                "empty-explore-message";


            if (currentSearch) {

                emptyMessage.textContent =
                    "لا توجد نتائج مطابقة للبحث.";

            } else if (
                currentCategory === "users"
            ) {

                emptyMessage.textContent =
                    "لا يوجد مستخدمون آخرون حالياً.";

            } else if (
                currentCategory === "posts"
            ) {

                emptyMessage.textContent =
                    "لا توجد منشورات حالياً.";

            } else {

                emptyMessage.textContent =
                    "لا يوجد محتوى للاستكشاف حالياً.";

            }


            exploreContainer.appendChild(
                emptyMessage
            );

        }

    }


    // ==============================
    // إنشاء بطاقة مستخدم
    // ==============================

    function createUserCard(user) {

        const card =
            document.createElement("article");

        card.className =
            "explore-card user-card";

        card.style.cursor =
            "pointer";


        // ==============================
        // صورة المستخدم
        // ==============================

        const image =
            document.createElement("img");

        image.className =
            "explore-user-image";

        image.alt =
            "صورة المستخدم";


        if (user.profileImage) {

            image.src =
                user.profileImage;

        } else {

            // صورة افتراضية بدون رابط خارجي
            image.src =
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
                    '<rect width="100%" height="100%" fill="#dddddd"/>' +
                    '<circle cx="50" cy="38" r="20" fill="#999999"/>' +
                    '<circle cx="50" cy="95" r="35" fill="#999999"/>' +
                    '</svg>'
                );

        }


        // ==============================
        // اسم المستخدم
        // ==============================

        const name =
            document.createElement("h3");

        name.textContent =
            user.name ||
            "مستخدم Zyron";


        // ==============================
        // اليوزر
        // ==============================

        const username =
            document.createElement("p");

        username.className =
            "explore-username";

        username.textContent =
            "@" +
            (user.username || "user");


        // ==============================
        // النبذة
        // ==============================

        const bio =
            document.createElement("p");

        bio.className =
            "explore-user-bio";

        bio.textContent =
            user.bio ||
            "مستخدم في Zyron";


        // ==============================
        // إحصائيات المستخدم
        // ==============================

        const statistics =
            document.createElement("div");

        statistics.className =
            "explore-user-statistics";


        const followers =
            Array.isArray(user.followers)
                ? user.followers.length
                : Number(user.followers) || 0;


        const following =
            Array.isArray(user.following)
                ? user.following.length
                : Number(user.following) || 0;


        statistics.textContent =
            "المتابعون: " +
            followers +
            " | يتابع: " +
            following;


        // ==============================
        // زر المتابعة
        // ==============================

        const followButton =
            document.createElement("button");

        followButton.type =
            "button";

        followButton.className =
            "follow-btn";


        function isFollowing() {

            return currentUser.following.some(
                function (userId) {

                    return String(userId) ===
                        String(user.id);

                }
            );

        }


        function updateFollowButton() {

            if (isFollowing()) {

                followButton.textContent =
                    "إلغاء المتابعة";

                followButton.dataset.following =
                    "true";

            } else {

                followButton.textContent =
                    "متابعة";

                followButton.dataset.following =
                    "false";

            }

        }


        updateFollowButton();


        // ==============================
        // متابعة / إلغاء متابعة
        // ==============================

        followButton.addEventListener(
            "click",
            function (event) {

                // منع فتح الملف الشخصي
                event.stopPropagation();

                toggleFollow(user);

                updateFollowButton();

            }
        );


        // ==============================
        // فتح الملف الشخصي للمستخدم
        // ==============================

        card.addEventListener(
            "click",
            function (event) {

                // لا تفتح الملف عند الضغط على زر المتابعة
                if (
                    event.target.closest(
                        ".follow-btn"
                    )
                ) {
                    return;
                }


                window.location.href =
                    "user-profile.html?id=" +
                    encodeURIComponent(
                        user.id
                    );

            }
        );


        // ==============================
        // إضافة العناصر
        // ==============================

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(username);
        card.appendChild(bio);
        card.appendChild(statistics);
        card.appendChild(followButton);

        exploreContainer.appendChild(card);

    }


    // ==============================
    // إنشاء بطاقة منشور
    // ==============================

    function createPostCard(post) {

        const card =
            document.createElement("article");

        card.className =
            "explore-card post-card";


        // ==============================
        // صاحب المنشور
        // ==============================

        const userName =
            document.createElement("h3");

        userName.textContent =
            (post.name || "مستخدم Zyron") +
            " @" +
            (post.username || "user");


        card.appendChild(
            userName
        );


        // ==============================
        // نص المنشور
        // ==============================

        if (post.text) {

            const text =
                document.createElement("p");

            text.className =
                "explore-post-text";

            text.textContent =
                post.text;

            card.appendChild(
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


            card.appendChild(
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


            card.appendChild(
                video
            );

        }


        // ==============================
        // إحصائيات المنشور
        // ==============================

        const postInfo =
            document.createElement("div");

        postInfo.className =
            "explore-post-info";


        const likes =
            Array.isArray(post.likedBy)
                ? post.likedBy.length
                : Number(post.likes) || 0;


        const comments =
            Array.isArray(post.comments)
                ? post.comments.length
                : 0;


        const statistics =
            document.createElement("span");

        statistics.textContent =
            "❤️ " +
            likes +
            "   💬 " +
            comments;


        postInfo.appendChild(
            statistics
        );


        // ==============================
        // تاريخ المنشور
        // ==============================

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


        card.appendChild(
            postInfo
        );


        // ==============================
        // فتح المنشور
        // ==============================

        const openPost =
            document.createElement("a");

        openPost.href =
            "home.html?post=" +
            encodeURIComponent(
                post.id
            );

        openPost.textContent =
            "عرض المنشور";

        openPost.className =
            "open-post-btn";


        card.appendChild(
            openPost
        );


        exploreContainer.appendChild(
            card
        );

    }


    // ==============================
    // متابعة / إلغاء متابعة
    // ==============================

    function toggleFollow(targetUser) {

        users =
            JSON.parse(
                localStorage.getItem("zyron_users")
            ) || [];


        const currentUserIndex =
            users.findIndex(
                function (user) {

                    return String(user.id) ===
                        String(currentUser.id);

                }
            );


        const targetUserIndex =
            users.findIndex(
                function (user) {

                    return String(user.id) ===
                        String(targetUser.id);

                }
            );


        if (
            currentUserIndex === -1 ||
            targetUserIndex === -1
        ) {

            alert(
                "تعذر العثور على المستخدم"
            );

            return;

        }


        // ==============================
        // تجهيز المصفوفات
        // ==============================

        if (
            !Array.isArray(
                users[currentUserIndex].following
            )
        ) {

            users[currentUserIndex].following = [];

        }


        if (
            !Array.isArray(
                users[targetUserIndex].followers
            )
        ) {

            users[targetUserIndex].followers = [];

        }


        // ==============================
        // البحث عن المتابعة
        // ==============================

        const followingIndex =
            users[currentUserIndex]
                .following
                .findIndex(
                    function (userId) {

                        return String(userId) ===
                            String(targetUser.id);

                    }
                );


        const followerIndex =
            users[targetUserIndex]
                .followers
                .findIndex(
                    function (userId) {

                        return String(userId) ===
                            String(currentUser.id);

                    }
                );


        // ==============================
        // إضافة المتابعة
        // ==============================
if (followingIndex === -1) {

    users[currentUserIndex]
        .following
        .push(targetUser.id);

    if (followerIndex === -1) {

        users[targetUserIndex]
            .followers
            .push(currentUser.id);

    }


    // ==============================
    // إنشاء إشعار متابعة
    // ==============================

    createNotification(
        targetUser.id,
        "follow",
        (currentUser.name || "مستخدم Zyron") +
        " بدأ بمتابعتك",
        "user-profile.html?id=" +
        encodeURIComponent(currentUser.id)
    );

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

                users[targetUserIndex]
                    .followers
                    .splice(
                        followerIndex,
                        1
                    );

            }

        }


        // ==============================
        // حفظ جميع المستخدمين
        // ==============================

        localStorage.setItem(
            "zyron_users",
            JSON.stringify(users)
        );


        // ==============================
        // تحديث المستخدم الحالي
        // ==============================

        currentUser =
            users[currentUserIndex];


        localStorage.setItem(
            "zyron_current_user",
            JSON.stringify(currentUser)
        );

    }


    // ==============================
    // البحث
    // ==============================

    function searchContent() {

        if (!searchInput) {
            return;
        }


        currentSearch =
            searchInput.value
                .trim()
                .toLowerCase();


        displayExploreContent();

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            searchContent
        );

    }


    if (searchInput) {

        // بحث مباشر أثناء الكتابة
        searchInput.addEventListener(
            "input",
            searchContent
        );


        // البحث بزر Enter
        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchContent();

                }

            }
        );

    }


    // ==============================
    // التصنيفات
    // ==============================

    categoryButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    categoryButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentCategory =
                        button.dataset.category ||
                        "all";


                    displayExploreContent();

                }
            );

        }
    );


    // ==============================
    // التشغيل الأول
    // ==============================

    displayExploreContent();

});
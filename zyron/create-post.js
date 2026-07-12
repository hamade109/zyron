// ==============================
// Zyron - Create Post JavaScript
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

    const createPostForm =
        document.getElementById("createPostForm");

    const postText =
        document.getElementById("postText");

    const postMedia =
        document.getElementById("postMedia");

    const mediaPreview =
        document.getElementById("mediaPreview");

    const characterCount =
        document.getElementById("characterCount");


    if (
        !createPostForm ||
        !postText ||
        !postMedia ||
        !mediaPreview
    ) {
        console.error("بعض عناصر صفحة إنشاء المنشور غير موجودة.");
        return;
    }


    let mediaData = "";
    let mediaType = "";


    // ==============================
    // عداد الأحرف
    // ==============================

    postText.addEventListener("input", function () {

        if (characterCount) {
            characterCount.textContent =
                postText.value.length;
        }

    });


    // ==============================
    // معاينة الصورة أو الفيديو
    // ==============================

    postMedia.addEventListener("change", function () {

        const file =
            postMedia.files[0];

        mediaPreview.innerHTML = "";

        mediaData = "";
        mediaType = "";


        if (!file) {
            return;
        }


        // التحقق من نوع الملف
        if (
            !file.type.startsWith("image/") &&
            !file.type.startsWith("video/")
        ) {

            alert("يرجى اختيار صورة أو فيديو فقط");

            postMedia.value = "";

            return;
        }


        // الحد الأقصى 5MB
        if (file.size > 5 * 1024 * 1024) {

            alert(
                "حجم الملف كبير. اختر ملفاً أقل من 5MB."
            );

            postMedia.value = "";

            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                mediaData =
                    event.target.result;


                // صورة
                if (
                    file.type.startsWith("image/")
                ) {

                    mediaType =
                        "image";


                    const image =
                        document.createElement("img");

                    image.src =
                        mediaData;

                    image.alt =
                        "معاينة الصورة";


                    mediaPreview.appendChild(
                        image
                    );

                }


                // فيديو
                else if (
                    file.type.startsWith("video/")
                ) {

                    mediaType =
                        "video";


                    const video =
                        document.createElement("video");

                    video.src =
                        mediaData;

                    video.controls =
                        true;


                    mediaPreview.appendChild(
                        video
                    );

                }

            };


        reader.onerror =
            function () {

                alert(
                    "حدث خطأ أثناء قراءة الملف."
                );

                mediaData = "";
                mediaType = "";

            };


        reader.readAsDataURL(file);

    });


    // ==============================
    // إنشاء معرف فريد للمنشور
    // ==============================

    function createPostId() {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID ===
                "function"
        ) {

            return crypto.randomUUID();

        }


        return (
            Date.now().toString() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 10)
        );

    }


    // ==============================
    // نشر المنشور
    // ==============================

    createPostForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const text =
                postText.value.trim();


            // يجب وجود نص أو وسائط
            if (!text && !mediaData) {

                alert(
                    "اكتب منشوراً أو أضف صورة أو فيديو"
                );

                return;
            }


            // ==============================
            // إنشاء المنشور
            // ==============================

            const newPost = {

                id:
                    createPostId(),

                userId:
                    currentUser.id,

                name:
                    currentUser.name,

                username:
                    currentUser.username,

                text:
                    text,

                media:
                    mediaData,

                mediaType:
                    mediaType,

                likes:
                    0,

                likedBy:
                    [],

                comments:
                    [],

                createdAt:
                    new Date().toISOString()

            };


            // ==============================
            // جلب جميع المنشورات
            // ==============================

            let allPosts =
                JSON.parse(
                    localStorage.getItem(
                        "zyron_posts"
                    )
                ) || [];


            // إضافة المنشور في البداية
            allPosts.unshift(
                newPost
            );


            // ==============================
            // الحفظ
            // ==============================

            try {

                localStorage.setItem(
                    "zyron_posts",
                    JSON.stringify(allPosts)
                );


                alert(
                    "تم نشر المنشور بنجاح"
                );


                window.location.href =
                    "home.html";


            } catch (error) {

                console.error(
                    "خطأ في حفظ المنشور:",
                    error
                );


                alert(
                    "تعذر حفظ المنشور. قد يكون حجم الصورة أو الفيديو كبيراً."
                );

            }

        }
    );

});
// ==============================
// Zyron - Notifications JavaScript
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // حماية الصفحة
    // ==============================

    requireLogin();

    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }


    // ==============================
    // عناصر الصفحة
    // ==============================

    const notificationsList =
        document.getElementById("notificationsList");

    const markAllReadBtn =
        document.getElementById("markAllReadBtn");

    const filterButtons =
        document.querySelectorAll(".notification-filter");


    // ==============================
    // الفلتر الحالي
    // ==============================

    let currentFilter = "all";


    // ==============================
    // جلب الإشعارات
    // ==============================

    function getNotifications() {

        const notifications =
            JSON.parse(
                localStorage.getItem("zyron_notifications")
            ) || [];

        return notifications
            .filter(function (notification) {

                return String(notification.userId) ===
                    String(currentUser.id);

            })
            .sort(function (a, b) {

                return new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0);

            });

    }


    // ==============================
    // حفظ جميع الإشعارات
    // ==============================

    function saveAllNotifications(notifications) {

        localStorage.setItem(
            "zyron_notifications",
            JSON.stringify(notifications)
        );

    }


    // ==============================
    // أيقونة نوع الإشعار
    // ==============================

    function getNotificationIcon(type) {

        switch (type) {

            case "follow":
                return "👤";

            case "like":
                return "❤️";

            case "comment":
                return "💬";

            case "message":
                return "✉️";

            default:
                return "🔔";

        }

    }


    // ==============================
    // عرض الإشعارات
    // ==============================

    function displayNotifications() {

        notificationsList.innerHTML = "";

        let notifications =
            getNotifications();


        // ==============================
        // تطبيق الفلتر
        // ==============================

        if (currentFilter === "unread") {

            notifications =
                notifications.filter(
                    function (notification) {

                        return notification.read !== true;

                    }
                );

        } else if (currentFilter !== "all") {

            notifications =
                notifications.filter(
                    function (notification) {

                        return notification.type ===
                            currentFilter;

                    }
                );

        }


        // ==============================
        // لا توجد إشعارات
        // ==============================

        if (notifications.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.className =
                "empty-notifications";

            emptyMessage.textContent =
                "لا توجد إشعارات حالياً.";

            notificationsList.appendChild(
                emptyMessage
            );

            return;

        }


        // ==============================
        // إنشاء الإشعارات
        // ==============================

        notifications.forEach(
            function (notification) {

                createNotificationItem(
                    notification
                );

            }
        );

    }


    // ==============================
    // إنشاء إشعار
    // ==============================

    function createNotificationItem(notification) {

        const item =
            document.createElement("div");

        item.className =
            "notification-item";


        if (notification.read !== true) {

            item.classList.add("unread");

        }


        // ==============================
        // الأيقونة
        // ==============================

        const icon =
            document.createElement("div");

        icon.className =
            "notification-icon";

        icon.textContent =
            getNotificationIcon(
                notification.type
            );


        // ==============================
        // المحتوى
        // ==============================

        const content =
            document.createElement("div");

        content.className =
            "notification-content";


        const text =
            document.createElement("p");

        text.textContent =
            notification.text ||
            "لديك إشعار جديد";


        // ==============================
        // الوقت
        // ==============================

        const time =
            document.createElement("small");

        time.className =
            "notification-time";


        if (notification.createdAt) {

            time.textContent =
                new Date(
                    notification.createdAt
                ).toLocaleString(
                    "ar-SA"
                );

        }


        content.appendChild(text);
        content.appendChild(time);


        // ==============================
        // نقطة غير مقروء
        // ==============================

        if (notification.read !== true) {

            const unreadDot =
                document.createElement("span");

            unreadDot.className =
                "notification-unread-dot";

            item.appendChild(unreadDot);

        }


        item.appendChild(icon);
        item.appendChild(content);


        // ==============================
        // الضغط على الإشعار
        // ==============================

        item.addEventListener(
            "click",
            function () {

                markNotificationAsRead(
                    notification.id
                );


                // فتح الرابط المرتبط بالإشعار
                if (notification.link) {

                    window.location.href =
                        notification.link;

                } else {

                    displayNotifications();

                }

            }
        );


        notificationsList.appendChild(
            item
        );

    }


    // ==============================
    // تحديد إشعار كمقروء
    // ==============================

    function markNotificationAsRead(notificationId) {

        const allNotifications =
            JSON.parse(
                localStorage.getItem(
                    "zyron_notifications"
                )
            ) || [];


        const notification =
            allNotifications.find(
                function (savedNotification) {

                    return String(
                        savedNotification.id
                    ) === String(
                        notificationId
                    );

                }
            );


        if (notification) {

            notification.read = true;

            saveAllNotifications(
                allNotifications
            );

        }

    }


    // ==============================
    // تحديد الكل كمقروء
    // ==============================

    if (markAllReadBtn) {

        markAllReadBtn.addEventListener(
            "click",
            function () {

                const allNotifications =
                    JSON.parse(
                        localStorage.getItem(
                            "zyron_notifications"
                        )
                    ) || [];


                allNotifications.forEach(
                    function (notification) {

                        if (
                            String(notification.userId) ===
                            String(currentUser.id)
                        ) {

                            notification.read = true;

                        }

                    }
                );


                saveAllNotifications(
                    allNotifications
                );

                displayNotifications();

            }
        );

    }


    // ==============================
    // الفلاتر
    // ==============================

    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter ||
                        "all";


                    displayNotifications();

                }
            );

        }
    );


    // ==============================
    // التشغيل الأول
    // ==============================

    displayNotifications();

});
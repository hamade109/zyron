// ==============================
// Zyron - Messages JavaScript
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

    const userSearch =
        document.getElementById("userSearch");

    const conversationsList =
        document.getElementById("conversationsList");

    const chatUserName =
        document.getElementById("chatUserName");

    const chatUsername =
        document.getElementById("chatUsername");

    const chatMessages =
        document.getElementById("chatMessages");

    const messageForm =
        document.getElementById("messageForm");

    const messageInput =
        document.getElementById("messageInput");

    const sendMessageBtn =
        document.getElementById("sendMessageBtn");


    // ==============================
    // البيانات
    // ==============================

    let users = [];
    let messages = [];
    let selectedUser = null;


    // ==============================
    // تحميل البيانات
    // ==============================

    function loadData() {

        users =
            JSON.parse(
                localStorage.getItem("zyron_users")
            ) || [];

        messages =
            JSON.parse(
                localStorage.getItem("zyron_messages")
            ) || [];

    }


    // ==============================
    // الصورة الافتراضية
    // ==============================

    function getDefaultImage() {

        return (
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
                '<rect width="100%" height="100%" fill="#dddddd"/>' +
                '<circle cx="50" cy="38" r="20" fill="#999999"/>' +
                '<circle cx="50" cy="95" r="35" fill="#999999"/>' +
                '</svg>'
            )
        );

    }


    // ==============================
    // عرض المستخدمين
    // ==============================

    function displayUsers() {

        loadData();

        conversationsList.innerHTML = "";

        const searchText =
            userSearch
                ? userSearch.value.trim().toLowerCase()
                : "";


        const otherUsers =
            users.filter(function (user) {

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
                        (user.username || "")
                    ).toLowerCase();


                return userText.includes(searchText);

            });


        if (otherUsers.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.className =
                "empty-conversations";

            emptyMessage.textContent =
                "لا يوجد مستخدمون حالياً.";

            conversationsList.appendChild(
                emptyMessage
            );

            return;

        }


        otherUsers.forEach(function (user) {

            createConversationItem(user);

        });

    }


    // ==============================
    // إنشاء عنصر مستخدم
    // ==============================

    function createConversationItem(user) {

        const item =
            document.createElement("div");

        item.className =
            "conversation-item";


        if (
            selectedUser &&
            String(selectedUser.id) ===
            String(user.id)
        ) {

            item.classList.add("active");

        }


        // الصورة
        const image =
            document.createElement("img");

        image.className =
            "conversation-user-image";

        image.src =
            user.profileImage ||
            getDefaultImage();

        image.alt =
            "صورة المستخدم";


        // المعلومات
        const info =
            document.createElement("div");

        info.className =
            "conversation-user-info";


        const name =
            document.createElement("h3");

        name.textContent =
            user.name ||
            "مستخدم Zyron";


        const username =
            document.createElement("p");

        username.textContent =
            "@" +
            (user.username || "user");


        info.appendChild(name);
        info.appendChild(username);

        item.appendChild(image);
        item.appendChild(info);


        // فتح المحادثة
        item.addEventListener(
            "click",
            function () {

                openConversation(user);

            }
        );


        conversationsList.appendChild(item);

    }


    // ==============================
    // فتح المحادثة
    // ==============================

    function openConversation(user) {

        selectedUser = user;

        chatUserName.textContent =
            user.name ||
            "مستخدم Zyron";

        chatUsername.textContent =
            "@" +
            (user.username || "user");


        messageInput.disabled = false;
        sendMessageBtn.disabled = false;


        displayUsers();

        displayMessages();


        messageInput.focus();

    }


    // ==============================
    // عرض الرسائل
    // ==============================

    function displayMessages() {

        loadData();

        chatMessages.innerHTML = "";


        if (!selectedUser) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.className =
                "empty-chat-message";

            emptyMessage.textContent =
                "اختر محادثة لعرض الرسائل.";

            chatMessages.appendChild(
                emptyMessage
            );

            return;

        }


        const conversationMessages =
            messages.filter(function (message) {

                const sentByCurrentUser =
                    String(message.senderId) ===
                        String(currentUser.id) &&
                    String(message.receiverId) ===
                        String(selectedUser.id);


                const receivedByCurrentUser =
                    String(message.senderId) ===
                        String(selectedUser.id) &&
                    String(message.receiverId) ===
                        String(currentUser.id);


                return (
                    sentByCurrentUser ||
                    receivedByCurrentUser
                );

            });


        // ترتيب الرسائل
        conversationMessages.sort(
            function (a, b) {

                return new Date(a.createdAt || 0) -
                    new Date(b.createdAt || 0);

            }
        );


        if (conversationMessages.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.className =
                "empty-chat-message";

            emptyMessage.textContent =
                "لا توجد رسائل بعد. ابدأ المحادثة الآن.";

            chatMessages.appendChild(
                emptyMessage
            );

            return;

        }


        conversationMessages.forEach(
            function (message) {

                createMessageElement(message);

            }
        );


        // النزول لآخر رسالة
        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    // ==============================
    // إنشاء رسالة
    // ==============================

    function createMessageElement(message) {

        const messageElement =
            document.createElement("div");


        const isSent =
            String(message.senderId) ===
            String(currentUser.id);


        messageElement.className =
            isSent
                ? "message sent"
                : "message received";


        const bubble =
            document.createElement("div");

        bubble.className =
            "message-bubble";


        const text =
            document.createElement("span");

        text.textContent =
            message.text || "";


        const time =
            document.createElement("small");

        time.className =
            "message-time";


        if (message.createdAt) {

            time.textContent =
                new Date(
                    message.createdAt
                ).toLocaleString(
                    "ar-SA"
                );

        }


        bubble.appendChild(text);
        bubble.appendChild(time);

        messageElement.appendChild(bubble);

        chatMessages.appendChild(
            messageElement
        );

    }


    // ==============================
    // إرسال رسالة
    // ==============================

    messageForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!selectedUser) {
                return;
            }


            const messageText =
                messageInput.value.trim();


            if (!messageText) {
                return;
            }


            loadData();


            const newMessage = {

                id:
                    Date.now(),

                senderId:
                    currentUser.id,

                receiverId:
                    selectedUser.id,

                text:
                    messageText,

                createdAt:
                    new Date().toISOString()

            };


            messages.push(
                newMessage
            );


            localStorage.setItem(
                "zyron_messages",
                JSON.stringify(messages)
            );


            messageInput.value = "";


            displayMessages();

        }
    );


    // ==============================
    // البحث عن المستخدمين
    // ==============================

    if (userSearch) {

        userSearch.addEventListener(
            "input",
            displayUsers
        );

    }


    // ==============================
    // فتح محادثة من الرابط
    // مثال:
    // messages.html?user=123
    // ==============================

    function openUserFromURL() {

        const urlParams =
            new URLSearchParams(
                window.location.search
            );


        const userId =
            urlParams.get("user");


        if (!userId) {
            return;
        }


        const user =
            users.find(function (savedUser) {

                return String(savedUser.id) ===
                    String(userId);

            });


        if (user) {

            openConversation(user);

        }

    }


    // ==============================
    // التشغيل الأول
    // ==============================

    loadData();

    displayUsers();

    openUserFromURL();

});
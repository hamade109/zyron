if (userIndex === -1) {

    post.likedBy.push(
        currentUser.id
    );

    // إرسال إشعار إعجاب
    if (
        post.userId &&
        String(post.userId) !== String(currentUser.id)
    ) {
        createNotification(
            post.userId,
            "like",
            (currentUser.name || "مستخدم Zyron") +
            " أعجب بمنشورك",
            "home.html?post=" +
            encodeURIComponent(post.id)
        );
    }

} else {

    post.likedBy.splice(
        userIndex,
        1
    );

}
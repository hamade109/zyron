// ===============================
// Zyron - Home
// ===============================

const publishPost =
document.getElementById("publishPost");

const postText =
document.getElementById("postText");

const postImage =
document.getElementById("postImage");

const feed =
document.querySelector(".feed");

// ===============================
// تحميل المنشورات
// ===============================

let posts =
JSON.parse(localStorage.getItem("posts")) || [];

loadPosts();

// ===============================
// نشر منشور
// ===============================

publishPost.addEventListener("click",function(){

const text =
postText.value.trim();

if(text===""){

alert("اكتب شيئًا أولاً.");

return;

}

const user =
JSON.parse(localStorage.getItem("user"));

const post={

id:Date.now(),

username:user ? user.username : "Guest",

fullname:user ? user.fullname : "مستخدم",

text:text,

likes:0,

comments:0,

reposts:0,

date:new Date().toLocaleString()

};

posts.unshift(post);

localStorage.setItem(

"posts",

JSON.stringify(posts)

);

postText.value="";

loadPosts();

});

// ===============================
// عرض المنشورات
// ===============================

function loadPosts(){

feed.innerHTML="";

posts.forEach(function(post){

const article=
document.createElement("article");

article.className="post";

article.innerHTML=`

<h3>${post.fullname}</h3>

<small>@${post.username}</small>

<p>${post.text}</p>

<p>${post.date}</p>

<div class="actions">

<button onclick="likePost(${post.id})">

❤️ ${post.likes}

</button>

<button onclick="commentPost(${post.id})">

💬 ${post.comments}

</button>

<button onclick="repostPost(${post.id})">

🔁 ${post.reposts}

</button>

<button onclick="deletePost(${post.id})">

🗑 حذف

</button>

</div>

`;

feed.appendChild(article);

});

}

// ===============================
// إعجاب
// ===============================

function likePost(id){

posts.forEach(function(post){

if(post.id===id){

post.likes++;

}

});

savePosts();

}

// ===============================
// تعليق
// ===============================

function commentPost(id){

posts.forEach(function(post){

if(post.id===id){

post.comments++;

}

});

savePosts();

}

// ===============================
// إعادة نشر
// ===============================

function repostPost(id){

posts.forEach(function(post){

if(post.id===id){

post.reposts++;

}

});

savePosts();

}

// ===============================
// حذف
// ===============================

function deletePost(id){

posts=

posts.filter(function(post){

return post.id!==id;

});

savePosts();

}

// ===============================
// حفظ
// ===============================

function savePosts(){

localStorage.setItem(

"posts",

JSON.stringify(posts)

);

loadPosts();

}

// ===============================
// تشغيل الصفحة
// ===============================

window.onload=function(){

loadPosts();

console.log("Home Ready");

};
// ===============================
// Zyron - Explore
// ===============================

const searchInput =
document.querySelector("input[type='search']");

const exploreContainer =
document.getElementById("explore");

// ===============================
// تحميل المنشورات
// ===============================

let posts =
JSON.parse(localStorage.getItem("posts")) || [];

// ===============================
// عرض المنشورات
// ===============================

function loadExplore(data = posts){

if(!exploreContainer){

return;

}

exploreContainer.innerHTML = "";

if(data.length === 0){

exploreContainer.innerHTML =
"<p>لا توجد نتائج.</p>";

return;

}

data.forEach(function(post){

const card =
document.createElement("div");

card.className = "explore-post";

card.innerHTML = `

<h3>${post.fullname}</h3>

<p>@${post.username}</p>

<p>${post.text}</p>

<small>${post.date}</small>

`;

exploreContainer.appendChild(card);

});

}

// ===============================
// البحث
// ===============================

function searchPosts(word){

const result = posts.filter(function(post){

return (

post.text.toLowerCase().includes(word.toLowerCase()) ||

post.username.toLowerCase().includes(word.toLowerCase()) ||

post.fullname.toLowerCase().includes(word.toLowerCase())

);

});

loadExplore(result);

}

// ===============================
// عند الكتابة
// ===============================

if(searchInput){

searchInput.addEventListener("input",function(){

searchPosts(this.value);

});

}

// ===============================
// المنشورات الرائجة
// ===============================

function sortTrending(){

posts.sort(function(a,b){

return (b.likes || 0) - (a.likes || 0);

});

loadExplore(posts);

}

// ===============================
// تحديث البيانات
// ===============================

function refreshExplore(){

posts =
JSON.parse(localStorage.getItem("posts")) || [];

loadExplore();

}

// ===============================
// تشغيل الصفحة
// ===============================

window.onload = function(){

refreshExplore();

console.log("Explore Ready");

};
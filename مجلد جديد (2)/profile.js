// ===============================
// Zyron - Profile
// ===============================

const profileImage =
document.querySelector(".profile-info img");

const profileName =
document.querySelector(".profile-info h2");

const profileUsername =
document.querySelector(".profile-info p");

const bio =
document.querySelector(".bio");

const postsCount =
document.querySelectorAll(".stat-box h3")[0];

const followersCount =
document.querySelectorAll(".stat-box h3")[1];

const followingCount =
document.querySelectorAll(".stat-box h3")[2];

// ===============================
// تحميل بيانات المستخدم
// ===============================

function loadProfile(){

const user =
JSON.parse(localStorage.getItem("user"));

if(!user){

alert("يجب تسجيل الدخول.");

window.location.href="login.html";

return;

}

profileName.textContent =
user.fullname;

profileUsername.textContent =
"@" + user.username;

profileImage.src =
user.avatar || "images/avatar.png";

bio.textContent =
user.bio || "لا توجد نبذة شخصية.";

postsCount.textContent =
user.posts || 0;

followersCount.textContent =
user.followers || 0;

followingCount.textContent =
user.following || 0;

}

// ===============================
// تعديل النبذة
// ===============================

function editBio(){

const user =
JSON.parse(localStorage.getItem("user"));

const newBio =
prompt("اكتب نبذتك الشخصية",user.bio);

if(newBio===null){

return;

}

user.bio=newBio;

localStorage.setItem(

"user",

JSON.stringify(user)

);

loadProfile();

}

// ===============================
// تغيير الصورة
// ===============================

function changeAvatar(){

alert("سيتم إضافة رفع الصور لاحقًا.");

}

// ===============================
// تعديل الاسم
// ===============================

function editName(){

const user =
JSON.parse(localStorage.getItem("user"));

const newName =
prompt("الاسم الكامل",user.fullname);

if(newName===null){

return;

}

user.fullname=newName;

localStorage.setItem(

"user",

JSON.stringify(user)

);

loadProfile();

}

// ===============================
// تعديل اسم المستخدم
// ===============================

function editUsername(){

const user =
JSON.parse(localStorage.getItem("user"));

const newUsername =
prompt("اسم المستخدم",user.username);

if(newUsername===null){

return;

}

user.username=newUsername;

localStorage.setItem(

"user",

JSON.stringify(user)

);

loadProfile();

}

// ===============================
// حفظ
// ===============================

function saveProfile(user){

localStorage.setItem(

"user",

JSON.stringify(user)

);

}

// ===============================
// تشغيل الصفحة
// ===============================

window.onload=function(){

loadProfile();

console.log("Profile Ready");

};
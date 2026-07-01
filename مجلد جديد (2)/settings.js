// ===============================
// Zyron - Settings
// ===============================

// تحميل بيانات المستخدم

let user =
JSON.parse(localStorage.getItem("user")) || {};

// ===============================
// حفظ البيانات
// ===============================

function saveUser(){

localStorage.setItem(

"user",

JSON.stringify(user)

);

}

// ===============================
// تغيير الاسم
// ===============================

function changeName(){

const name =
prompt("أدخل الاسم الجديد",user.fullname);

if(name===null || name.trim()===""){

return;

}

user.fullname=name.trim();

saveUser();

alert("تم تحديث الاسم.");

}

// ===============================
// تغيير اسم المستخدم
// ===============================

function changeUsername(){

const username =
prompt("أدخل اسم المستخدم",user.username);

if(username===null || username.trim()===""){

return;

}

user.username=username.trim();

saveUser();

alert("تم تحديث اسم المستخدم.");

}

// ===============================
// تغيير البريد
// ===============================

function changeEmail(){

const email =
prompt("أدخل البريد الإلكتروني",user.email);

if(email===null || email.trim()===""){

return;

}

user.email=email.trim();

saveUser();

alert("تم تحديث البريد الإلكتروني.");

}

// ===============================
// تغيير كلمة المرور
// ===============================

function changePassword(){

const password =
prompt("أدخل كلمة المرور الجديدة");

if(password===null || password.length<8){

alert("يجب أن تكون كلمة المرور 8 أحرف على الأقل.");

return;

}

user.password=password;

saveUser();

alert("تم تغيير كلمة المرور.");

}

// ===============================
// حذف الحساب
// ===============================

function deleteAccount(){

const confirmDelete =
confirm("هل تريد حذف الحساب؟");

if(!confirmDelete){

return;

}

localStorage.removeItem("user");

localStorage.removeItem("posts");

localStorage.removeItem("messages");

localStorage.removeItem("notifications");

alert("تم حذف الحساب.");

window.location.href="signup.html";

}

// ===============================
// تسجيل الخروج
// ===============================

function logout(){

localStorage.removeItem("loggedIn");

alert("تم تسجيل الخروج.");

window.location.href="login.html";

}

// ===============================
// إعادة تعيين التطبيق
// ===============================

function resetApplication(){

const answer =
confirm("سيتم حذف جميع البيانات المحلية.");

if(!answer){

return;

}

localStorage.clear();

alert("تمت إعادة التعيين.");

window.location.href="signup.html";

}

// ===============================
// عرض معلومات الحساب
// ===============================

function accountInfo(){

console.log(user);

}

// ===============================
// تشغيل الصفحة
// ===============================

window.onload=function(){

console.log("Settings Ready");

accountInfo();

};
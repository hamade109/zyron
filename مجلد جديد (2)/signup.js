// ===============================
// Zyron - Signup
// ===============================

const signupForm = document.getElementById("signupForm");

const fullname = document.getElementById("fullname");

const username = document.getElementById("username");

const email = document.getElementById("email");

const phone = document.getElementById("phone");

const birthday = document.getElementById("birthday");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

// ===============================
// التحقق من البريد الإلكتروني
// ===============================

function isValidEmail(mail){

    const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(mail);

}

// ===============================
// إنشاء الحساب
// ===============================

signupForm.addEventListener("submit",function(event){

event.preventDefault();

if(fullname.value.trim()==""){

alert("أدخل الاسم الكامل.");

return;

}

if(username.value.trim()==""){

alert("أدخل اسم المستخدم.");

return;

}

if(email.value.trim()==""){

alert("أدخل البريد الإلكتروني.");

return;

}

if(!isValidEmail(email.value.trim())){

alert("صيغة البريد الإلكتروني غير صحيحة.");

return;

}

if(phone.value.trim()==""){

alert("أدخل رقم الجوال.");

return;

}

if(birthday.value==""){

alert("اختر تاريخ الميلاد.");

return;

}

if(password.value==""){

alert("أدخل كلمة المرور.");

return;

}

if(password.value.length<8){

alert("يجب أن تكون كلمة المرور 8 أحرف أو أكثر.");

return;

}

if(password.value!==confirmPassword.value){

alert("كلمتا المرور غير متطابقتين.");

return;

}

// حفظ البيانات

const user={

fullname:fullname.value,

username:username.value,

email:email.value,

phone:phone.value,

birthday:birthday.value,

password:password.value,

followers:0,

following:0,

posts:0,

verified:false,

bio:"",

avatar:"images/avatar.png"

};

localStorage.setItem(

"user",

JSON.stringify(user)

);

alert("تم إنشاء الحساب بنجاح.");

window.location.href="login.html";

});

// ===============================
// عند تشغيل الصفحة
// ===============================

window.onload=function(){

fullname.focus();

console.log("Signup Ready");

};
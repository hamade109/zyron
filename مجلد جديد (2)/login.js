// ===============================
// Zyron - Login
// ===============================

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

// ===============================
// التحقق من البريد الإلكتروني
// ===============================

function isValidEmail(mail){

    const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(mail);

}

// ===============================
// تسجيل الدخول
// ===============================

function login(userEmail,userPassword){

    const savedUser =
    JSON.parse(localStorage.getItem("user"));

    if(savedUser == null){

        alert("لا يوجد حساب.");

        return;

    }

    if(savedUser.email !== userEmail){

        alert("البريد الإلكتروني غير صحيح.");

        return;

    }

    if(savedUser.password !== userPassword){

        alert("كلمة المرور غير صحيحة.");

        return;

    }

    localStorage.setItem(
        "loggedIn",
        "true"
    );

    alert("تم تسجيل الدخول بنجاح.");

    window.location.href="home.html";

}

// ===============================
// عند الضغط على تسجيل الدخول
// ===============================

loginForm.addEventListener(
"submit",
function(event){

event.preventDefault();

const userEmail =
email.value.trim();

const userPassword =
password.value.trim();

if(userEmail===""){

alert("أدخل البريد الإلكتروني.");

return;

}

if(!isValidEmail(userEmail)){

alert("صيغة البريد الإلكتروني غير صحيحة.");

return;

}

if(userPassword===""){

alert("أدخل كلمة المرور.");

return;

}

login(userEmail,userPassword);

});

// ===============================
// تذكرني
// ===============================

const remember =
document.querySelector(
'input[type="checkbox"]'
);

remember.addEventListener(
"change",
function(){

if(this.checked){

console.log("Remember Me Enabled");

}else{

console.log("Remember Me Disabled");

}

});

// ===============================
// عند فتح الصفحة
// ===============================

window.onload=function(){

email.focus();

console.log("Login Ready");

};
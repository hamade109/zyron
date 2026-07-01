// ==========================
// Zyron - Main App
// ==========================

console.log("Zyron Started");

// اسم المنصة

const APP_NAME = "Zyron";

// إصدار التطبيق

const APP_VERSION = "1.0.0";

// المستخدم الحالي

let currentUser = null;

// ==========================
// إشعار
// ==========================

function showNotification(message){

    alert(message);

}

// ==========================
// الانتقال بين الصفحات
// ==========================

function goTo(page){

    window.location.href = page;

}

// ==========================
// تسجيل الخروج
// ==========================

function logout(){

    localStorage.removeItem("user");

    showNotification("تم تسجيل الخروج");

    goTo("login.html");

}

// ==========================
// حفظ بيانات
// ==========================

function saveData(key,value){

    localStorage.setItem(key,JSON.stringify(value));

}

// ==========================
// قراءة بيانات
// ==========================

function getData(key){

    return JSON.parse(localStorage.getItem(key));

}

// ==========================
// حذف بيانات
// ==========================

function removeData(key){

    localStorage.removeItem(key);

}

// ==========================
// فحص تسجيل الدخول
// ==========================

function isLoggedIn(){

    return localStorage.getItem("user") !== null;

}

// ==========================
// تحميل المستخدم
// ==========================

function loadUser(){

    currentUser = getData("user");

}

// ==========================
// عند تشغيل الموقع
// ==========================

window.onload=function(){

    console.log(APP_NAME);

    console.log(APP_VERSION);

    loadUser();

};
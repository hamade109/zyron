// ===============================
// Zyron - Notifications
// ===============================

const notificationList =
document.querySelector("ul");

// ===============================
// تحميل الإشعارات
// ===============================

let notifications =
JSON.parse(localStorage.getItem("notifications")) || [];

// ===============================
// عرض الإشعارات
// ===============================

function loadNotifications(){

if(!notificationList){

return;

}

notificationList.innerHTML="";

if(notifications.length===0){

notificationList.innerHTML=

"<li>لا توجد إشعارات جديدة.</li>";

return;

}

notifications.forEach(function(notification){

const item =
document.createElement("li");

item.innerHTML=`

<strong>${notification.title}</strong>

<br>

<span>${notification.message}</span>

<br>

<small>${notification.time}</small>

`;

notificationList.appendChild(item);

});

}

// ===============================
// إضافة إشعار
// ===============================

function addNotification(title,message){

const notification={

id:Date.now(),

title:title,

message:message,

time:new Date().toLocaleString(),

read:false

};

notifications.unshift(notification);

saveNotifications();

}

// ===============================
// حفظ الإشعارات
// ===============================

function saveNotifications(){

localStorage.setItem(

"notifications",

JSON.stringify(notifications)

);

loadNotifications();

}

// ===============================
// حذف إشعار
// ===============================

function deleteNotification(id){

notifications=

notifications.filter(function(notification){

return notification.id!==id;

});

saveNotifications();

}

// ===============================
// حذف جميع الإشعارات
// ===============================

function clearNotifications(){

if(confirm("هل تريد حذف جميع الإشعارات؟")){

notifications=[];

saveNotifications();

}

}

// ===============================
// تعليم الكل كمقروء
// ===============================

function markAllAsRead(){

notifications.forEach(function(notification){

notification.read=true;

});

saveNotifications();

}

// ===============================
// عدد الإشعارات
// ===============================

function getUnreadCount(){

let count=0;

notifications.forEach(function(notification){

if(!notification.read){

count++;

}

});

return count;

}

// ===============================
// عند تشغيل الصفحة
// ===============================

window.onload=function(){

loadNotifications();

console.log("Notifications Ready");

console.log(

"Unread:",

getUnreadCount()

);

};
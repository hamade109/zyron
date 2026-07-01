// ===============================
// Zyron - Messages
// ===============================

// عناصر الصفحة

const chatList =
document.getElementById("chat-list");

const messageInput =
document.querySelector("textarea");

const sendButton =
document.querySelector("button");

// ===============================
// تحميل الرسائل
// ===============================

let messages =
JSON.parse(localStorage.getItem("messages")) || [];

loadMessages();

// ===============================
// إرسال رسالة
// ===============================

sendButton.addEventListener("click",sendMessage);

// ===============================
// الضغط على Enter للإرسال
// ===============================

messageInput.addEventListener("keydown",function(event){

if(event.key==="Enter" && !event.shiftKey){

event.preventDefault();

sendMessage();

}

});

// ===============================
// إنشاء رسالة
// ===============================

function sendMessage(){

const text =
messageInput.value.trim();

if(text===""){

alert("اكتب رسالة.");

return;

}

const message={

id:Date.now(),

sender:"Me",

text:text,

time:new Date().toLocaleTimeString()

};

messages.push(message);

saveMessages();

messageInput.value="";

}

// ===============================
// عرض الرسائل
// ===============================

function loadMessages(){

chatList.innerHTML="";

if(messages.length===0){

chatList.innerHTML="<p>لا توجد رسائل.</p>";

return;

}

messages.forEach(function(message){

const box=
document.createElement("div");

box.className="message";

box.innerHTML=`

<h3>${message.sender}</h3>

<p>${message.text}</p>

<small>${message.time}</small>

`;

chatList.appendChild(box);

});

}

// ===============================
// حذف رسالة
// ===============================

function deleteMessage(id){

messages=

messages.filter(function(message){

return message.id!==id;

});

saveMessages();

}

// ===============================
// حفظ الرسائل
// ===============================

function saveMessages(){

localStorage.setItem(

"messages",

JSON.stringify(messages)

);

loadMessages();

}

// ===============================
// حذف جميع الرسائل
// ===============================

function clearMessages(){

if(confirm("حذف جميع الرسائل؟")){

messages=[];

saveMessages();

}

}

// ===============================
// البحث داخل الرسائل
// ===============================

function searchMessages(word){

const result=

messages.filter(function(message){

return message.text

.toLowerCase()

.includes(word.toLowerCase());

});

console.log(result);

}

// ===============================
// عند تشغيل الصفحة
// ===============================

window.onload=function(){

loadMessages();

console.log("Messages Ready");

};
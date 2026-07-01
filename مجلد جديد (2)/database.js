// ====================================
// Zyron Database
// ====================================

const users = [];

const posts = [];

const comments = [];

const likes = [];

const followers = [];

const messages = [];

const notifications = [];

const stories = [];

const reels = [];

const channels = [];

const groups = [];

// ====================================
// Users
// ====================================

function addUser(user){

users.push(user);

}

function getUsers(){

return users;

}

function findUser(username){

return users.find(

user=>user.username===username

);

}

// ====================================
// Posts
// ====================================

function addPost(post){

posts.push(post);

}

function getPosts(){

return posts;

}

function deletePost(id){

const index=

posts.findIndex(

post=>post.id===id

);

if(index!==-1){

posts.splice(index,1);

}

}

// ====================================
// Messages
// ====================================

function addMessage(message){

messages.push(message);

}

function getMessages(){

return messages;

}

// ====================================
// Notifications
// ====================================

function addNotification(notification){

notifications.push(notification);

}

function getNotifications(){

return notifications;

}

// ====================================
// Followers
// ====================================

function addFollower(follower){

followers.push(follower);

}

function getFollowers(){

return followers;

}

// ====================================
// Export
// ====================================

module.exports={

users,

posts,

comments,

likes,

followers,

messages,

notifications,

stories,

reels,

channels,

groups,

addUser,

getUsers,

findUser,

addPost,

getPosts,

deletePost,

addMessage,

getMessages,

addNotification,

getNotifications,

addFollower,

getFollowers

};
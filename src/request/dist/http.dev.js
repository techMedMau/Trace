"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventWithinGet = exports.eventGet = exports.eventDelete = exports.eventEdit = exports.eventAdd = exports.groupMemberEdit = exports.groupMemberGet = exports.groupMemberAdd = exports.groupEdit = exports.groupDelete = exports.groupAdd = exports.groupWithinGet = exports.groupGet = exports.friendGet = exports.friendDelete = exports.friendAdd = exports.photoTest = exports.login = exports.registration = exports.blogTextCreate = exports.blogTextGet = exports.tripCreate = exports.tripGet = exports.photosGet = exports.albumGet = exports.albumDelete = exports.albumUpdate = exports.albumCreate = void 0;

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Album前面會要/嗎？
// int FounderId, int Time, string Location, int GroupId, int TripId, int AlbumName, 傳什麼型態 Longitude, 傳什麼型態 Latitute
var albumCreate = function albumCreate(userID, time, location, groupID, tripID, albumName, lng, lat) {
  return (0, _api["default"])("post", "/Album", (userID, time, location, groupID, tripID, albumName, lng, lat));
}; //int FounderId, int Time, string Location, [FromQuery] 可修改的欄位????, int TripId, int GroupId, int AlbumName, 傳什麼型態 Longitude, 傳什麼型態 Latitute


exports.albumCreate = albumCreate;

var albumUpdate = function albumUpdate(userID, time, location, fromQuery, tripID, groupID, albumName, lng, lat) {
  return (0, _api["default"])("put", "/Album/{FounderId, int Time, string Location}", (userID, time, location, fromQuery, tripID, groupID, albumName, lng, lat));
}; //int FounderId, int Time, string Location


exports.albumUpdate = albumUpdate;

var albumDelete = function albumDelete(userID, time, location) {
  return (0, _api["default"])("delete", "/Album/{FounderId, int Time, string Location}", (userID, time, location));
};

exports.albumDelete = albumDelete;

var albumGet = function albumGet(userID, time, location) {
  return (0, _api["default"])("get", "/Album?Founder={FounderId}&Time={Time}& Location={Location}");
}; //取得一個相簿裡的所有照片


exports.albumGet = albumGet;

var photosGet = function photosGet(albumID) {
  return (0, _api["default"])("get", "/Album/".concat(albumID));
};

exports.photosGet = photosGet;

var tripGet = function tripGet(userID) {
  return (0, _api["default"])("get", "/TripEvent/".concat(userID));
};

exports.tripGet = tripGet;

var tripCreate = function tripCreate(tripContent) {
  return (0, _api["default"])("post", "/Tripevent", tripContent);
};

exports.tripCreate = tripCreate;

var blogTextGet = function blogTextGet(ftlID) {
  return (0, _api["default"])("get", "/Article/".concat(ftlID));
}; //新增文字


exports.blogTextGet = blogTextGet;

var blogTextCreate = function blogTextCreate(blogContent) {
  return (0, _api["default"])("post", "/Article", blogContent);
};

exports.blogTextCreate = blogTextCreate;

var registration = function registration(userData) {
  return (0, _api["default"])("post", "/User", userData);
};

exports.registration = registration;

var login = function login(userData) {
  return (0, _api["default"])("post", "/User/Login", userData);
};

exports.login = login;

var photoTest = function photoTest(photo) {
  return (0, _api["default"])("post", "/Test", photo);
};

exports.photoTest = photoTest;

var friendAdd = function friendAdd(friendData) {
  return (0, _api["default"])("post", "/User/FriendList", friendData);
};

exports.friendAdd = friendAdd;

var friendDelete = function friendDelete(friendData) {
  return (0, _api["default"])("delete", "/User/FriendList", friendData);
};

exports.friendDelete = friendDelete;

var friendGet = function friendGet(userID) {
  return (0, _api["default"])("get", "/User/".concat(userID));
};

exports.friendGet = friendGet;

var groupGet = function groupGet(userID) {
  return (0, _api["default"])("get", "/Group/".concat(userID));
};

exports.groupGet = groupGet;

var groupWithinGet = function groupWithinGet(userID) {
  return (0, _api["default"])("get", "/Group/Shared/".concat(userID));
};

exports.groupWithinGet = groupWithinGet;

var groupAdd = function groupAdd(groupData) {
  return (0, _api["default"])("post", "/Group", groupData);
};

exports.groupAdd = groupAdd;

var groupDelete = function groupDelete(groupData) {
  return (0, _api["default"])("delete", '/Group', groupData);
};

exports.groupDelete = groupDelete;

var groupEdit = function groupEdit(groupData) {
  return (0, _api["default"])("put", '/Group', groupData);
};

exports.groupEdit = groupEdit;

var groupMemberAdd = function groupMemberAdd(groupData) {
  return (0, _api["default"])("post", "/Group/GroupMember", groupData);
};

exports.groupMemberAdd = groupMemberAdd;

var groupMemberGet = function groupMemberGet(groupID) {
  return (0, _api["default"])("get", "/Group/GroupMember/".concat(groupID));
};

exports.groupMemberGet = groupMemberGet;

var groupMemberEdit = function groupMemberEdit(groupData) {
  return (0, _api["default"])('put', '/Group/GroupMember', groupData);
};

exports.groupMemberEdit = groupMemberEdit;

var eventAdd = function eventAdd(eventData) {
  return (0, _api["default"])("post", "/TripEvent", eventData);
};

exports.eventAdd = eventAdd;

var eventEdit = function eventEdit(eventData) {
  return (0, _api["default"])("put", "/TripEvent", eventData);
};

exports.eventEdit = eventEdit;

var eventDelete = function eventDelete(eventData) {
  return (0, _api["default"])("delete", "/TripEvent", eventData);
};

exports.eventDelete = eventDelete;

var eventGet = function eventGet(userID) {
  return (0, _api["default"])("get", "/TripEvent/".concat(userID));
};

exports.eventGet = eventGet;

var eventWithinGet = function eventWithinGet(userID) {
  return (0, _api["default"])("get", "/TripEvent/Shared/".concat(userID));
}; // 在要用api的vue元件內
// import { userLogIn } from "./user";
// userLogIn()
//   .then(res => {
//     console.log("登入成功");
//   })
//   .catch(error => {
//     // response攔截器會先執行，除非你漏接了，才會進到catch
//   })


exports.eventWithinGet = eventWithinGet;
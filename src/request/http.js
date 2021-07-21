import req from "./api";

//會員10-取得會員資料
export const userInfoGet = (userID) => {return req('get', `/User/UserInfo/${userID}` )}
//會員8-修改會員資料
export const userInfoEdit = (infoData) => {return req("put", "/User", infoData) }


//通知2-取得通知
export const notifyGet = (userID) =>{ return req('get', `/User/Notify/${userID}`)}
//通知3-回覆好友邀請通知
export const replyFriend = (replyData) => { return req('put', '/User/Notify/FriendRequest',replyData)}
export const replyEvent = (replyData) => { return req('put', '/User/Notify/EventRequest',replyData)}

//文章圖片2-新增一篇文章
export const blogTextPost = (textData) => {return req("post", "/Content/Article", textData) }
//文章圖片4-修改文章
export const blogTextEdit = (textData) => {return req("put", "/Content/Article", textData) }
//文章圖片5-新增圖片 在blog_edit裡
//文章圖片6-刪除圖片
export const photoDelete = (photoID) => { return req('delete', '/Content/Photo', photoID)}
//文章圖片8-取得一個spot下所有紀錄 在blog created 
//文章圖片9-取得自己的文章紀錄
export const oldRecordGet = (ftlID) => {return req('get', `/Content/Edit/${ftlID}` )}
//文章圖片5/文章圖片7
export const blogTextDelete = (ftlID)=>{  return req('delete', '/Content/Article', ftlID)}
export const photosDelete = (ftlID) => { return req('delete', '/Content/Photos', ftlID)}

//取得ftlID
export const ftlIDGet = (ftlIDData) => {return req("post", "/Unique", ftlIDData)}

//取得一個相簿裡的所有照片
export const photosGet = (albumID) => { return req("get", `/Album/${albumID}`) }


export const tripGet = (userID) => { return req("get", `/TripEvent/${userID}`) }
export const tripCreate = (tripContent) => { return req("post", "/Tripevent", tripContent) }

export const blogTextGet = (ftlID) => { return req("get", `/Article/${ftlID}`) }
//新增文字
// export const blogTextCreate = (blogContent) => { return req("post", "/Article", blogContent) }

export const registration = (userData) => { return req("post", "/User", userData) }
export const login = (userData) => { return req("post", "/User/Login", userData) }

export const photoTest = (photo) => { return req("post", "/Test", photo) }

export const friendAdd = (friendData) => { return req("post", "/User/FriendList", friendData) }
export const friendDelete = (friendData) => { return req("delete", "/User/FriendList", friendData) }


export const friendGet = (userID) => { return req("get", `/User/${userID}`) }

export const groupGet = (userID) => { return req("get", `/Group/${userID}`) }
export const groupWithinGet = (userID) => { return req("get", `/Group/Shared/${userID}`) }
export const groupAdd = (groupData) => { return req("post", "/Group", groupData) }
//群組4-刪除群組
export const groupDelete = (groupData) => { return req("delete", '/Group', groupData) }
export const groupEdit = (groupData) => { return req("put", '/Group', groupData) }

export const groupMemberAdd = (groupData) => { return req("post", "/Group/GroupMember", groupData) }
export const groupMemberGet = (groupID) => { return req("get", `/Group/GroupMember/${groupID}`) }
export const groupMemberEdit = (groupData) => {return req('put', '/Group/GroupMember', groupData)}

export const eventAdd = (eventData) => {return req("post", "/TripEvent", eventData)}
export const eventEdit = (eventData) => {return req("put", "/TripEvent", eventData)}
//旅遊事件5-刪除旅遊事件
export const eventDelete = (eventData) => {return req("delete", "/TripEvent", eventData)}

export const eventWithinGet = (userID) => {return req("get", `/TripEvent/Shared/${userID}`)}

export const scheduleGet = (tripId) => {return req("get", `/TripEvent/Schedules/${tripId}`)}
export const firstDayUpdate = (firstDayData) => { return req ("put", '/Schedule/ChangeFirstDay', firstDayData)}
export const deleteDay = (dayData) => {return req("delete", '/Schedule/Schedule/date', dayData)}

//取得新增刪除修改一個地點
export const scheduleAdd = (scheduleData) => {return req("post", '/Schedule', scheduleData)}
export const spotsGet = (spotData) => {return req("get", `/TripEvent/Schedules${spotData}`)}
export const spotDelete = (spotID) => {return req("delete", '/Schedule', spotID)}
export const spotUpdate = (spotData) => {return req("put", '/Schedule', spotData)}


export const eventGet = (tripID) => {return req("get", `/TripEvent/${tripID}`)}



// 在要用api的vue元件內
// import { userLogIn } from "./user";

// userLogIn()
//   .then(res => {
//     console.log("登入成功");
//   })
//   .catch(error => {
//     // response攔截器會先執行，除非你漏接了，才會進到catch
//   })
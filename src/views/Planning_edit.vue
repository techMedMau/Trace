<template>
  <div>
    <Header v-if="tripInfo.tripId" :tripID="tripInfo.tripId" />

    <div class="container mx-auto">
    
<div class="testClass">
      <div class="friendList list">
        <!-- 帶好友資料 -->
        <!-- 創建者 -->
        <Friend
          :name="founderInfo.userName"
          :id="founderInfo.userId"
          :image="founderInfo.userPhotoPath"
          :editable="false"
          :isFounder="true"
        />
        <div class="line"></div>
        <!-- 好友 -->
        <Friend
          v-for="(friend, index) in friendList"
          :key="index"
          :name="friend.memberName"
          :id="friend.memberId"
          :image="friend.memberPhoto"
          :editable="showingOpt"
          :index="index"
          @friendChosed="friendChosed"
        />

        <div class="addFriend_btn" @click="chooseFriend">➕</div>
        <div v-show="showingOpt" class="table_choose">
          <div
            class="friendOption"
            v-for="friend in friendChooseList"
            :key="friend.userId"
          >
            <img
              class="friendOptionImg"
              :src="`${api}${friend.friendImage}`"
              alt="'好友頭貼'"
              :key="friend.userId"
              :onerror="defaultImg"
            />
            <li
              class="friendOptname"
              @click="
                choose(friend.friendId, friend.friendName, friend.friendImage)
              "
            >
              {{ friend.friendName }}
            </li>
          </div>
        </div>
        
      </div>
      </div>

      <div class="btns">
        <button type="button" @click="addDays" class="button_reset">
          <span class="material-icons">dashboard_customize</span>
          <small class="notice">新增天數</small>
        </button>

      
          <button type="button" @click="edit" class="button_reset">
            <span class="material-icons">mode</span>
            <small class="notice">編輯行程</small>
          </button>

          <button type="button" @click="confirm" class="button_reset">
            <span class="material-icons">done</span>
            <small class="notice">確認</small>
          </button>
    
      </div>
      <div class="testClass">
        <div class="dayList list">
          <!--    startDate(int)+index就可以推算出日期 -->

          <Container
            v-for="(item, index) in schedules"
            :inputValue.sync="inputValue"
            :key="item.id"
            :date="item.time"
            :index="index"
            :dataList="item.dataList"
            :editable="isEditing"
            @deleteDate="deleteDate"
          />
          <!-- :reRender="needRefresh" -->
        </div>
      </div>
      <!-- <button @click="addDays">新增天數</button> -->
      <!-- <button class="edit" @click="edit">編輯</button> -->
      <!-- <button class="confirm" @click="confirm">確認</button> -->
    </div>
    <button class="deleteEvent"  v-if="founderInfo.userId === parseInt(this.$store.state.userID)" type="button" @click="showWarning=true;">
      刪除旅遊事件
    </button>
    <!--   -->
    <div v-if="showWarning" class="warning">
      <div class="warning_inside">
      <p class="deleteEvent_title">
      確定完全刪除此行程規劃？
      </p>
      <div class="deleteEvent_btns">
      <button 
      class="deleteEvent_btn"
      type="button" @click="showWarning=false;">
      取消
    </button>
      <button
      class="deleteEvent_btn"
      type="button"
      @click="deleteEventPost">
      確定
    </button>
    </div>
    </div>
    </div>
    

    <!-- <button @click="test">edit測試按鈕</button> -->
  </div>
</template>


<script>
import Friend from "@/components/FriendOpt";
import Container from "@/components/Planning_day";
// import draggable from "vuedraggable";
import Spot from "@/components/Planning_spot";
import Header from "@/components/Header";
import {
  scheduleGet,
  eventGet,
  groupMemberGet,
  friendGet,
  groupMemberEdit,
  userInfoGet,
  groupDelete,
  eventDelete,
} from "@/request/http.js";

export default {
  components: { Container, Spot, Header, Friend },
  data() {
    return {
      defaultImg: 'this.src="' + require("@/assets/a.jpg") + '"',
      api: "http://34.80.22.91/",
      showWarning: false,
      //編輯好友相關boolean
      showingOpt: false,
      //側邊按鈕列
      showNav: false,
      friendList: [], //這個旅遊事件下的好友名單
      friendChooseList: [], //
      readOnly: false,
      //   days: 0,
      isEditing: true,
      tripInfo: [],
      schedules: [], //學長整理好的資料
      inputValue: "",
      id: -1,
      founderInfo: [], //創建者資訊
    };
  },
  watch: {
    inputValue() {
      this.schedules.forEach((item, index) => {
        item.time = this.transition(this.inputValue, index);
        // console.log(item.time);
      });
    },
    showingOpt() {
      this.groupMemberEditPost();
    },
  },
  methods: {

    deleteEventPost() {
      eventDelete({ id: this.tripInfo.tripId })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((er) => {
          console.log(err.response);
        });
      groupDelete({ id: this.tripInfo.groupId })
        .then((res) => {
          // console.log(res);
        })
        .catch((er) => {
          console.log(err.response);
        });
      //回首頁
      localStorage.removeItem("tripName");
      localStorage.removeItem("trip");
      localStorage.removeItem("end");
      localStorage.removeItem("start");
      this.$router.push("/map");
    },
    groupMemberEditPost() {
      if (this.showingOpt === false) {
        let arr = [];
        for (var i = 0; i < this.friendList.length; i++) {
          arr.push(this.friendList[i].memberId);
        }
        const obj = {
          groupId: this.tripInfo.groupId,
          memberIdList: arr,
        };
        groupMemberEdit(obj)
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
      //   console.log(arr);
    },
    //被選中要刪除的好友處裡
    friendChosed(index) {
      this.friendList.splice(index, 1);
      //   console.log(this.friendList)
    },
    //編輯好友
    choose(id, name, photo) {
      let exit = false;
      const newFriend = {
        memberAccount: "fake",
        memberId: id,
        memberName: name,
        memberPhoto: photo,
      };
      // console.log(newFriend);
      for (var i = 0; i < this.friendList.length; i++) {
        if (this.friendList[i].memberId === id) {
          return (exit = true);
        }
      }
      if (exit) {
        return;
      }
      this.friendList.push(newFriend);
      // console.log(this.friendList)
    },
    //列出好友名單ul li
    chooseFriend() {
      friendGet(this.$store.state.userID)
        .then((res) => {
          this.friendChooseList = res.data;
          // console.log("!!");
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
      this.showingOpt = !this.showingOpt;
    },

    // @param {Number} removeIndex
    deleteDate(removeIndex) {
      this.schedules.splice(removeIndex, 1);
      // console.log(this.schedules.length);
      this.schedules.forEach((item, index, array) => {
        item.time = this.transition(array[0].time, index);
      });
    },
    //日期轉換
    transition(time, index) {
      const oneDay = 1000 * 60 * 60 * 24;
      const temp = new Date(Date.parse(time) + index * oneDay);
      const year = temp.getFullYear();
      const month =
        temp.getMonth() < 9 ? `0${temp.getMonth() + 1}` : temp.getMonth() + 1;
      const date = temp.getDate() < 10 ? `0${temp.getDate()}` : temp.getDate();
      return [year, month, date].join("-");
    },
    // test() {
    //   const tempStart = Date.parse(localStorage.getItem("start"));
    //   const tempEnd = Date.parse(localStorage.getItem("end"));
    //   const days = (tempEnd - tempStart) / (1000 * 60 * 60 * 24);
    //   // console.log(this.schedules);
    // },
    addDays() {
      const tempID = this.schedules[this.schedules.length-1].id+1;
      let obj = {
        time: undefined,
        id: tempID,
        dataList: [],
      };
      this.schedules.push(obj);
      this.schedules.forEach((item, index, array) => {
        item.time = this.transition(array[0].time, index);
      });
      // console.log(this.schedules)
    },
    edit() {
      this.isEditing = true;
    },
    confirm() {
      this.readOnly = true;
      this.isEditing = false;
    },
  },
  created() {
    
    //取得旅遊事件資訊
    eventGet(localStorage.getItem("trip"))
      .then((res) => {
        this.tripInfo = res.data;
        // console.log(this.tri

        if (res.request.status === 200) {
          //取得此旅遊事件下的所有參與人
          groupMemberGet(this.tripInfo.groupId)
            .then((res) => {
              this.friendList = res.data;
              //   console.log(this.friendList);
            })
            .catch((err) => {
              console.log(err.response)
              // if (err.response.status === 404) {
              //   console.log("沒有成員資料");
              // }
            });
          userInfoGet(this.tripInfo.founderId)
            .then((res) => {
              this.founderInfo = res.data;
              // console.log(this.founderInfo);
              //   console.log(this.friendList);
            })
            .catch((err) => {
              console.log(err.response);
            });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });

    //取得地點資訊
    scheduleGet(localStorage.getItem("trip")) //tripId!!!!
      .then((res) => {
        let scheduleOriginList = res.data;
        if (!scheduleOriginList.length) {
          return;
        }
        // console.log("未整理");
        // console.log(scheduleOriginList);
        let dateList = [];
        let keys = [
          ...new Set(scheduleOriginList.map((item) => item.time.slice(0, 10))),
        ];
        keys.forEach((key) => {
          const newObject = {
            time: key,
            id: (this.id += 1),
            dataList: scheduleOriginList
              .filter((item) => item.time.slice(0, 10) === key)
              .map((item) => ({ ...item, time: undefined })),
          };
          dateList.push(newObject);
        });
        this.schedules = dateList.map((item, index) => ({
          ...item,
          time: this.transition(keys[0], index),
        }));
        // console.log(this.schedules);
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response.status === 404) {
          console.log(err.response);
          if (localStorage.getItem("end") !== "") {
            //做很多個假schedule
            function makeDate(time, index) {
              const oneDay = 1000 * 60 * 60 * 24;
              const temp = new Date(Date.parse(time) + index * oneDay);
              const year = temp.getFullYear();
              const month =
                temp.getMonth() < 9
                  ? `0${temp.getMonth() + 1}`
                  : temp.getMonth() + 1;
              const date =
                temp.getDate() < 10 ? `0${temp.getDate()}` : temp.getDate();
              return [year, month, date].join("-");
            }
            const tempStart = Date.parse(localStorage.getItem("start"));
            const tempEnd = Date.parse(localStorage.getItem("end"));
            const days = (tempEnd - tempStart) / (1000 * 60 * 60 * 24);
            let fakeSchedules = [];
            let n = 0;
            for (var i = 0; i <= days; i++) {
              let fakeData = {
                dataList: [],
                id: n++,
                time: makeDate(localStorage.getItem("start"), i),
              };
              fakeSchedules.push(fakeData);
            }
            this.schedules = fakeSchedules;
            // console.log(fakeSchedules)
            return;
          }
          //做一個假的schedule
          const fakeSchedule = {
            dataList: [],
            id: 0,
            time: localStorage.getItem("start"),
          };
          this.schedules.push(fakeSchedule);
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 120px;
  width: 960px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.display {
  display: flex;
}

.list {
  display: inline-flex;
  // overflow-y:hidden;

  //   ju
}

.dayList {
  // box-sizing: border-box;
  margin-top: 1rem;
}

.testClass {
  text-align: center;
  overflow-x: auto;
  &::-webkit-scrollbar-button {
    display:none;
  }
  // display:flex;
  // justify-content:center
}

.line {
  border-left: 1px solid #000;
  margin: 0.7rem;
}

.friendList {
  margin: 1rem;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.addFriend_btn {
  margin: 13px 0 0 1rem;
  height: max-content;
  padding: 1rem;
  border-radius: 50%;
  background-color: #ddd;
  &:hover {
    opacity: 0.5;
  }
}

.friendOption {
  position: relative;
  display: flex;
  flex-direction: column;
  width: max-content;
  &:hover > .friendOptname {
    display: flex;
  }
}
.friendOptionImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0.5rem;
}

.friendOptname {
  position: absolute;
  font-size: 12px;
  padding: 3px 0.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  border: 1px solid #000;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table_choose {
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  position: absolute;
  width: 300px;
  padding: 0.5rem 1rem;
  background-color: #ddd;
  overflow-x: scroll;
  display: flex;
&::-webkit-scrollbar-button {
    display:none;
  }
}

.new_spot {
  background-color: #ddd;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

// .nav_bar {
//   top: 200px;
//   position: fixed;
//   right: 0;
// }

// .btn_nav {
//   border: none;
//   border-radius: 3px;
//   padding: 1rem 0.5rem;
// }

// .nav_list {
//   background-color: #ddd;
//   width: 70px;
// }

.btns {
  display: flex;
  justify-content: flex-end;
}

.btns_right {
  display: flex;
  //  justify-content: flex-end;
}

.button_reset {
  border: none;
  background-color: transparent;
  position: relative;
  &:hover > .notice {
    display: block;
    width: max-content;
    left: .5rem;
    top: -1rem;
    position: absolute;
  }
}
.notice {
  display: none;
}


.deleteEvent{
   text-decoration: none;
  color: #000;
  border:1px solid #000;
  border-radius: 3px;
   padding:.5rem;
   margin-left:.5rem;
  margin-bottom:.5rem;
  background-color: transparent;
  bottom:3rem;

}

.warning{
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  position: absolute;
  width: max-content;
  padding: .7rem;
  background-color: #000;
  color:#fff;
}

.warning_inside{
  border-radius: 3px;
  border:1px solid #fff;
  padding:.7rem;
}
.deleteEvent_title{
  margin:0;
}
.deleteEvent_btns{
    text-align: center;
}

.deleteEvent_btn {
  
  display: inline;
  border:1px solid transparent;
  background: transparent;
  color:#fff;
  margin-top:.7rem;
  &:hover{
    border-color:#fff;
     border-radius: 3px;
  }
}

/* <1024 */
// @media screen and (max-width: 1024px) {
  
// } 

/* <768 */
 @media screen and (max-width: 960px) and (min-width: 780px) {
  .container{
    width: 700px;
  }
} 

@media screen and (max-width: 780px) and (min-width: 480px) {
  .container{
    width: 400px;
  }
} 

/* 320~480 */
@media screen and (max-width: 480px) and (min-width: 320px) {

.container{
    width: 300px;
  }

}

</style>
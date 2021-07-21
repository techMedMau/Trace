<template>
  <div>
    <header>
      <Header v-if="tripInfo.tripId" :tripID="tripInfo.tripId" />
    </header>

    <div class="container mx-auto">
      <div class="blog_btns">
        <button type="button" @click="isBrowsing = true" class="btn_reset">
          <span class="material-icons">visibility</span>
          <small class="notice">瀏覽</small>
        </button>
        <button
          v-if="status === '新增'"
          type="button"
          @click.stop="ftlIDPost"
          class="btn_reset"
        >
          <span class="material-icons">post_add</span>
          <small class="notice">新增</small>
        </button>
        <button
          v-if="status === '編輯'"
          type="button"
          @click.stop="ftlIDPost"
          class="btn_reset"
        >
          <span class="material-icons">mode</span>
          <small class="notice">編輯</small>
        </button>
      </div>
      <!-- 好友列 -->
      <div v-if="friendList.length" class="nav_bar">
        <button type="button" class="btn_nav" @click="showGroup = !showGroup">
          <i class="fas fa-angle-left"></i><i class="fas fa-angle-left"></i>
        </button>
        <div v-if="showGroup" class="nav_list">
          <template v-for="friend in friendList">
            <div class="img_inner" :key="friend.memberId">
              <img
                :src="`${api}${friend.memberPhoto}`"
                alt="friendAvator"
                class="img_resp"
                :onerror="defaultImg"
              />
            </div>
          </template>
        </div>
      </div>
      <!-- 行程列 -->
      <div class="flex">
        <aside class="aside">
          <Aside
            :schedules="schedules"
            @getSpotID="getSpotID"
            :isBrowsing="isBrowsing"
          />
        </aside>
        <!-- 瀏覽 -->
        <article v-if="isBrowsing" class="articles">
          <template v-if="records">
            <template>
              <Article
                v-for="record in records"
                :key="record.ftlId"
                :info="record"
              />
            </template>
          </template>
        </article>
        <!-- 編輯 -->
        <article v-else class="articles">
          <EditCard
            v-if="mine"
            :ftlID="ftlID"
            :mine="mine"
            :isExisted="isExisted"
            :hasArticle="articleExisted"
            @deleteMine="deleteMine"
            @updateText="updateText"
            @createText="createText"
            @deletePhoto="deletePhoto"
          />
        </article>
      </div>
    </div>
    <!-- <button @click="test">測試</button> -->
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import Aside from "@/components/Blogaside";
import Article from "@/components/Blogcard";
import EditCard from "@/components/Blog_edit";
import Friend from "@/components/FriendOpt";
import {
  eventGet,
  scheduleGet,
  groupMemberGet,
  ftlIDGet,
} from "@/request/http.js";
export default {
  name: "blog_text",
  components: { Header, Aside, Article, EditCard, Friend },
  data() {
    return {
      defaultImg: 'this.src="' + require("@/assets/a.jpg") + '"',
      api: "http://34.80.22.91/",
      ftlID: "",
      isExisted: undefined,
      articleExisted: undefined,
      isBrowsing: true,
      id: -1,
      schedules: [], //sideBar date/location
      friendList: [], //這次旅遊事件下的所有參與人
      tripInfo: [], //這個旅遊事件的資料
      spotArr: undefined, //想看的點的id => 用來抓紀錄
      records: [], //所有文章
      showGroup: false,
      mine: [], //自己的文章
      mineIndex: 0, //自己文章在records裡的位置
      status: null,
    };
  },
  watch: {
    isBrowsing() {
      // console.log(this.isBrowsing)
    },
    // ftlID(now,before){
    //   console.log(now)
    // }
  },
  created() {
    //取得旅遊事件資訊 => 為了拿到groupID
    eventGet(localStorage.getItem("trip"))
      .then((res) => {
        this.tripInfo = res.data;
        // console.log(this.tripInfo);
        if (res.request.status === 200) {
          //取得旅遊事件下群組成員 => 群組條
          groupMemberGet(this.tripInfo.groupId)
            .then((res) => {
              this.friendList = res.data;
              // console.log(this.friendList);
            })
            .catch((err) => {
              console.log(err.response);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //取得地點資訊 aside
    scheduleGet(localStorage.getItem("trip")) //tripId!!!!
      .then((res) => {
        let scheduleOriginList = res.data;
        // console.log(scheduleOriginList);
        let dateList = [];
        let keys = [
          ...new Set(scheduleOriginList.map((item) => item.time.slice(0, 10))),
        ];
        keys.forEach((key) => {
          let newObject = {
            time: key,
            id: (this.id += 1),
            dataList: scheduleOriginList
              .filter((item) => item.time.slice(0, 10) === key)
              .map((item) => ({ ...item, time: item.time.slice(0, 10) })),
          };
          dateList.push(newObject);
        });
        this.schedules = dateList;
      })
      .catch((err) => {
        console.log(err);
      });
    //取得旅遊事件下所有文章
    const data = {
      id: localStorage.getItem("trip"),
    };
    const vm = this;
    axios
      .get("http://34.80.22.91/api/Content/AllContent", {
        params: data,
      })
      .then(function (res) {
        vm.records = res.data;
        // console.log("所有文章");
        // console.log(vm.records);
      })
      .catch(function (err) {
        console.log(err.response);
        if (err.response.status === 404) {
        }
        vm.$toast.show("還沒有任何札記紀錄喔！");
      });
  },
  methods: {
    test() {
      console.log(this.mine);
    },
    deletePhoto(index) {
      // this.records
    },
    createText(title, content, author, src, photos) {
      for (var i = 0; i < photos.length; i++) {
        if (photos[i] === undefined) {
          photos.splice(i, 1);
        }
      }
      const newObj = {
        ftlId: null,
        articleContent: content,
        title: title,
        photoPath: photos,
        user: {
          userName: author,
          userImage: src,
          userId: null,
        },
      };
      this.records.unshift(newObj);
      this.status = "編輯";
      console.log("status");
      console.log(this.status);
      this.isBrowsing = true;
      // console.log('photos')
      // console.log(photos)
    },
    updateText(title, content, photos) {
      this.records[this.mineIndex].title = title;
      this.records[this.mineIndex].articleContent = content;
      this.records[this.mineIndex].photoPath = photos;

      this.isBrowsing = true;
    },
    deleteMine() {
      // console.log('emit')
      // console.log(this.mineIndex)
      // console.log(this.records)
      this.records.splice(this.mineIndex, 1);
      // console.log(this.records);
      this.status = "新增";
      this.mine = [];
      this.isBrowsing = true;
    },
    // reload(){

    //   this.getSpotID(this.spotArr)
    //   this.isBrowsing = true;
    // },
    ftlIDPost() {
      // this.isBrowsing = true
      const ftlIDData = {
        tripId: parseInt(localStorage.getItem("trip")),
        userId: parseInt(this.$store.state.userID),
        time: this.spotArr[0],
        location: this.spotArr[1],
        longitude: this.spotArr[3],
        latitude: this.spotArr[2],
      };
      // console.log("拿到ftlID");
      // console.log(ftlIDData);
      ftlIDGet(ftlIDData)
        .then((res) => {
          // console.log('ftlID')
          // console.log(res.data);
          if (res.status === 200) {
            this.isBrowsing = false;
            this.ftlID = res.data.ftlId;
            this.isExisted = res.data.ftlIdIsExisted;
            this.articleExisted = res.data.articleIsExisted;
          }
        })
        .catch((err) => {
          console.log(errr.response);
        });
    },
    getSpotID(arr, id) {
      //取得一個spot下的所有旅遊紀錄
      // if(!this.isBrowsing){
      //   return
      // }
      // console.log("------------")
      // console.log(arr)
      // console.log(arr);
      let vm = this;
      this.spotArr = arr;
      const sendData = {
        TripId: localStorage.getItem("trip"),
        time: arr[0],
        location: arr[1],
      };
      // console.log(sendData);

      axios
        .get("http://34.80.22.91/api/Content", { params: sendData })
        .then(function (res) {
          // console.log(res);
          vm.records = res.data;
          vm.status = "編輯";
          // console.log("------------");
          // console.log(res.data)
          // console.log(vm.records);
          vm.mine = [];
          // vm.records.splice(0, vm.records.length);
          for (var i = 0; i < vm.records.length; i++) {
            if (
              vm.records[i].user.userId === parseInt(vm.$store.state.userID)
            ) {
              vm.mine.push(vm.records[i]);
              vm.mineIndex = i;
              break;
            }
          }
          // console.log('!!!!!!!')
          // console.log(vm.mine)

          // console.log(vm.mine);
        })
        .catch(function (err) {
          // console.log('!')
          console.log(err.response);
          if (err.response.status === 404) {
            //  alert('還沒有新增內容')
            vm.status = "新增";
            vm.records.splice(0, vm.records.length);
            vm.mine = [
              {
                title: "",
                articleContent: "",
                photoPath: [],
                ftlId: Number,
                user: Object,
              },
            ];
            vm.$toast.show("此地點還沒有札記紀錄");
          }
        });

      //  this.getSpotID(this.spotArr)
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 130px;
  width: 1000px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.blog_btns {
  margin-bottom: 1rem;
}

.btn_reset {
  border: none;
  background-color: transparent;
  position: relative;
  &:hover > .notice {
    display: block;
    width: max-content;
    left: 80%;
    top: -1rem;
    position: absolute;
  }
}

.notice {
  display: none;
}

.aside {
  width: 25%;
  /* 限制高度就會有scrollbar */
  /* height: 200px; */
  // overflow-y: scroll;
  /* direction: rtl; */
}

.articles {
  width: 75%;
  /* background-color: #999; */
}

/* 好友列 */
.nav_bar {
  top: 100px;
  position: fixed;
  right: 0;
  display: flex;
}

.btn_nav {
  border: none;
  border-radius: 3px;
  padding: 1.5rem 0.5rem;
}

.nav_list {
  background-color: rgb(241, 240, 240);
  width: max-content;
  display: flex;
}

.img_inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0.5rem;
  /* border: 3px solid rgb(0, 0, 0); */
}

.img_resp {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

/* <1024 */
@media screen and (max-width: 1000px) and (min-width: 768px) {
  .container {
    width: 700px;
  }
}

/* <768 */
@media screen and (max-width: 768px) and (min-width: 480px) {
  .container {
    width: 480px;
  }
  .articles {
    width: 70%;
  }
}

/* 320~480 */
@media screen and (max-width: 480px) and (min-width: 320px) {
  .container {
    width: 300px;
  }
  .articles {
    width: 65%;
  }
}
</style>
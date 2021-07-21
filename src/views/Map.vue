<template>
  <div>
    <l-map
      id="myMap"
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="opts"
      style="height: 100vh"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        :options="{ noWrap: true }"
      />

      <!-- 右上 -->
      <l-control position="topright" :disableScrollPropagation="scroll">
        <div class="topright">
          <div class="notify">
            <button type="button" class="notify_bell" @click="checkNotify">
              <span class="material-icons">notifications</span>
            </button>
            <!-- 通知框 -->
            <!-- -->
            <div v-if="showNotify" class="notify_list">
              <div class="notify_list_inside">
                <ul class="notify_ul">
                  <li v-for="item in notifyFriend" :key="item.userId">
                    <p>
                      {{ item.userName }} <small>@{{ item.userAccount }}</small>
                    </p>

                    <p class="notify_message">對你送出好友邀請</p>
                    <div class="notify_btns">
                      <button
                        type="button"
                        class="notify_btn"
                        @click="friendRequest(item.userId, false)"
                      >
                        拒絕
                      </button>
                      <button
                        type="button"
                        class="notify_btn"
                        @click="friendRequest(item.userId, true)"
                      >
                        接受
                      </button>
                    </div>
                  </li>
                  <li v-for="item in notifyEvent" :key="item.groupId">
                    <p>
                      {{ item.notifyUserName
                      }}<small>@{{ item.notifyUserAccount }}</small>
                    </p>

                    <p class="notify_message">
                      邀請你加入 <b>{{ item.tripName }}</b> 旅程
                    </p>
                    <div class="notify_btns">
                      <button
                        type="button"
                        class="notify_btn"
                        @click="eventRequest(item.groupId, false)"
                      >
                        拒絕
                      </button>
                      <button
                        type="button"
                        class="notify_btn"
                        @click="eventRequest(item.groupId, true)"
                      >
                        接受
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--   v-if="userInfo.userPhotoPath" -->
          <div class="avatar_inner">
            <img
              :src="`${
                userInfo.userPhotoPath
                  ? `${api}${userInfo.userPhotoPath}`
                  : defaultImg
              }`"
              alt="avatar"
              class="avator_resp"
              @click="editPersonalInfo"
              :onerror="defaultImgOn"
            />
          </div>
        </div>

        <!-- 個人資訊視窗開始 -->
        <div class="personalInfo" v-show="showPersonalInfo">
          <div class="personalInfo_inside">
            <button
              type="button"
              @click="showPersonalInfo = false"
              class="personalInfo_close"
            >
              ✖️
            </button>
            <div class="center">
              <label for="file" class="space">
                <div class="img_inner" @click="induceClick">
                  <!-- <span
                    class="icon"
                    v-if="preview === null && userInfo.userPhotoPath === null"
                    >➕</span
                  > -->

                  <img
                    :class="{ editing_photo: editingInfo }"
                    v-if="preview === null"
                    :src="`${
                      userInfo.userPhotoPath
                        ? `${api}${userInfo.userPhotoPath}`
                        : defaultImg
                    }`"
                    alt=""
                    class="img_resp"
                  :onerror="defaultImgOn"
                  />
                  <img v-else :src="preview" class="img_resp" />
                </div>
                <input
                  id="input"
                  type="file"
                  accept="image/*"
                  @change="previewImage"
                  class="upload_btn"
                />
              </label>

              <p class="userAccount">@{{ userInfo.userAccount }}</p>
              <input
                type="text"
                class="input_info"
                style="text-align: center"
                v-model="userInfo.userName"
                :readonly="!editingInfo"
                :class="{ editing: editingInfo }"
              />
              <input
                type="text"
                class="input_info"
                v-show="editingInfo"
                v-model="updatePassword"
                placeholder="欲修改密碼"
                :class="{ editing: editingInfo }"
              />
              <p class="notice" v-if="!suitablePassword">密碼不符合格式</p>
              <!-- @click="infoUpdatePost" -->
              <button
                v-if="!editingInfo"
                type="button"
                @click="infoUpdatePost"
                class="btn_edit"
              >
                <span class="material-icons">create</span>
              </button>
              <button
                v-if="editingInfo"
                type="button"
                @click="infoUpdatePost"
                class="btn_edit"
              >
                <span class="material-icons">done</span>
              </button>
            </div>

            <div class="logout">
              <button type="button" class="btn_logout" @click="logout">
                登出
              </button>
            </div>
          </div>
        </div>
        <!-- 個人資訊視窗結束 -->
      </l-control>

      <!-- 好友列表 -->
      <l-control position="bottomright" :disableScrollPropagation="scroll">
        <div class="bottom_list">
          <div class="bottom_list_top">
            <div class="popup_date" :class="{ invisible: hasSelectedTrip }">
              <div>
                <p class="title_date">起始日期</p>
                <input
                  type="date"
                  v-model="startDate"
                  class="date"
                  @change="
                    notice();
                    refresh();
                  "
                />
              </div>
              <div>
                <p class="title_date">結束日期</p>
                <input
                  type="date"
                  v-model="endDate"
                  class="date"
                  @change="
                    notice();
                    refresh();
                  "
                />
              </div>
              <!-- <button type="button" class="reset_date"><span class="material-icons">search</span></button> -->

              <button type="button" class="reset_date" @click="resetDate">
                <span class="material-icons">clear</span>
              </button>
            </div>

            <div class="friend_btn">
              <span
                class="material-icons"
                @click="isAddingFriend = !isAddingFriend"
                >person_add_alt</span
              >
              <span
                class="material-icons"
                @click="
                  isDeletingFriend = !isDeletingFriend;
                  showFriend = true;
                "
                >person_remove_alt_1</span
              >
              <span
                v-if="!showFriend"
                class="material-icons"
                @click="showFriendClick"
                >expand_less</span
              >
              <span v-else class="material-icons" @click="showFriendClick"
                >expand_more</span
              >
            </div>
          </div>
          <div :class="{ none: !showFriend }" class="friendList">
            <Friend
              v-for="friend in friendList"
              :key="friend.userId"
              :name="friend.friendName"
              :id="friend.friendId"
              :image="friend.friendImage"
              @friendChosed="getfriend"
              @friendNotChosed="deleteFriend"
             
            />
          </div>
        </div>
        <!-- 加好友的框框 -->
        <!--   -->
        <div v-show="isAddingFriend" class="popup_addFriend">
          <div class="popup_addFriend_inside">
            <p class="popup_addFriend_title">
              新增好友<button
                type="button"
                @click="isAddingFriend = false"
                class="popup_addFriend_close"
              >
                ✖️
              </button>
            </p>
            <input
              class="popup_addFriend_input"
              type="text"
              v-model="newFriend"
              placeholder="請輸入好友帳號"
            />
            <button
              type="button"
              @click="addFriendPost"
              class="btn_style popup_addFriend_btn"
            >
              確認
            </button>
          </div>
        </div>
        <!-- 刪好友的框框 -->

        <div v-show="isDeletingFriend" class="popup_deleteFriend">
          <div class="popup_deleteFriend_inside">
            <p class="popup_deleteFriend_title">
              刪除好友<button
                type="button"
                @click="
                  isDeletingFriend = false;
                  showFriend = false;
                "
                class="popup_deleteFriend_close"
              >
                ✖️
              </button>
            </p>
            <small style="display: block">可從下方好友列選取</small>
            <!-- <p v-for="friend in firendSelectedName" :key="friend.name">{{ friend.name}}</p> -->
            <div v-if="firendSelectedName.length" class="deleteFriend_list">
              <div
                class="deleteFriend_inner"
                v-for="friend in firendSelectedName"
                :key="friend.name"
              >
                <img
                  :src="`${
                    friend.image ? `${api}${friend.image}` : defaultImg
                  }`"
                  alt="'刪除好友名單'"
                  class="deleteFriend_resp"
                  :onerror="defaultImgOn"
                />
              </div>
            </div>
            <button
              type="button"
              @click="deleteFriendPost"
              class="btn_style popup_deleteFriend_btn"
            >
              確認刪除
            </button>
          </div>
        </div>
        <!-- 顯示member的框框 -->
        <p
          class="memberList"
          v-if="tripInfo.startingDate && tripInfo.endingDate && hasSelectedTrip"
        >
          {{
            tripInfo.startingDate.split("T")[0] +
            " ~ " +
            tripInfo.endingDate.split("T")[0]
          }}
        </p>
        <div v-show="hasSelectedTrip && memberList.length" class="memberList">
          <Friend
            v-for="friend in memberList"
            :key="friend.memberId"
            :name="friend.memberName"
            :id="friend.memberId"
            :image="friend.memberPhoto"
            :formember="true"
          />
        </div>
      </l-control>

      <!-- 搜尋匡 -->
      <l-control position="topleft" :disableScrollPropagation="scroll">
        <SearchTool
          :eventList="events"
          @searchingLocation="searchingLocation"
          @selectTripID="getSelectedTrip"
          @creating="creatEvent"
          @deleteSelect="deleteSelect"
          :allset="allSetForEvent"
          :tripID="tripIDSelected"
          :hasSelectedTrip="hasSelectedTrip"
          :isLocationToTrip="isLocationToTrip"
          :lToTID="lToTID"
          :lToTName="lToTName"
          :lToTstart="lToTstart"
          :lToTend="lToTend"
          :creatingEvent="creatingEvent"
        />
        <!-- 建立行程框框 -->
        <div class="popup_creating" v-show="creatingEvent" >
          <div class="popup_creating_inside">
            <button
              type="button"
              @click="closeCreatePopup"
              class="popup_creating_close"
            >
              ✖️
            </button>
            <input
              class="input_creating"
              type="text"
              placeholder="請輸入旅程名稱"
              v-model.lazy="eventName"
               maxlength="10"
            />
            <small class="date_creating">起始日期(必填)</small>
            <input
              class="input_creating"
              type="date"
              v-model="createStart"
              @change="notice"

            />
            <small class="date_creating">結束日期</small>
            <input
              class="input_creating"
              type="date"
              v-model="createEnd"
              @change="notice"
            />

            <small class="friend_title_creating"
              >旅遊夥伴(可從下方好友列選取)</small
            >
            <div v-if="firendSelectedName.length" class="friendlist_creating">
              <div
                v-for="friend in firendSelectedName"
                :key="friend.name"
                class="img_inner_creating"
              >
                <img
                  :src="`${
                    friend.image ? `${api}${friend.image}` : defaultImg
                  }`"
                  alt="'同行好友名單'"
                  class="img_resp_creating"
                  :onerror="defaultImgOn"
                />
              </div>
            </div>
            <div class="btns_creatEvent">
              <button
                type="button"
                class="btn_style"
                @click="createEventPost"
                :disabled="createClick"
              >
                新增行程
              </button>
            </div>
          </div>
        </div>
        <!-- 建立行程框框 -->
      </l-control>

      <l-control position="bottomleft">
        <!-- <p>{{ firendSelected }}</p> -->
        <!-- <button @click="test">測試按鈕</button> -->
      </l-control>
      <!-- marker們 -->

      <v-marker-cluster
        v-if="!hasSelectedTrip && !isSearchingLocation && markers.length"
        :options="markerOpts"
      >
        <l-marker
          :lat-lng="[marker.latitude, marker.longitude]"
          v-for="marker in markers"
          :key="`${marker.calcCount}`"
        >
          <l-icon
            :icon-url="icon.type.black"
            :shadow-url="icon.shadowUrl"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :shadow-size="icon.shadowSize"
          />
          <l-tooltip :content="marker.pinPhoto"></l-tooltip>
        </l-marker>
      </v-marker-cluster>
      <v-marker-cluster
        v-else-if="hasSelectedTrip "
        :options="markerOpts"
      >
        <template v-for="(item, index) in onetripMarkers">
          <l-marker
            v-for="spot in onetripMarkers[index].dataList"
            :key="spot.scheduleId + spot.tripId"
            :lat-lng="[spot.latitude, spot.longitude]"
            :icon="getIcon(spot, index)"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :popup-anchor="icon.popupAnchor"
            :shadow-size="icon.shadowSize"
          >
            <l-tooltip :content="`${spot.location}`"></l-tooltip>
          </l-marker>
        </template>
      </v-marker-cluster>
      <v-marker-cluster v-else :options="markerOpts">
        <l-marker
          v-if="locationInfo.latitude && locationInfo.longitude"
          :lat-lng="[locationInfo.latitude, locationInfo.longitude]"
        >
          <l-icon
            :icon-url="icon.type.black"
            :shadow-url="icon.shadowUrl"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :popup-anchor="icon.popupAnchor"
            :shadow-size="icon.shadowSize"
          />
        </l-marker>

        <l-popup v-if="!hasSelectedTrip"
          ><Card
            :locationInfo="locationInfo"
            @getSelectedTrip="getSelectedTrip"
            @locationToTrip="locationToTrip"
        /></l-popup>
      </v-marker-cluster>
      <template v-if="hasSelectedTrip">
        <l-polyline
          v-for="(item, index) in polys"
          :key="index"
          :lat-lngs="polys[index]"
          color="#000000"
        ></l-polyline>
      </template>
      <!-- <l-geo-json :geojson="geo" :options-style="styleFunction"></l-geo-json> -->
    </l-map>
  </div>
</template>

<script>
// import qs from "qs";
import L from "leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LIcon,
  LGeoJson,
  LControl,
  LControlZoom,
  LPolyline,
  LTooltip,
} from "vue2-leaflet";
import Card from "@/components/PopupCard";
import Friend from "@/components/FriendOpt";
import SearchTool from "@/components/SearchTool";
import Calender from "@/components/Calender";
import axios from "axios";
import {
  eventAdd,
  friendAdd,
  friendGet,
  friendDelete,
  eventGet,
  userInfoGet,
  scheduleGet,
  userInfoEdit,
  notifyGet,
  replyFriend,
  replyEvent,
} from "@/request/http.js";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    LGeoJson,
    LControl,
    LControlZoom,
    LPolyline,
    LTooltip,
    Card,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    Friend,
    SearchTool,
    Calender,
  },
  data() {
    return {
      lToTstart:String,
      lToTend:String,
      lToTName: String,
      lToTID: Number,
      isLocationToTrip: false,
      imgMap: new Map(),
      isCompleted: false,
      calcCount: 0,
      createClick: false, //防止新增行程連點
      a: null, //存setTimeOut的變數
      notifyFriend: [],
      notifyEvent: [],
      errorImg:'this.src="' + require('@/assets/noImage.png') + '"',
      defaultImgOn:'this.src="' + require('@/assets/a.jpg') + '"',
      defaultImg: require("@/assets/a.jpg"),
      showNotify: false,
      myMap: null,
      locationInfo: [],
      isSearchingLocation: false,
      api: "http://34.80.22.91/",
      preview: null,
      image: null,
      imageID: 0,
      updatePassword: "",
      suitablePassword: true,
      userInfo: Object,
      editingInfo: false,
      // id:-1,
      hasSelectedTrip: false,
      schedules: [], //取得一個旅遊事件下所有地點
      memberList: [],
      // showMember: true,
      showPersonalInfo: false,
      tripInfo: [], //旅遊事件資訊->中間顯現人&時間
      founderInfo: null,
      createStart: "", //建立行程的起始日
      createEnd: "", //建立行程的結束日
      // pickingDate: false,
      creatingEvent: false,
      tripIDSelected: 0, //使用者選擇的行程id
      firendSelected: [],
      firendSelectedName: [],
      startDate: "", //搜尋的起始日
      endDate: "", //搜尋的結束日
      scroll: true,
      eventName: "",
      events: [], //使用者所有旅遊事件
      markers: [],
      onetripMarkers: [],
      polys: [],
      friendList: [], //下排好友頭像
      showFriend: false,
      isAddingFriend: false,
      newFriend: "", //新增的好友的帳號
      isDeletingFriend: false,
      // fillColor: "#e4ce7f",
      // geojson: null,
      // isShow: false,
      showMenu: false,
      opts: {
        maxBounds: [
          [90, -180],
          [-90, 180],
        ],
        // noWrap: true,
        zoomControl: false,
        minZoom: 3,
        maxZoom: 15,
        zoomSnap: 0.5, //一次縮放的level
      },
      markerOpts: {
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 9,
      },

      zoom: 3,
      center: [40.503217, 12.555925],
      currentCenter: [22.612961, 120.304167],
      currentZoom: 3,

      url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      attribution: "Trace",

      icon: {
        type: {
          black:
            "./static/image/marker-icon-2x-black.png",
          
        },
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -40],
        shadowSize: [41, 41],
      },
      // geo: [],
      // eventEnum: {
      //   isSearch: '正在搜尋地點',
      //   hasSelect: '有選擇事件',
      //   notToDo: '無',
      // },
    };
  },

  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          //邊線
          color: "#fff",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 0.3,
        };
      };
    },
    allSetForEvent() {
      if (this.startDate !== "") {
        return true;
      }
      return false;
    },
  },
  watch: {
    creatingEvent(now) {
      if (!now) {
        this.showFriend = false;
        this.eventName = "";
        this.createStart = "";
        this.createEnd = "";
      }
      if(now){
        this.isAddingFriend = false;
        this.isDeletingFriend =false;
        this.showPersonalInfo = false
      }
    },
    isAddingFriend(now) {
      if (!now) {
        this.newFriend = "";
      }
      if(now){
         this.isDeletingFriend =false;
        this.showPersonalInfo = false
        this.creatingEvent = false;
      }
    },
    isDeletingFriend(now) {
      if (!now) {
        this.showFriend = false;
      }
      if(now){
        this.isAddingFriend =false;
        this.showPersonalInfo = false
        this.creatingEvent = false;
      }
    },
    showPersonalInfo(now){
      if(now){
        this.isAddingFriend =false;
        this.isDeletingFriend = false
        this.creatingEvent = false;
      }
    },

    // isSearchingLocation() {
    //   if (this.isSearchingLocation) {
    //     this.hasSelectedTrip = false;
    //   }
    // },
    // hasSelectedTrip() {
    //   if (this.hasSelectedTrip) {
    //     this.isSearchingLocation = false;
    //   }
    // },
    updatePassword(newValue) {
      this.checkPassword(newValue);
    },
  },
  methods: {
    closeCreatePopup() {
      this.creatingEvent = false;
      // this.showFriend = false;
      // this.eventName = "";
      // this.createStart = '';
      // this.createEnd='';
    },
    locationToTrip(tripID, tripName,start,end) {
      this.isLocationToTrip = true;
      this.lToTID = tripID;
      this.lToTName = tripName;
      this.lToTstart = start;
      this.lToTend = end;
      // console.log(',,,,,,')
      // console.log(this.lToTName)
      // console.log(this.lToTstart)
      // console.log(this.lToTend)
    },

    eventRequest(id, acception) {
      const replyEventData = {
        groupId: id,
        acceptedUserId: parseInt(this.$store.state.userID),
        isAccepted: acception,
      };
      console.log("回覆的內容");
      console.log(replyEventData);
      replyEvent(replyEventData)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            if (acception === true) {
              this.$toast.show(`成功加入${res.data.tripName}行程`);
            }
            if (acception === false) {
              this.$toast.show(`已拒絕加入${res.data.tripName}行程`);
            }
            this.events.push(res.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    friendRequest(id, acception) {
      const replyData = {
        notifyId: id,
        receiveId: parseInt(this.$store.state.userID),
        isAccepted: acception,
      };
      // console.log("回覆的內容");
      // console.log(replyData);
      let vm = this;
      replyFriend(replyData)
        .then((res) => {
          // console.log('成功邀請後收到的內容')
          // console.log(res.data);
          if (res.status === 200) {
            // console.log(res.data);
            if (acception === true) {
              this.$toast.show(`成功接受${res.data.userName}的好友邀請`);
              let fakeFriend = {
                friendId: res.data.friendId,
                friendImage: res.data.friendImage,
                friendName: res.data.friendName,
                tripTimes: 0,
              };

              vm.friendList.push(fakeFriend);
            }
            if (acception === false) {
              this.$toast.show(`已拒絕${res.data.userName}的好友邀請`);
            }
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    checkNotify() {
      this.showNotify = !this.showNotify;
      if (this.showNotify === false) {
        clearInterval(this.a);
        return;
      }
      // console.log("!")
      this.a = setInterval(() => {
        this.getNotifyApi();
      }, 500);
    },
    getNotifyApi() {
      notifyGet(this.$store.state.userID)
        .then((res) => {
          console.log("通知們");
          console.log(res.data);
          this.notifyFriend = res.data.friendRequests;
          this.notifyEvent = res.data.tripEventRequests;
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status === 404) {
            this.notifyFriend = [];
            this.notifyEvent = [];
          }
        });
    },
    getIcon(item, index) {
      let arr = [
        `<img src="./static/image/marker-icon-2x-black.png" style="width:25px; height:41px; transform: translate(-27%,-80%);"><div style='background-color:rgba(255,255,255,.9); border-radius:50%; text-align:center; width:20px; height:20px; transform: translate(-20%,-380%);'>${item.dayNumber}</div>`,
        `<img src="./static/image/marker-icon-2x-grey.png" style="width:25px; height:41px; transform: translate(-27%,-80%);"><div style='background-color:rgba(255,255,255,.9); border-radius:50%; text-align:center; width:20px; height:20px; transform: translate(-20%,-380%);'>${item.dayNumber}</div>`,
        `<img src="./static/image/marker-icon-2x-gold.png" style="width:25px; height:41px; transform: translate(-27%,-80%);"><div style='background-color:rgba(255,255,255,.9); border-radius:50%; text-align:center; width:20px; height:20px; transform: translate(-20%,-380%);'>${item.dayNumber}</div>`,
        `<img src="./static/image/marker-icon-2x-red.png" style="width:25px; height:41px; transform: translate(-27%,-80%);"><div style='background-color:rgba(255,255,255,.9); border-radius:50%; text-align:center; width:20px; height:20px; transform: translate(-20%,-380%);'>${item.dayNumber}</div>`,
        `<img src="./static/image/marker-icon-2x-blue.png" style="width:25px; height:41px; transform: translate(-27%,-80%);"><div style='background-color:rgba(255,255,255,.9); border-radius:50%; text-align:center; width:20px; height:20px; transform: translate(-20%,-380%);'>${item.dayNumber}</div>`,
      ];

      return L.divIcon({
        className: "custom-div-icon",
        html: arr[index % 5],
      });
    },
    test() {
      console.log(this.userInfo.userPhotoPath);
      // console.log(this.events);

      // console.log(this.schedules)
    },
    showFriendClick() {
      if (this.hasSelectedTrip) {
        return;
      }
      this.showFriend = !this.showFriend;
    },
    //搜尋地點
    searchingLocation(value) {
      if (value === "") {
        this.isSearchingLocation = false;
        console.log("refresh----try");
        this.startDate = "";
        this.endDate = "";
        this.firendSelected = [];
        this.refresh();
        return;
      }
      this.isSearchingLocation = true;
      let vm = this;
      const locationData = {
        Userid: this.$store.state.userID,
        Location: value,
      };
      // console.log("搜尋資料");
      // console.log(locationData);
      axios
        .get("http://34.80.22.91/api/MainMap/Location", {
          params: locationData,
        })
        .then(function (res) {
          // console.log("拿到的地點資料");
          // console.log(res.data);
          vm.locationInfo = res.data;
          vm.center = [res.data.latitude, res.data.longitude];
          // vm.currentZoom =9
          // vm.map.flyto([res.data.latitude,res.data.longitude],9)
        })
        .catch(function (err) {
          console.log(err.response);
          if (err.response.status === 404) {
            console.log("!!!!");
            alert("查無此搜尋地點資料");
          }
        });
    },
    //換大頭照相關
    induceClick() {
      document.querySelector("#input").click();
    },
    previewImage(event) {
      let vm = this;
      var input = event.target;
      let formData = new FormData();
      formData.append("Userid", parseInt(this.$store.state.userID));
      formData.append("photo", input.files[0]);
      axios
        .post("http://34.80.22.91/api/User/UserPhoto", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          console.log("照片0上傳成功！");

          if (res.status === 200) {
            this.imageID = res.data.photoId;

            if (input.files) {
              var reader = new FileReader();
              reader.onload = (e) => {
                vm.preview = e.target.result;
                vm.userInfo.userPhotoPath = res.data;
                //右上角大頭貼也要換
              };
              vm.image = input.files[0];
              reader.readAsDataURL(input.files[0]);
            }
          }
        })
        .catch((err) => {
          console.log(err.response);
           this.$toast.show(`修改照片失敗${err.response.data}`);
          // console.log("照片0上傳失敗！");
        });
    },
    //登出
    logout() {
      localStorage.removeItem("tripName");
      localStorage.removeItem("trip");
      localStorage.removeItem("end");
      localStorage.removeItem("start");
      this.$router.push("/");
      localStorage.removeItem("token");
    },
    //編輯個人資訊相關
    editPersonalInfo() {
      this.showPersonalInfo = !this.showPersonalInfo;
    },
    checkPassword(newValue) {
      if (this.updatePassword.length < 6 || this.updatePassword.length > 10) {
        this.suitablePassword = false;
      } else {
        this.suitablePassword = /^[a-z]+$/.test(newValue);
      }
    },
    infoUpdatePost() {
      this.editingInfo = !this.editingInfo;
      if (!this.editingInfo && this.suitablePassword === true) {
        const infoData = {
          userId: this.$store.state.userID,
          userPassword: this.updatePassword,
          userName: this.userInfo.userName,
        };
        //  console.log('送出的修改資料')
        //  console.log(infoData)
        //打post
        userInfoEdit(infoData)
          .then((res) => {
            console.log(res.data);
            this.editingInfo = false;
            this.$toast.show("個人資訊修改成功");
          })
          .catch((err) => {
            console.log(err.response.data);
            if (err.response.status !== 400) {
              this.$toast.show("個人資訊修改失敗");
            }
            // this.$toast.show('個人資訊修改失敗')
          });
      }
      // console.log(this.suitablePassword);
    },

    centerUpdate(center) {
      this.currentCenter = center;
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },

    //是否按日曆的boolean
    // datePick(value) {
    //   this.pickingDate = value;
    // },
    resetDate() {
      this.startDate = "";
      this.endDate = "";
      this.refresh();
      //resfresh
    },
    deleteFriendPost() {
      let vm = this;
      let deleteFriendData = {
        userId: parseInt(this.$store.state.userID),
        friendListId: this.firendSelected,
      };
      // console.log(deleteFriendData);
      friendDelete(deleteFriendData)
        .then((res) => {
          // console.log(res);
          // console.log("刪除好友成功---362");

          if (res.status === 200) {
            this.showFriend = false;
            this.isDeletingFriend = false;
            this.$toast.show("成功刪除好友");
            for (var i = 0; i < vm.friendList.length; i++) {
              for (var n = 0; n < vm.firendSelected.length; n++) {
                if (vm.friendList[i].friendId === vm.firendSelected[n]) {
                  vm.friendList.splice(i, 1);
                  vm.firendSelected.splice(n, 1);
                  vm.firendSelectedName.splice(n, 1);
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.show(`刪除好友失敗：${err.response.data}`);
        });
    },
    addFriendPost() {
      // let vm = this;
      let addFriendData = {
        userId: parseInt(this.$store.state.userID),
        friendAccount: this.newFriend,
      };
      console.log(addFriendData);
      friendAdd(addFriendData)
        .then((res) => {
          console.log(res);
          this.isAddingFriend = false;
          this.$toast.show("已發送好友邀請");
          // vm.newFriend = "";
        })
        .catch((err) => {
          console.log(err);
          this.$toast.show("好友邀請未發送成功");
        });
    },
    //判斷使用者選擇的日其
    notice() {
      let Start = parseInt(this.createStart.split("-").join(""));
      let End = parseInt(this.createEnd.split("-").join(""));
      let start = parseInt(this.startDate.split("-").join(""));
      let end = parseInt(this.endDate.split("-").join(""));
      if (start > end || Start > End) {
        this.endDate = "";
        this.createEnd = "";
        alert("結束日期早於起始日期");
      }
    },
    creatEvent(value) {
      // console.log(value)
      this.showFriend = true;
      this.creatingEvent = value;
      // if(!value){
      //   this.creatingEvent = false;
      // this.showFriend = false;
      // this.eventName = "";
      // this.createStart = '';
      // this.createEnd='';
      // }
      // if (value === true) {
      //   this.pickingDate = false;
      // }
    },
    //firendSelected陣列新增
    getfriend(id, name, image) {
      this.firendSelected.push(id);
      this.firendSelectedName.push({ name: name, image: image });
      if(this.creatingEvent || this.isDeletingFriend){return}
      this.refresh();
    },
    //firendSelected陣列刪除
    deleteFriend(id, name) {
      this.firendSelected.forEach(function (item, index, arr) {
        if (item === id) {
          arr.splice(index, 1);
        }
      });
      this.firendSelectedName.forEach(function (item, index, arr) {
        if (item.name === name) {
          arr.splice(index, 1);
        }
      });
      if(this.creatingEvent || this.isDeletingFriend){return}
      this.refresh();
    },
    deleteSelect() {
      if (this.isLocationToTrip) {
        this.isSearchingLocation = false;
        this.isSearchingLocation = false;
      }
      this.markers.splice(0, this.markers.length);
      this.hasSelectedTrip = false;
      localStorage.removeItem("tripName");
      localStorage.removeItem("trip");
      localStorage.removeItem("start");
      localStorage.removeItem("end");

      let vm = this;
      const sendData = {
        userId: this.$store.state.userID,
      };
      //取得使用者所有旅遊事件
      axios
        .get("http://34.80.22.91/api/MainMap/TripEvent", { params: sendData })
        .then(function (res) {
          vm.events = res.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      //取得使用者所有地標
      this.isCompleted = false;
      axios
        .get("http://34.80.22.91/api/MainMap", { params: sendData })
        .then(function (res) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].latitude && res.data[i].longitude) {
              const response = res.data[i];
              const areaImg = response.pinPhoto;
              const localAddress = response.location;
              if (areaImg) {
                vm.imgMap.set(
                  localAddress,
                  `<img src="${vm.api}${areaImg}" alt="地點圖片" style="display:block; width: 120px; height: 90px;" :onerror="${vm.errorImg}"><p style="text-align:center; margin:0;">${localAddress}</p>`
                );
              }
              vm.markers.push({
                ...response,
                calcCount: vm.calcCount++,
                pinPhoto: vm.imgMap.has(localAddress)
                  ? vm.imgMap.get(localAddress)
                  : localAddress,
              });
            }
          }
          vm.isCompleted = true;
          // console.log('重整後的markers')
          // console.log(vm.markers);
        })
        .catch(function (err) {
          console.log(err.response);
        });
    },
    //得到使用者選擇的TripID
    getSelectedTrip(id) {
      // console.log('getSelect')
      this.map.closePopup();
      let vm = this;
      localStorage.setItem("trip", id);

      this.hasSelectedTrip = true;

      this.showFriend = false;
      this.tripIDSelected = id;
      this.onetripMarkers.splice(0,this.onetripMarkers.length)
      //畫marker用
      scheduleGet(id)
        .then((res) => {
        
          for (var i = 0; i < res.data.length; i++) {
            if (
              res.data[i].latitude !== null &&
              res.data[i].longitude !== null
            ) {
              vm.center = [res.data[i].latitude, res.data[i].longitude];
              //  var markerBounds = L.latLngBounds([res.data[i].latitude,res.data[i].longitude]);
              //   vm.myMap.fitBounds(markerBounds);
              vm.onetripMarkers.push(res.data[i]);
                // console.log(vm.onetripMarkers)
            }
          }
          // console.log(vm.onetripMarkers)
          let list = [];
          let markerKey = [
            ...new Set(vm.onetripMarkers.map((item) => item.time.slice(0, 10))),
          ];
          markerKey.forEach((key) => {
            let object = {
              time: key,
              // id: (this.id += 1),
              dataList: vm.onetripMarkers
                .filter((item) => item.time.slice(0, 10) === key)
                .map((item) => ({ ...item, time: item.time.slice(0, 10) })),
            };
            list.push(object);
          });
          vm.onetripMarkers = list;
          // console.log("我要的／");
          // console.log(vm.onetripMarkers);

          const arr = [];
          vm.onetripMarkers.forEach((item) => {
            arr.push(
              item.dataList.map((data) =>
                Object.values({
                  latitude: data.latitude,
                  longitude: data.longitude,
                })
              )
            );
          });
          vm.polys = arr;
          // console.log('polys')
          // console.log(arr);
        })
        .catch((err) => {
          console.log(err.response);
        });

      //獲得選取的旅遊事件相關資料
      eventGet(id)
        .then((res) => {
          this.tripInfo = res.data;
          // console.log(this.tri
          if (res.request.status === 200) {
            //取得此旅遊事件下的所有參與人
            // console.log('送出的資料')
            const getGroupData = {
              UserId: vm.$store.state.userID,
              GroupId: res.data.groupId,
            };
            //  console.log(getGroupData)
            axios
              .get("http://34.80.22.91/api/MainMap/GroupMember", {
                params: getGroupData,
              })
              .then(function (res) {
                vm.memberList = res.data;
                console.log("成員資料");
                console.log(vm.memberList);
              })
              .catch(function (err) {
                console.log("沒有群組成員資料");
                console.log(err.response);
                if (err.response.status === 404) {
                  vm.memberList = [];
                }
              });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    //點選篩選條件更新時送出get Api
    refresh() {
      console.log("refresh");
      let interval = "";
      if (this.startDate !== "" && this.endDate === "") {
        interval = this.startDate + "," + this.startDate;
      }
      if (this.startDate === "" && this.endDate !== "") {
        interval = this.endDate + "," + this.endDate;
      }
      if (this.endDate !== "" && this.startDate !== "") {
        interval = this.startDate + "," + this.endDate;
      }
      const sendData = {
        userId: this.$store.state.userID,
        friendsId: this.firendSelected.join(","),
        dateInterval: interval,
      };
      let vm = this;
      //再次取得旅遊事件
      axios
        .get("http://34.80.22.91/api/MainMap/TripEvent", { params: sendData })
        .then(function (res) {
          vm.events = res.data;
          // console.log(vm.events);
        })
        .catch(function (err) {
          console.log(err.response);
          if (err.response.status === 404) {
            vm.events = [];
          }
        });
      //再次取得markers
      axios
        .get("http://34.80.22.91/api/MainMap", { params: sendData })
        .then(function (res) {
          // console.log("點擊好友");
          console.log(vm.markers);
          vm.markers = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].latitude && res.data[i].longitude) {
              const response = res.data[i];
              const areaImg = response.pinPhoto;
              const localAddress = response.location;
              if (areaImg) {
                vm.imgMap.set(
                  localAddress,
                  `<img src="${vm.api}${areaImg}" alt="地點圖片" style="display:block; width: 120px; height: 90px;" :onerror="${vm.errorImg}><p style="text-align:center; margin:0;">${localAddress}</p>`
                );
              }
              vm.markers.push({
                ...response,
                calcCount: vm.calcCount++,
                pinPhoto: vm.imgMap.has(localAddress)
                  ? vm.imgMap.get(localAddress)
                  : localAddress,
              });
            }
          }
          // console.log("--------------------");
          // console.log(vm.markers);
        })
        .catch(function (err) {
          console.log(err.response);
          if (err.response.status === 404) {
            vm.$toast.show("沒有符合的地點紀錄");
            vm.markers = [];
          }
        });
    },
    //新增旅遊事件
    createEventPost() {
      this.createClick = true;
      setTimeout(function () {
        this.createClick = false;
      }, 500);

      if (this.createStart === "") {
        this.$toast.show("未填寫起始日期");
        return;
      }
      const eventData = {
        tripName: this.eventName,
        founderId: this.$store.state.userID,
        startingDate: this.createStart,
        endingDate: this.createEnd,
        friendsId: this.firendSelected,
      };

      console.log(eventData);
      eventAdd(eventData)
        .then((res) => {
          console.log("新增旅遊事件成功");
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("start", this.createStart);
            localStorage.setItem("end", this.createEnd);
            localStorage.setItem("trip", res.data.tripId);
            localStorage.setItem("tripName", this.eventName);
            this.$router.push("/planning_edit");
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.$toast.show("新增旅遊事件失敗");
        });
    },
  },
  created() {
    let vm = this;
    const sendData = {
      userId: this.$store.state.userID,
    };
    userInfoGet(this.$store.state.userID)
      .then((res) => {
        // console.log('使用者資訊')
        // console.log(res.data)
        this.userInfo = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });

    //取得所有好友
    friendGet(this.$store.state.userID)
      .then((res) => {
        // console.log('所有好友')
        this.friendList = res.data;
   
      })
      .catch((err) => {

        if (err.response.status === 404) {
          console.log("沒有好友資訊");
        }
      });

    //取得使用者所有旅遊事件
    axios
      .get("http://34.80.22.91/api/MainMap/TripEvent", { params: sendData })
      .then(function (res) {
        vm.events = res.data;
      })
      .catch(function (err) {
        console.log(err.response);
        if (err.response.status === 404) {
          console.log("沒有旅遊事件資訊");
        }
      });
    //取得使用者所有地標
    axios
      .get("http://34.80.22.91/api/MainMap", { params: sendData })
      .then(function (res) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].latitude && res.data[i].longitude) {
            const response = res.data[i];
            const areaImg = response.pinPhoto;
            const localAddress = response.location;
            if (areaImg) {
              vm.imgMap.set(
                localAddress,
                `<img src="${vm.api}${areaImg}" alt="地點圖片" style="display:block; width: 120px; height: 90px;" :onerror="${vm.errorImg}><p style="text-align:center; margin:0;">${localAddress}</p>`
              );
            }
            vm.markers.push({
              ...response,
              calcCount: vm.calcCount++,
              pinPhoto: vm.imgMap.has(localAddress)
                ? vm.imgMap.get(localAddress)
                : localAddress,
            });
          }
        }
        vm.isCompleted = true;
        // console.log(vm.markers);
      })
      .catch(function (err) {
        if (err.response.status === 404) {
          console.log("沒有marker資訊");
        }
      });
  },
  beforeDestroy() {
    clearInterval(this.a);
  },
  mounted() {
    // 等地圖創建後執行
       this.map = this.$refs.myMap.mapObject;
   
  },
};
</script>


<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.topright {
  display: flex;
}

//通知-為了讓list可以absolute
.notify {
  position: relative;
}
//通知鈴鐺
.notify_bell {
  margin: 0.7rem 0.7rem 0.5rem 0.7rem;
  border: none;
  background-color: transparent;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
}
//通知框
.notify_list {
  position: absolute;
  right: 0;
  margin: 0 0.5rem;
  padding: 0.7rem;
  width: 250px;
  background-color: rgb(182, 182, 182);
  border-radius: 4px;
  // height: 300px;
  & ul {
    padding: 0;
    list-style-type: none;
  }
}

.notify_list_inside {
  width: 100%;

  border: 1px solid #fff;
  border-radius: 4px;
 
}

.notify_ul {
   padding: 0 0.7rem;
  
  height: 300px;
  overflow-y: scroll;
  margin: 0;
  li + li {
    border-top: 1px solid #fff;
  }
  &::-webkit-scrollbar-button {
    display:none;
  }
}

.notify_message {
  text-align: center;
}

.notify_btns {
  display: flex;
  justify-content: flex-end;
}

.notify_btn {
  margin: 0 0 12px 0.3rem;
  border: none;
  background-color: #fff;
  padding: 5px;
  border-radius: 2px;
  cursor: pointer;

  //  float:right;
}

.avatar_inner{
width: 50px;
 height: 50px;
}
.avator_resp {
  width: 100%;
   height: 100%;
  border-radius: 50%;
  margin: 0 auto;
  // border: 5px solid #cacaca;
  &:hover {
    opacity: 0.8;
  }
}

.personalInfo {
  width: 250px;
  padding: 0.7rem;
  background-color: rgb(182, 182, 182);
  border-radius: 4px;
  height: max-content;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
}
//畫白線用的
.personalInfo_inside {
  width: 100%;
  border: 1px solid #fff;
  border-radius: 4px;
  position: relative;
}

.center {
  padding: 0.7rem;
  text-align: center;
}

.img_inner {
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  position: relative;
}

.img_resp {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.space {
  display: flex;
  justify-content: center;
}
.upload_btn {
  display: none;
}

.icon {
  line-height: 50px;
}

.input_info {
  width: 80%;
  border: 1px solid #fff;
  border-radius: 3px;
  & + & {
    margin-top: 1rem;
  }

  padding: 0.5rem;
  background-color: rgb(182, 182, 182);
  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: center;
    font-size: 13px;
    background-color: rgb(182, 182, 182);
  }
}

.btn_edit {
  // text-align: center;
  display: block;
  margin: 0.5rem auto 0 auto;
  background-color: transparent;
  border: none;
}
.personalInfo_close {
  border: none;
  background-color: transparent;
  position: absolute;
  top: -0.7rem;
  left: 97%;
}
.notice {
  width: max-content;
  text-align: center;
  margin: 0.5rem auto 0 auto;
  color: #fff;
  background-color: #000;
  border-radius: 3px;
  padding: 3px;
  font-size: 10px;
}

.editing {
  border: 2px solid #fff;
  border-radius: 3px;
}

.editing_photo {
  border: 2px solid #fff;
  border-radius: 50%;
}

.logout {
  display: flex;
  justify-content: center;
  border-top: 1px solid #fff;
}

.btn_logout {
  border: none;
  background-color: #fff;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem;
}

.friendList {
  overflow-x: scroll;
  width: 98.5vw;
  display: flex;
  // align-items: flex-end;
  background-color: rgba(182, 182, 182, 0.8);
  border-radius: 4px;
  border-top-right-radius: 0;
  padding-top: 0.5rem;
}
//新增旅遊事件
.popup_creating {
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  position: fixed;
  width: 250px;
  height: max-content;

  background-color: rgb(182, 182, 182);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
}

//新增旅遊事件的title
.input_creating {
  width: 100%;
  height: 2rem;
  border: 1px solid #fff;
  border-radius: 3px;
  & + & {
    margin-top: 1rem;
  }

  padding: 0.5rem;
  background-color: rgb(182, 182, 182);
  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: center;
    font-size: 13px;
    background-color: rgb(182, 182, 182);
  }
}

.date_creating,
.friend_title_creating {
  display: block;
  margin-top: 0.5rem;
  font-size: 12px;
  width: max-content;
}

.friendlist_creating {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #fff;
  border-radius: 3px;
  // flex-direction: row;
}

.img_inner_creating {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 6px;
}

.img_resp_creating {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.popup_creating_close {
  position: absolute;
  border: none;
  background-color: transparent;
  top: 0.1rem;
  left: 93%;
}

// 選擇日期
.bottom_list_top {
  width: 98.5vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.popup_date {
  display: flex;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(182, 182, 182, 0.8);
  align-items: center;
  border-radius: 3px;
}

.title_date {
  margin: 0;
}
//input匡
.date {
  font-size: 15px;
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  width: 130px;

  margin-right: 1rem;

  &:focus {
    outline: none;
  }
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0;
  }
}

.reset_date {
  border: none;
  background-color: transparent;
}

.invisible {
  visibility: hidden;
}

//清除按鈕樣式  (新增旅行事件的按鈕們＋清除選擇日期的按鈕)
.btn_style {
  border: none;
  background-color: transparent;
  padding: 0.5rem;
  border-radius: 3px;
  background-color: #fff;
  margin-top: 1rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
}

//日期的清除按鈕
.reset {
  margin: 0;
}

.btns_creatEvent {
  display: flex;
  justify-content: space-around;
}

//呈現選擇的日期與好友名單
.choice_show {
  display: flex;
  font-size: 14px;
  text-align: center;
  border-bottom: 2px solid #000;
  margin: 1.5rem 0.5rem;
}

// .menu_btn{
//   position: fixed;
//   display: inline;

//     padding:1rem;
//     width: max-width;
//     border-radius:50%;
//     left:47%;
//     width: 26px;
//     height: 26px;
// }

.none {
  display: none;
}

.friend_btn {
  height: max-content;
  // justify-content: ;
  width: max-content;
  background-color: rgba(182, 182, 182, 0.8);
  padding: 0.5rem 1rem;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  align-items: flex-start;
  & > span:hover {
    cursor: pointer;
    opacity: 0.5;
  }
  & > span + span {
    margin-left: 0.5rem;
  }
}

// .bottom_list {
// background-color: rgba(0, 255, 255, 0.8);
// display: block;

// flex-direction: rev;
// }

.popup_addFriend,
.popup_deleteFriend {
  // width: 300px;
  // height: 200px;
  box-sizing: border-box;
  padding: 0.7rem;
  width: 250px;
  background-color: rgb(182, 182, 182);
  border-radius: 4px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.popup_addFriend_inside,
.popup_deleteFriend_inside,
.popup_creating_inside {
  width: 100%;
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 0.7rem;
}

.popup_addFriend_title,
.popup_deleteFriend_title {
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin-top: 0;
  position: relative;
}

.popup_addFriend_input {
  width: 100%;
  height: 2rem;
  border: 1px solid #fff;
  border-radius: 3px;
  & + & {
    margin-top: 1rem;
  }
  padding: 0.5rem;
  background-color: rgb(182, 182, 182);
  &:focus {
    outline: none;
    border: 2px solid #fff;
  }
  &::placeholder {
    text-align: center;
    font-size: 13px;
    background-color: rgb(182, 182, 182);
  }
}

.popup_addFriend_btn,
.popup_deleteFriend_btn {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.popup_addFriend_close,
.popup_deleteFriend_close {
  border: none;
  background-color: transparent;
  position: absolute;
  top: -1.5rem;
  left: 102%;
}

.deleteFriend_list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  // overflow: hidden;
  border: 1px solid #fff;
  border-radius: 3px;
}
.deleteFriend_inner {
  //  overflow: scroll;
  margin: 6px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.deleteFriend_resp {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.memberList {
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 120%);
  border-radius: 4px;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>

<style>
/* 調整彈跳視窗樣式 */
.leaflet-popup-content-wrapper {
  border-radius: 4px;
  position: relative;
  width: max-content;
}

.leaflet-popup-content {
  margin: 0.5rem;
}

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background-color: rgb(182, 182, 182);
  box-shadow: none;
}

.leaflet-container a.leaflet-popup-close-button {
  /* position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  display: block;
  padding: 2px;
  font-size: 1.5rem; */
  display: none;
}

.marker-cluster-small {
  background-color: #b1c6e6 !important;
}

.marker-cluster-small div {
  background-color: #1c5094 !important;
  color: #fff !important;
}

/* <1024 */
/* @media screen and (max-width: 1024px) {
  
} */

/* <768 */
/* @media screen and (max-width: 768px) {
  
} */

/* 320~480 */
@media screen and (max-width: 480px) and (min-width: 320px) {
  .popup_date {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    padding: 0.5rem;
    background-color: rgba(182, 182, 182, 0.8);
    align-items: center;
    border-radius: 3px;
  }

  .topright {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>


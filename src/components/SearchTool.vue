<template>
  <div class="flex">
    <div >
      <div>
      <input
        type="text"
        class="search_bar"
        v-model="searchPlace"
         :placeholder="tag===''? '輸入地點查詢/點選右側按鈕':''"
         @change="searchingLocation2"
         @focus="isSearchingLocation = true"
         @blur="isSearchingLocation = false"
      />
      <button v-if="tag !== ''"  type="button" class="cancelSelect" @click="deleteSelect">✖️</button>
      <!-- <button v-if="isLocationToTrip" type="button" class="cancelLocation" @click="searchPlace=''; isLocationToTrip=false">✖️</button> -->
      <button v-if="searchPlace !== '' || isSearchingLocation" type="button" class="btn--search" @click="searchingLocation"><span class="material-icons">search</span></button>
</div>
<!-- 上下箭頭 -->
      <button
        v-if="!isSearching && !isSearchingLocation && (searchPlace === '')"
        type="button"
        class="btn--search"
        @click="isSearching = !isSearching"
      >
        <span class="material-icons">expand_more</span>
      </button>
      <button
        v-else-if="isSearching && !isSearchingLocation &&(searchPlace === '')"
        type="button"
        class="btn--search"
        @click="isSearching = !isSearching"
      >
        <span class="material-icons">expand_less</span>
      </button>
  <!-- 上下箭頭 -->
      <nav>
        <ul v-show="isSearching" class="events">
          <li
            class="options"
            v-for="event in eventList"
            :key="event.tripId"
            @click="
              selectEvent(event.tripName, event.tripId,event.startingDate, event.endingDate);
              isSearching = false;
            "
          >
            <div class="img_inner">
              <!-- :src="`${
              event.founderPhoto
                ? `${api}${event.founderPhoto}`
                : defaultImg
            }`" -->
              <img :src="`${
              event.founderPhoto
                ? `${api}${event.founderPhoto}`
                : defaultImg
            }`" alt="大頭照" class="img_resp" :onerror="defaultImgOn"/>
            </div>
            <p>{{ event.tripName }}</p>
          </li>
        </ul>
      </nav>
      <div class="tags">
        <p class="tag" v-if="tag !== ''">
          {{ tag }}
          
           <!-- <button type="button" class="cancelSearching" @click="deleteSelect">
            ✖️
          </button> -->
        </p>
      </div>
      <!-- <button @click="test">測試按鈕</button> -->
    </div>

    <div class="buttons">
      <button v-show="!hasSelectedTrip" type="button" class="btn" @click="createEvent">建立</button>

     
        <button v-show="hasSelectedTrip" type="button" class="btn" @click="warning2">行程規劃</button>
        <button  v-show="hasSelectedTrip" type="button" class="btn" @click="warning3">旅遊札記</button>
       
    </div>
    <!-- <button @click="test">test</button> -->
  </div>

</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
export default {
  name: "SearchTool",
  props: ["eventList", "allset", "tripID",'hasSelectedTrip','isLocationToTrip','lToTID','lToTName','lToTstart','lToTend','creatingEvent'],
  data() {
    return {
      isSearchingLocation:false,
      defaultImgOn:'this.src="' + require('@/assets/a.jpg') + '"',
      defaultImg: require("@/assets/a.jpg"),
      api: "http://34.80.22.91/",
      searchPlace: "",
      isSearching: false,
      userID: 1,
      events: [],
      tag: "",
      eventId: 0,
      searchWords: "",
      isCreating: false,
      alert1: false,
      alert2: false,
      alert3: false,
    };
  },

  created() {
  // console.log('SearchBar')
  // console.log(this.eventList)
  

  },
  
  watch:{
    creatingEvent(now,before){
        this.isCreating = now;
    },
    isLocationToTrip(now,before){
      //如果為true
      
        if(now){
            this.selectEvent(this.lToTName,this.lToTID,this.lToTstart,this.lToTend)
            this.searchPlace ='';
            this.isSearchingLocation=false;
        }
    }
  },
  methods: {
    test(){
  
    },
    searchingLocation() {
        this.isSearching = false;
        this.$emit("searchingLocation", this.searchPlace);
       
    },
    searchingLocation2(){
      if(this.searchPlace === ''){
        this.isSearchingLocation = false
        this.$emit("searchingLocation", this.searchPlace);
      }
    },
    selectEvent(name, id,start,end) {
      // console.log('__________')
      // console.log(start)
      // console.log(end)
      // if(this.tag!==''){return}
      this.tag = name;
      // this.friendList2.isClick = !boolean
      this.eventId = id;
     localStorage.setItem("tripName", name);
     localStorage.setItem('start', start.split('T')[0])
     if(!end){
       localStorage.setItem("end",'')
     }else{
        localStorage.setItem("end",end.split('T')[0])
     }
    
      this.$emit("selectTripID", id);
    },
    deleteSelect() {
      // console.log(index)
      this.tag = "";
      this.eventId = 0;
      // this.searchPlace='';
      // this.isLocationToTrip=false;
      this.$emit("deleteSelect");
    },
    // test() {
    //   console.log("searchPlace");
    //   console.log(this.searchPlace);
    // },
    createEvent() {
      this.isCreating = !this.isCreating;
      this.$emit("creating", this.isCreating);
      
    },
    // 行程
    warning2() {
      var vm = this;
      if (this.tripID === 0) {
        this.alert2 = true;
        setTimeout(function () {
          vm.alert2 = false;
        }, 1000);
      } else {
        this.$router.push("/planning_edit");
      }
    },
    //紀錄
    warning3() {
      var vm = this;
      if (this.tripID === 0) {
        this.alert3 = true;
        setTimeout(function () {
          vm.alert3 = false;
        }, 1000);
      } else {
        this.$router.push("/blog");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.cancelLocation,.cancelSelect{
  height: 2rem;
  border: none;
  background-color: transparent;
  position: absolute;
  left: 205px;
  top:0;
  &:hover {
    opacity: 0.5;
  }
}

.search_bar {
  width: 250px;
  height: 2rem;
  background-color: #fff;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  padding-left: 0.5rem;
  position: relative;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.3);
  &:focus {
    outline: none;
  }
}

.btn--search {
  height: 2rem;
  border: none;
  background-color: transparent;
  position: absolute;
  left: 225px;
  top:0;
  &:hover {
    opacity: 0.5;
  }
}




/* ul */
.events {
  border-radius: 3px;
  padding: 0;
  margin: 0;
  width: 260px;
  background-color: #fff;
  list-style-type: none;
  position: absolute;
  left: 0;
  top: 3rem;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.3);
  height: 180px;
  overflow-y: scroll;
}

/* li */
.options {
  align-items: center;
  display: flex;
  padding: 0 0.5rem;
  font-size: 14px;
  height: max-content;

  // display: inline;
  // width: 250px;
  // vertical-align:top;
  &:hover {
    background-color: #ddd;
  }

  // border-radius: 3px;
}

.icon_plane {
  padding: 0.5rem;
}

.tags {
  position: absolute;
  top: 3px;
  left: 3px;
  // padding-right:3rem;
}

.tag {
  font-size: 14px;
  padding: 3px;
  display: inline-block;
  margin: 0;
  background-color: #fff;
  border-radius: 3px;
}

.img_inner {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.img_resp {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

p {
  margin-left: 1rem;
}

//btns
.buttons {
  display: flex;

  margin: 0 0.5rem;
}
.btn {
  // width: max-content;
  margin: 5px 0.5rem;
  border: none;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 3px;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.3);
}

// p+btn的框框
.alert {
  // bottom:0;
  // display: flex;
  // width: max-content;
  position: relative;
}

//警告標語p
.warning_word {
  position: absolute;
  top: 100%;
  display: none;
  vertical-align: bottom;
  margin: 0 0.5rem;
  padding: 3px 0.5rem;
  width: max-content;
  // height: max-content;
  border-radius: 3px;
  color: #fff;
  background-color: rgb(0, 0, 0);
}

.active {
  display: flex;
}

// .cancelSelect {
//   // position: absolute;
//   padding-left: 3rem;
//   border: none;
//   background-color: transparent;
// }

@media screen and (max-width: 480px) and (min-width: 320px) {
  .flex{
    flex-direction: column;
  }

  .buttons{
    margin:  0;
  }

  .btn{
    margin: .5rem 0;
    
  }
  .btn+.btn{
      margin-right:.5rem;
    }

  .search_bar{
    width: 200px;
  }

  .btn--search{
     left: 180px;
  }

  .cancelLocation,.cancelSelect{
    left: 165px;
  }
}
</style>
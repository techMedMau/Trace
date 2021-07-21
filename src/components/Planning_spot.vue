<template>
  <div class="spot">
    <!-- 點擊input可以拿到裡面的內容 -->
    <input
      class="input place"
      type="text"
      v-model="spotLocation"
      placeholder="輸入地點"
      :readonly="!editable"
      required
      @change="geocoding"
    />
    <p class="warning" v-show="isNotFound">無法找到對應經緯度</p>
    <button
      type="button"
      class="btn_delete"
      v-show="editable"
      @click="deletePost"
    >
      ✖️
    </button>
    <!-- <button @click="test">spot測試</button> -->
  </div>
</template>

<script>
import { spotDelete, spotUpdate } from "@/request/http.js";
import axios from "axios";
export default {
  props: ["id", "location", "editable", 'lat','lng','date', 'index'], //一個地點的專屬id
  // inject:['editable'],
  data() {
    return {
      isNotFound: false,
      spotLocation: this.location,
      spotLat: this.lat,
      spotLng: this.lng,
      spotData: {
        id: this.id,
      }
   
    };
  },
  methods: {
   
    deletePost() {
      let vm = this;
      
      
      spotDelete(this.spotData)
        .then((res) => {
          console.log(res);
          console.log("地點刪除成功");
          if(res.request.status === 200){
               vm.$emit('deleteSpot',this.index);
          }
        })
        .catch((err) => {
          console.log(err.response);
          console.log("地點刪除失敗");
        });
      
      //地點刪除成功要刷新畫面
    },
    geocoding() {
      // console.log('做地址轉換囉')
      let vm = this;
      // ?address=Taiwan 限定台灣
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: vm.spotLocation,
            key: "AIzaSyBmVB9S4alRd0MAHIT2zblsnVorQD8r8uE",
          },
        })
        .then(function (res) {
          // console.log('輸入進來的地址：'+vm.spotLocation)
          if(res.data.status === 'ZERO_RESULTS'){
            vm.isNotFound = true;
          }else{
            vm.spotLat = res.data.results[0].geometry.location.lat;
            vm.spotLng = res.data.results[0].geometry.location.lng;
            vm.isNotFound = false;
          }
          // console.log('確認狀態');
          // console.log(res.request.status)
          if(res.request.status === 200){
              const updateData = {
                  scheduleId: vm.id,
                  tripId:localStorage.getItem('trip'),
                  time: vm.date,
                  location: vm.spotLocation,
                  latitude: vm.spotLat,
                  longitude: vm.spotLng
              }
              // console.log(updateData)
              spotUpdate(updateData)
              .then(res=>{
                  console.log(res.data)
                  // console.log('修改成功')
              })
              .catch(err=>{
                  console.log(err.response)
                   console.log('修改失敗')
              })
          }
        })
        .catch(function (err) {
          console.log(err);
        });
        
    },
  },
};
</script>

<style scoped>

.spot {
  /* padding:1rem .5rem 1rem 4rem; */
  /* background-color: #ddd; */
  border-left: 2px solid #666;
  margin-left: 4px;
  height: 60px;
  position: relative;
  box-sizing: border-box;
  /* margin-right:3rem; */
}

.place {
  margin: 1rem 0.5rem 0 2rem;
  line-height: 1.4rem;
}

.title,
.location {
  height: 2rem;
  font-size: 16px;
}

.input {
  display: inline;
  border: none;
  /* width: 80%; */
  background-color: transparent;
}

input:focus {
  outline: none;
}
.btn_delete {

  /* vertical-align: middle; */
  display: inline;
  margin:0 2rem;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 32%;
}

.btn_delete:hover {
  background-color: #ddd;
}

.warning {
  font-size: 10px;
  background-color: #000;
  border-radius: 3px;
  margin: 0 0 0 2rem;
  padding: 3px 0.5rem;
  color: #fff;
  width: max-content;
}
</style>
<template>
  <div class="day_container">
    <div class="display_date">
      <div class="dot"></div>
      <!-- 父元件傳來的日期yyyy/mm/dd -->
      <input
        v-if="!index"
        class="input date"
        type="date"
        v-model="startDate"
        :readonly="index === 0 ? false : true"
        @change="changeFirstDayPost"
      />
      <input v-else v-model="date" class="input date" type="date" readonly/>
    </div>
    <!-- <h3 class="day" style="color:white">Day {{index+1}}</h3> -->
    <div>
      <!-- list要綁定array :list="list[index].value"-->
      <!-- <draggable class="list-group" group="day" >
       
        <Spot v-for="schedule in arrLength" :key="schedule.id" @info="getInfo" :index="schedule.id"/> -->
      <!-- <div v-for="value, index1 in list[index].value" :key="index1">{{list[index].value[index1]}}</div>
        <div>{{list[index].value}}</div> -->
      <!-- </draggable> -->
      <div class="list-group">
        <Spot
          v-for="(spot,index) in dataList"
          :key="spot.scheduleId"
          :index="index"
          @info="getInfo"
          :id="spot.scheduleId"
          :location="spot.location"
          :editable="editable"
          :lat="spot.latitude"
          :lng="spot.longitude"
          :date="date"
          @update="refresh"
          @deleteSpot="deleteSpot"
        />
      </div>

      <button v-show="editable" type="button" class="button_reset toleft"  @click="createSpotPost">
   <span class="material-icons">add_location</span>
<small  class="notice">新增地點</small>
</button>
   
     
    </div>
 
      <button v-show="editable && index !==0"  type="button" class="button_reset cancel"  @click="deleteWholeDay">
   <span class="material-icons">delete</span>
<small  class="notice">刪除整天行程</small></button>
    <!-- <button   @click="deleteWholeDay">✖️</button> -->
       <!-- <button @click="test">day測試</button> -->
  </div>
</template>


<script>
import axios from "axios";
import Spot from "@/components/Planning_spot";
// import draggable from 'vuedraggable'
import { scheduleAdd, firstDayUpdate, deleteDay } from "@/request/http.js";
export default {
  name: "Planning_day",
  props: {
    inputValue: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
    dataList: {
      type: Array,
      default() {
        return [];
      },
    },
    editable: {
      type: Boolean,
      default: false,
    },
    reRender:{
        type: Boolean,
        default: false,
    }
  },

  components: {
    Spot,// draggable
  },
  data() {
    return {
      test1:'check1',
      test2:'creatcheck',
      location: "",
      startDate: this.date,
      isCancel: false,
      spots: [],
      list1: [1, 2, 34, 4, 54],
      list2: [3, 5, 23, 59, 37],
      list: [
        { name: "list1", value: [1, 2, 34, 4, 54] },
        { name: "list2", value: [3, 5, 23, 59, 37] },
      ],
    };
  },
  created() {

   
  },
  watch: {
    //使用者更改第一天日期後重新計算後面所有日期
    startDate(now, before) {
      if (now === before) {
        return;
      }
      this.$emit("update:inputValue", this.startDate);
    },
    reRender(){
        this.refresh()
    }
    // spots(now, before) {
    //   if (now !== before) {
    //     before = now;
    //   }
    // },
  },
  
  methods: {
    // test() {
    //         console.log(this.date)
        
    // },
    //刪除一整天
    deleteWholeDay(){  
       let vm = this;
        const dayData = {
            tripId: localStorage.getItem('trip'),
            date: this.date
        }
        // console.log('刪除的那一天')
        // console.log(dayData)
        //第一隻
        deleteDay(dayData)
        .then( res=>{
            console.log(res.data);
            if(res.request.status === 200){
                //第二隻
                // console.log('!!')
                vm.$emit('deleteDate',this.index);
                
            }
            // console.log('刪除整天成功')

        }).catch(err=>{
            console.log(err);
            // console.log('刪除整天失敗')
        })
        
        
    },
    deleteSpot(removeIndex){
         this.dataList.splice(removeIndex, 1);
    },

    //改變第一天
    changeFirstDayPost(){
        const firstDayData = {
            tripId:localStorage.getItem('trip'),
            date: this.inputValue
        }
        console.log(this.date)
        firstDayUpdate(firstDayData)
        .then(res=>{
            console.log(res)
            console.log("修改第一天成功")
        })
        .catch(err=>{
            console.log(err.response)
            console.log("修改第一天失敗")
        })
        

    },
    refresh() {
       
      let vm = this;
      const sendData = {
        tripId: localStorage.getItem("trip"),
        date: this.date,
      };
      axios
        .get("http://34.80.22.91/api/TripEvent/Schedules", { params: sendData })
       
        .then(function (res) {
          vm.spots = res.data;
          // console.log('spots們')
          // console.log(vm.spots)
        })
        .catch(function (err) {
          console.log(err.response);
        });
    },
    dateFunction(event) {
      console.log(event);
    },
    cancel() {
      this.isCancel = true;
    },
    //新增地點api
    createSpotPost() {
      let vm = this;
      const scheduleAData = {
        tripId: localStorage.getItem('trip'),
        time: this.date,
        location: this.location,
        longtitude: null, //undefined
        latitude: null, //undefined
      };
      // console.log(scheduleAData);
      scheduleAdd(scheduleAData)
        .then((res) => {
          // console.log(res.data);
          if (res.request.status === 200) {

            const spot = {
                latitude: null,
                longitude: null,
                location: '',
                scheduleId: res.data.scheduleId,
                time: this.date,
                tripId:localStorage.getItem('trip')
            }
            this.dataList.push(spot)
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    //接收子元件傳來的地點
    getInfo(place, index) {
      console.log(place + "|" + index);
    },
    //修改起始日期
    startDateChange(startDate) {
      this.$emit("changeStartDate", startDate);
    },
    // send() {
    //   for (let i = 0; i < this.schedules.length; i++) {
    //     scheduleAdd(this.schedules[i])
    //       .then((res) => {
    //         alert("新增行程成功");
    //         this.$router.go(0);
    //       })
    //       .catch((err) => {
    //         alert("新增失敗");
    //       });
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.display {
  display: flex;
  justify-content: center;
  /* overflow-y: scroll; */
}

.day_container {
  position: relative;
  padding: 1.5rem 0;
  /* background-color: rgba(59, 59, 59, 0.466); */
  
  /* display: flex; */
  /* margin:1rem; */
}

.display_date {
  display: flex;
  align-items: center;
 
}

.dot {
  
  display: inline;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #666;
  margin-right: 1rem;
  /* border-top:2px solid #000; */
}

.input {
  display: flex;
  background: transparent;
  height: 2rem;
  margin-right:1rem;
  // width: 150px;
  border: none;
  /* margin:0 0 0 3rem; */
  border-radius: 3px;
}

.date {
  /* margin:.5rem 0; */
  line-height: 1.4rem;
}

input:focus {
  outline: none;
}

.new_spot {
  border: none;
  border-radius: 3px;
  margin-top: 0.5rem;
}





.button_reset{
  border:none;
  background-color: transparent;
  position: relative;
  padding:.5rem 0;
  &:hover > .notice{
    display: block;
    width: max-content;
    left:100%;
  //  top:-.5rem;
    position: absolute;

  }
}
.notice{
  display: none;
}

.cancel {
  position: absolute;
  top: -.5rem;
  right: 2rem;
  margin-top: 0.5rem;
  // &:hover> .notice{
  //    display: block;
  //   width: max-content;
  //   // left:100%;
  //  top:-.5rem;
  //   position: absolute;
  // }
   &:hover > .notice{
    display: block;
    width: max-content;
    left:100%;
    bottom:1.5rem;
    position: absolute;

  }
}

.toleft{
  display: flex;
  justify-content: flex-start;
}


</style>



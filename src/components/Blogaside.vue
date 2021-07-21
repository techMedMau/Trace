<template>
  <nav class="nav_card">
            <!-- v-for="schedule in schedules"
          :key="schedule.id"
          :dataList="schedule.dataList"
          :date="schedule.time" -->
    <ul v-for="schedule in schedules"
          :key="schedule.id">
      <p class="date">{{ schedule.time.split("-").join("/") }}</p>
    
      <Li v-for="spot in schedule.dataList"
      :key="spot.scheduleId" :id="spot.scheduleId" 
      :isBrowsing='isBrowsing'
      :active="id === spot.scheduleId? true:false"
      :location="spot.location" :date="schedule.time" :latitude="spot.latitude" :longitutde="spot.longitude" @getSpotID="getSpotID"/>
     
    </ul>
  </nav>
</template>

<script>
import Li from '@/components/BlogasideLi'
export default {
  name: "Blogaside",
  props: ['schedules','isBrowsing'],
  components:{Li},
  data() {
    return {
      id: 0,
      
    };
  },
  created(){
    // console.log(this.schedules)
  },
  methods: {
    getSpotID(value, id){
      // console.log(id)
        this.id = id;
        this.$emit('getSpotID',value)
    }
  },
};
</script>

<style lang="scss" scoped>
.nav_card {
  display: block;
  /* background-color: #ddd; */
//   padding: 0.5rem;
  
}

.date {
  padding: 0.5rem;
  text-align: start;
  font-size: 18px;
  margin: 0;
}

ul{
  padding: 0;
  margin:0;
  &+&{
    margin-top:1rem;
  }
}

@media screen and (max-width: 480px) and (min-width: 320px) {
  .date{
    font-size:.9rem;
  }

}
</style>
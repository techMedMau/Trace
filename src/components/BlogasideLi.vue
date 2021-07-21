<template>
  
    <li class="spot" @click="getSpotInfo" >
      <p class="location" :class="{active:active}">{{location}}</p>
    </li>
  
</template>

<script>
export default {
  props: ["location",'latitude', 'longitude', "date", 'id', 'active','isBrowsing'],
  data(){
      return{
       
      }
  },
  methods: {
    getSpotInfo() {
      if(!this.isBrowsing){
        this.$toast.show('請先儲存編輯')
        return
      }
      const arr = [this.date, this.location, this.latitude, this.longitude];
      this.$emit("getSpotID", arr, this.id);
      
    //   this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.spot {
  box-sizing: border-box;
  width: 100%;
  text-align: end;
  padding:0 1rem;
  list-style: none;
  font-size: 1rem;
}

.location{
    margin: 0;
    padding: 5px 1rem;
    border-radius: 3px;
    width: max-content;
}
.active{
    background-color: #ddd;
}

@media screen and (max-width: 1000px) and (min-width: 768px) {
  /* .spot {
  
  padding:0 .5rem;
  
} */
} 


/* <768 */
 @media screen and (max-width: 768px) and (min-width: 320px) {
 .spot {
  
  padding:0 .5rem;
  
}
.location{
   padding: 5px 5px;
   font-size:14px;
}

} 


</style>
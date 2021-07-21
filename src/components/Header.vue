<template>

<div class="nav">
  <div class="logo">
    
   
    <input  type="text" class="title_input" v-model="tripInfo" :class="{'border':!isEditing}" :readonly="!isEditing" >
    <!-- <h1 v-else class="title">{{title}}</h1> -->
    <span v-if="this.$route.name === 'Planning_edit'"  @click="editing" class="material-icons pen">mode</span>
  
  </div>
  <div class="btns">
   
  
    <router-link v-if="this.$route.name === 'Planning_edit'"  to="/blog">
    旅遊札記
    </router-link >
   
     <router-link v-if="this.$route.name === 'blog'" to="/planning_edit">
    行程規劃
    </router-link >
       <p class="seperate">l</p>
        <router-link to="/map">
    地圖
    </router-link >
    </div>
</div>

</template>

<script>
import {
  eventEdit, eventGet
} from "@/request/http.js";
  export default {
    props:['tripID'],
    data(){
      return{
          // tripName: this.title,
          isEditing:false,
          tripInfo: undefined,
      }
    },
    created(){
      eventGet(this.tripID)
      .then((res) => {
        this.tripInfo = res.data.tripName;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    watch:{
      isEditing(){
        this.eventEditPost()
      }
    },
    methods: {
      logout(){
       localStorage.removeItem('token')
        this.$router.push('/login');
      },
      editing(){
          this.isEditing = !this.isEditing
          // if(this.$route.name === 'Planning_edit'){
          //   this.$emit('editingFriend', this.isEditing)
          // }
      },
      eventEditPost(){
        if(this.isEditing === false){
            const eventData = {

                tripId: this.tripID,
                tripName: this.tripInfo
            }
            // console.log('在測試這ㄍㄜ')
            // console.log(eventData)
            eventEdit(eventData)
            .then(res=>
            
            console.log(res)
            ).catch(err=>{
              console.log(err)
            })
        }
    },


    }
  }
</script>
<style lang="scss" scoped>



.logo{
  display: flex;
  margin-left:80px;
}

.seperate{
  display: inline;
}




.nav{
  position:fixed;
  width:100vw;
  // min-width: 1200px;
  background-color:#fff;
  display: flex;
  justify-content: space-between;
  top:0;
  box-shadow:  0 0 5px 1px rgb(223, 223, 223) ; 
  height: 80px;
  z-index: 1;
}

.title{
  color:#000e29;
  margin:0;
  line-height: 90px;
  
  /* padding: 1rem; */
  font-size:1.5rem;
  text-align:center;
  /* text-align:unset; */
}

.title_input{
  margin-left:1rem;
  margin-top:1.8rem;
  color:#000e29;
  
  font-size:1.5rem;
  width: 180px;
  border-radius: 4px;
  height: max-content;
  text-align:center;
  font-weight: bold;
  border:none;
  border-bottom:2px dashed #000e29;
  
}



.border{
  border:none;
}

.btns{
display: block;
align-items: center;
margin-top:1.8rem;
margin-right:1.5rem;
}
a{
  display: inline-block;
  
  text-decoration: none;
  margin:  .5rem;
  // line-height:80px;
  // position: relative;
  color:#000;
}

.notice {
  display: none;
}



.pen{
  margin-left:.5rem;
}
.pen::before{
  content:'';
  display: block;
  height: 40%;
}

@media screen and (max-width: 1024px) {
  .logo{
   margin-left:0;
  }
} 

/* <768 */
/* @media screen and (max-width: 768px) {
  
} */

/* 320~480 */
@media screen and (max-width: 480px) and (min-width: 320px) {



.title_input{
width: 110px;
}


}

</style>
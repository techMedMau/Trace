<template>
 <div class="whole">
   <div class="container flex mx-auto">
  <!-- logo區 -->
   <div class="logos">
     <div class="img_inner">
       <img src="@/assets/Trace.png" alt="Logo" class="img_resp">
     </div>
      <div class="marker_inner mx-auto">
        <img src="@/assets/place.png" alt="" class="marker_resp">
      </div>
   </div>

   <!-- 打字區 -->
    <div class="space">
      <ul class="nav_bar center">
        <li :class="{active:isSignIn}"><button  class="tab" @click="isSignIn=true">SIGN IN</button></li>
        <li :class="{active:!isSignIn}"><button class="tab" @click="isSignIn=false">SIGN UP</button></li>
      </ul>
      <div class="card">
        <SignInCard v-show="isSignIn"/>
        <SignUpCard v-show="!isSignIn"/>
      </div>
      </div>
    </div>
   

</div>
</template>

<script >
import SignInCard from '@/components/SignInCard.vue'
import SignUpCard from '@/components/SignUpCard.vue'
import Header from '@/components/Header'


export default {
  components:{
    SignInCard, SignUpCard, Header 
  },
  data() {
    return {
      // userName: "",
      // password: "",
      // registedPassword:"",
      // registedName:"",
      isSignIn: true,
    };
  },
  created(){
    
  }
  

};
</script>

<style scoped>

.whole{
 position: relative;
  background-color: #ddd;
  height:100vh;
  width: 100vw;
  
}

.container{
   position: absolute;
   top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: max-content;
  align-items: center;
}
.mx-auto{
  margin-left: auto;
  margin-right: auto;
}

.logos{
  padding:5rem 5rem 5rem 0;
}

.marker_inner{
  width: 20px;
  padding-top:3rem;
}

.marker_resp{
  width: 100%;
}

.center{
  display: flex;
 justify-content: center;
}

.space{
  background-color: rgb(182, 182, 182);
  width:max-content;
  border-radius: 4px;
  border: 2px solid #ddd;
  padding:1.5rem;
}

.nav_bar{
  margin: 0;
  padding: 0;
 list-style: none;
}

.active{
  background-color: rgba(255,255,255, .8);
}

.tab{
  /* border-radius: 4px; */
  padding:.5rem 2.5rem;
  border: none ;
   background-color: transparent;
  
}


ul{
  border:2px solid rgba(255, 255, 255, .8);
  /* border-radius:2px; */
}

li{
  font-size:14px;
  
}

li+li{
 
  border-left:2px solid rgba(255,255,255, .8);
}
/* .login{
  display: flex;
  padding:0;
}

.sign_in, .sign_up{
  list-style: none;
}

.form {
  text-align: center;
  flex-direction: column;
  max-width: 200px;
  margin: 0 auto;
}

input {
  border: 1px;
  border-bottom-style: solid;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
}
label {
  display: block;
  padding-top: 0.5rem;
}

button {
  margin-top: 0.5rem;
} */@media screen and (max-width: 1023px) and (min-width: 480px) {
  /* .whole{
 position: relative;
  background-color: #ddd;
  height:100vh;
  width: 100vw;
  
} */
  
  .container{
   position: absolute;
   top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: max-content;
  align-items: center;
}

.logos{
  padding:1rem ;
}
}

@media screen and (max-width: 480px) and (min-width: 320px) {
 
 .container{
   position: absolute;
   top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: max-content;
  align-items: center;
}

.logos{
  padding:.5rem ;
}

.space{
  background-color: rgb(182, 182, 182);
  width:max-content;
  border-radius: 4px;
  border: 2px solid #ddd;
  padding:1rem;
}

}





</style>
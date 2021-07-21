<template>
      <form @submit.prevent="loginPost" class="form">
        <label for="username">
          <p class="label_title">ACCOUNT</p>
        <input type="text" v-model.lazy="userData.userAccount" name="username" placeholder="請輸入帳號" required /></label>
        <p class="notice" v-if="!suitableName">帳號不符合格式</p>
     
        <label for="password"> <p class="label_title">PASSWORD</p>
        <input type="password" v-model.lazy="userData.userPassword" placeholder="請輸入密碼" required /></label>
        <p class="notice" v-if="!suitablePassword">密碼不符合格式</p>
    <div class="center">
        <button type="submit" class="btn_login">GET STARTED</button>
        </div>
      </form>

</template>

<script>
import {login} from '@/request/http.js'
export default {
  name:'SignInCard',
  data() {
    return {
      userData:{
        userAccount: '',
        userPassword: ''
      },
      userID:'',
      suitableName:true,
      suitablePassword:true
    };
  },
  watch:{
      'userData.userAccount'(newValue) {
            this.checkUserName(newValue)
        },
      'userData.userPassword'(newValue){
            this.checkPassword(newValue)
        },
  },
  methods: {
    loginPost() {
      if(this.suitableName === true && this.suitablePassword === true){
          login(this.userData)
          .then((res) => {
              // console.log("登入成功");
              this.$store.state.userID = res.data.userId;
              localStorage.setItem("token", res.data.userId);
              // console.log(res.data)
              
              this.$router.push("/map");
          })
          .catch((err) => {
            console.log(err.response)
              
              alert(`登入失敗${err.response.data}`);
          }); 
      }
      // let auth = true;
      // if (this.userData.userAccount === "maureen" && this.userData.userPassword === "aaaaaa") {
        
      //   localStorage.setItem("token", "ImLogin");
      //   this.$router.push("/");
      // } else alert("login failed");
    },
    checkUserName(newValue){
            if(this.userData.userAccount.length<6 || this.userData.userAccount.length>10){
                 this.suitableName = false;
            }else{
              this.suitableName = /^[a-zA-Z0-9]+$/.test(newValue);
            }
        },
        checkPassword(newValue){
            if(this.userData.userPassword.length<6 || this.userData.userPassword.length>10){
                 this.suitablePassword = false;
            }else{
            this.suitablePassword = /^[a-zA-Z0-9]+$/.test(newValue);}
        },
  }
}
</script>

<style scoped>
.center{
  display: flex;
  justify-content: center;
}
*{
    box-sizing: border-box;
}
.sign_in{
  list-style: none;
}


.form {
  text-align: start;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.label_title{
    margin:0;
}

input {
  width:100%;
  border: 1px solid #fff;
  margin-top:.5rem;
  
    padding:.5rem;
    background-color: rgb(182, 182, 182);

}

input:focus{
  outline: none;
}

input::placeholder{
    font-size:13px;
    background-color:rgb(182, 182, 182);

}

label {
   font-size: 13px;
  display: block;
  padding-top: 1rem;
}

button {
 margin: 1rem 0;
}

.display{
    display: none;
}

.notice{
    width: max-content;
    margin:3px 0;
    color:#fff;
    background-color: #000;
    border-radius:3px;
    padding:3px;
    font-size: 12px;
}

.btn_login{
  background-color: rgba(255,255,255,.7);
  border:none;
  padding:.5rem;
  margin-bottom: 0;
}

</style>
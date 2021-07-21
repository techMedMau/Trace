<template>
  <form @submit.prevent="registed" class="form">
    <label for="account">
      <p class="label_title">USERNAME</p>
      <input
        type="text"
        v-model.lazy="userData.userName"
        name="username"
        placeholder="請輸入使用者名稱"
        required
    /></label>
    
    <label for="account">
      <p class="label_title">ACCOUNT</p>
      <input
        type="text"
        v-model.lazy="userData.userAccount"
        name="username"
        placeholder="請輸入6~10個英文或數字"
        required
    /></label>
    <p class="notice" v-if="!suitableAccount">帳號不符合格式</p>

    <label for="password">
      <p class="label_title">PASSWORD</p>
      <input
        type="password"
        v-model.lazy="userData.userPassword"
        placeholder="請輸入6~10個英文或數字"
        required
    /></label>
    <p class="notice" v-if="!suitablePassword">密碼不符合格式</p>

    <label for="comfirm password"
      ><p class="label_title">COMFRIM PASSWORD</p>
      <input
        type="password"
        v-model.lazy="comfirmPassword"
        placeholder="再次輸入密碼"
        required
    /></label>
    <p class="notice" v-if="!sutitableComfirm">確認密碼錯誤</p>
    <div class="center">
    <button type="submit" class="btn_login">SIGN UP</button>
</div>
    <!-- @click="checkUserName(registedPassword,comfirmPassword)" -->
  </form>
</template>

<script>
import { registration } from "@/request/http.js";
export default {
  name: "SignUpCard",
  data() {
    return {
      userData: {
        userAccount: "",
        userPassword: "",
        userName: "",
      },
      comfirmPassword: "",
      suitablePassword: true,
      sutitableComfirm: true,
      suitableAccount: true,
    };
  },
  watch: {

    "userData.userAccount"(newValue) {
      this.checkAccount(newValue);
    },
    "userData.userPassword"(newValue) {
      this.checkPassword(newValue);
    },
    comfirmPassword(newValue) {
      this.checkConfirm(newValue);
    },
  },
  methods: {
    checkAccount(newValue) {
      if (
        this.userData.userAccount.length < 6 ||
        this.userData.userAccount.length > 10
      ) {
        this.suitableAccount = false;
      } else {
        this.suitableAccount = /^[a-zA-Z0-9]+$/.test(newValue);
      }
    },
    checkPassword(newValue) {
      if (
        this.userData.userPassword.length < 6 ||
        this.userData.userPassword.length > 10
      ) {
        this.suitablePassword = false;
      } else {
        this.suitablePassword = /^[a-zA-Z0-9]+$/.test(newValue);
      }
    },
    checkConfirm(newValue) {
      if (newValue !== this.userData.userPassword) {
        this.sutitableComfirm = false;
      } else {
        this.sutitableComfirm = true;
      }
    },
    registed() {
      if (
        this.suitableAccount === true &&
        this.suitablePassword === true &&
        this.sutitableComfirm === true
      ) {
        registration(this.userData)
          .then((res) => {
            alert("註冊成功請再次登入");
          })
          .catch((err) => {
            
            this.$toast.show(`註冊失敗：${err.response.data.message}`)
          });
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.sign_up {
  list-style: none;
}

/* .form {
 align-items: center;
  
  
} */

.label_title {
  margin: 0;

}

.center{
  display: flex;
  justify-content: center;
}

input {
  width: 100%;
  border: 1px solid #fff;
  margin-top: 0.5rem;

  padding: 0.5rem;
  background-color: rgb(182, 182, 182);
}

input:focus {
  outline: none;
}

input::placeholder {
  font-size: 13px;
  background-color: rgb(182, 182, 182);
}

label {
  display: block;
  padding-top: 1rem;
  font-size: 13px;
  width: 100%;
}

button {
  margin: 1rem 0;
}

.display {
  display: none;
}

.notice {
  width: max-content;
  margin: 3px 0;
  color: #fff;
  background-color: #000;
  border-radius: 3px;
  padding: 3px;
  font-size: 12px;
}

.btn_login {
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 0.5rem;
  margin-bottom: 0;
 
  
}


</style>
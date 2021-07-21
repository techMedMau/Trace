<template>
<div> 
<!-- <input type="file" accept="image/*" @change="test"> -->
  <Header :title="'編輯旅遊紀錄'"/>
  <div class="container mx-auto display">
    <div class="text ">
      <div class="first_row mx-auto">
      <input
        class="input title"
        type="text"
        v-model.lazy="contentSend.title"
        name="title"
        placeholder="標題"
        :readonly="readOnly"
        required
      />

      <input
        class="input location"
        type="text"
        v-model.lazy="contentSend.location"
        placeholder="地點"
        @change="geocoding"
        :readonly="readOnly"
        required
      />

      <input
        class="input date"
        type="date"
        v-model.lazy="contentSend.time"
        :readonly="readOnly"
        required
      />
      </div>
      <div class="input" style="width: 80%; margin: 0.5rem auto">
        <!-- <multiselect
          v-model.lazy="value2"
          placeholder="好友名單"
          :options="options"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
        ></multiselect> -->
        <!-- <pre class="language-json"><code>{{ value2  }}</code></pre> -->
      </div>
      <!-- 是和誰一起的欄位 -->
      <!-- 玉賢慧傳好友名單給我 我再去讓使用者選曲 -->
      <textarea
        id="textContent"
        class="form"
        v-model.lazy="contentSend.articleContent"
        name="mytext"
        rows="6"
        cols="40"
        :readonly="readOnly"
      ></textarea>
      <!-- <div>{{translate()}}</div> -->
      <button class="edit" @click="readOnly = false">編輯</button>
      <button class="confirm" @click="readOnly = true; createContent()">確認</button>
    </div>
    <!-- 上傳圖片 -->
    <div class="upload">
      <div class="img_list">
  
        <Card @updatePics="getPics"/>

      </div>

     
    </div>
    <Nav />
  </div>
  </div>
</template>



<script>
import Header from '@/components/Header'
import axios from 'axios';
// import Multiselect from "vue-multiselect";
import Nav from "@/components/Navbar";
import Card from "@/components/Photocard";
import {blogTextGet, blogTextCreate, photoTest } from "@/request/http.js";

export default {
  name: "Oldblog",
  components: {  Nav, Card, Header },
  data() {
    return {
      readOnly: false,
      value: null,
      value2: [],
      options: ["John", "Jack", "Mau", "Steve", "Mike"],
      pics: [],
      contentSend: {
        founderId: 1,
        time: "",
        location: "",
        longitude: 0,
        latitude: 0,
        tripId: 3,
        title: "",
        articleContent: "",
        photo: [],
      },
      testText:{
        ftlId: 1 , 
        photoName: '2' ,
        photoType:'', 
        photoImg: [],
      }
    };
  },
  created(){
    blogTextGet(5).then((res) => {
        console.log(res)
        this.contentSend.title = res.data.title;
        this.contentSend.articleContent = res.data.articleContent;
        this.contentSend.location = res.data.location;
        this.contentSend.time = res.data.time;
      })
      .catch(function (err) {
        console.log(err);
      });;
  },
  methods: {
    geocoding() {
      console.log('做地址轉換囉')
      let vm = this;
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: vm.contentSend.location,
            key: "AIzaSyBmVB9S4alRd0MAHIT2zblsnVorQD8r8uE",
          },
        })
        .then(function (res) {
          console.log(res);
          console.log('輸入進來的地址：'+vm.contentSend.location)
          console.log(typeof res.data.results[0].geometry.location.lat)
          vm.contentSend.latitude = res.data.results[0].geometry.location.lat;
          vm.contentSend.longitude = res.data.results[0].geometry.location.lng;
          // console.log(res.data.results[0].geometry.location.lng)  
        })
        .catch(function (err) {
          alert("輸入的位置無法找到對應經緯度，是否繼續")
          console.log(err);
        });
    },
    getPics(preview,img) {
     
      this.testText.photoImg.push(img);
      console.log(this.testText.photoImg)
    },
    createContent() {
      console.log(this.contentSend)
      blogTextCreate(this.contentSend)
        .then((res) => {
          console.log(res)
          alert("新增成功");
         
        })
        .catch((err) => {
          console.log(err)
          alert("新增失敗");

        });
    // const formData = new FormData();
    //   formData.append('ftlId', 1);
    //   formData.append('photoName', 'test');
    //   formData.append('photoType','png');
    //   formData.append('photoImg', this.testText.photoImg);

    //   console.log(this.testText.photoImg)

    //   axios.post( 'http://34.80.22.91/api/Test',formData,{
    //     headers: {'Content-Type': 'multipart/form-data'}
    //   }).then(function(){
    //     alert('照片上傳成功！')
    //   })
    //   .catch(function(){
    //     alert('照片上傳失敗！')
    //   });
    },
    addTag(newTag) {
      // const tag = {
      //   name: newTag,
      //   code: newTag + Math.floor((Math.random() * 10000000))
      // }
      this.options.push(newTag);
      this.value2.push(newTag);
    },
    //點擊可以刪除照片
    // choice(e){
    //  console.log(e.target.src)
    //  this.preview_list = this.preview_list.filter(function(item){
    //    return item != e.target.src
    //  })
    // },
    //會紀錄空白和換行
    // translate() {
    //   var keep = this.content;
    //   console.log(keep)
    //   keep = keep.replace(/(\r\n)|(\n)/g, "<br/>"); //换行符替换为<br/>
    //   keep = keep.replace(/\s/g, "&nbsp;"); //空格替换为
    //   return keep;
    // },

  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top:120px;
  width: 1200px;
  
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.display {
  display: flex;
  text-align: center;
}

.text {
  width: 70%;
    // justify-content: space-between;
}

.first_row{
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.form {
  margin: 1rem auto;
  height: 75%;
  width: 80%;
  border: none;
  background-color: #ddd;
  border-radius: 8px;
  resize: none;
  display: block;
}
.title,
.location {
  font-size: 16px;
}

.input {
  height: 2.2rem;
  width: 200px;
  border: none;
  background-color: #ddd;
  margin-bottom: .5rem;
  border-radius: 3px;
}

input:focus,
textarea:focus {
  outline: none;
}

// input[type="file"] {
//   color: rgba(0, 0, 0, 0);
// }

// .chosen {
//   margin: 1rem auto;
//   display: block;
//   width: 110px;
// }

.img_list {
  padding: 1rem 0 0 0;
  width: 100%;
  display: block;
  background-color: rgb(27, 42, 56);
  border-radius: 5px;
  //    flex-direction: column;
  //    justify-content: center;
  height: 95%;
  overflow: scroll;
  //  justify-content: center;
}

// .img_inner {
//   width: 250px;
//   margin-bottom: 1rem;
//   padding: 0.5rem;
//   background-color: rgba(173, 209, 230, 0.8);
//   border-radius: 4px;
// }

// .img_resp {
//   display: block;
//   width: 100%;
//   margin-bottom: 0.5rem;
// }

.upload {
  width: 25%;
}

// .upload_btn {
//   width: 150px;
// }

// .clear {
//   display: inline-block;
// }
</style>

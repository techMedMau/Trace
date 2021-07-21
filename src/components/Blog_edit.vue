<template>
  <div class="card">
    <!-- 作者區 / 上 -->
    <div class="block_author">
      <div class="left">
        <div class="img_inner">
          <img
            :src="`${src ? `${api}${src}` : defaultImg}`"
            alt="photo"
            class="img_resp"
            :onerror="defaultImgOn"
          />
        </div>
        <p class="author">{{ author }}</p>
      </div>
      <div class="right_btns">
        <button type="button" @click="contentPost" class="btn_reset">
          <span class="material-icons">done</span>
          <small class="notice">儲存編輯</small>
        </button>
        <!-- <button type="button" @click="deletePost" class="btn_reset">
          <span class="material-icons">clear</span>
          <small class="notice">刪除</small>
        </button> -->
      </div>
    </div>

    <input
      type="text"
      class="title"
      placeholder="標題"
      v-model.lazy="record.title"
      required
    />

    <!-- 文章區 / 下 -->
    <div class="block_text">
      <!-- 文字區 / 左 -->

      <div class="left">
        <textarea
          v-model.lazy="record.articleContent"
          class="content"
          rows="10"
          placeholder="寫下你的旅程：>"
        >
        </textarea>
      </div>

      <!-- 照片區 / 右  下面無敵冗 有時間再改  用bind(:)就可以動態賦予參數！！！！！-->
      <div class="right photo_list">
        <!-- <Photo v-for="(i, index) in previews" :key="index" :index="index" @updatePics="updatePics" :previews="previews"/> -->
        <label for="file" class="space">
          <div class="photo_outer">
            <div class="photo_inner" @click="induceClick">
              <span class="icon" v-if="preview === null">+</span>

              <img v-if="preview !== null" :src="preview" class="photo_resp" />
            </div>
          </div>
          <input
            id="input"
            type="file"
            accept="image/*"
            @change="previewImage"
            class="upload_btn"
          />
          <button v-if="preview !== null" class="delete" @click="reset">
            ✖️
          </button>
        </label>

        <label for="file" class="space">
          <div class="photo_outer">
            <div class="photo_inner" @click="induceClick1">
              <span class="icon" v-if="preview1 === null">+</span>

              <img
                v-if="preview1 !== null"
                :src="preview1"
                class="photo_resp"
              />
            </div>
          </div>
          <input
            id="input1"
            type="file"
            accept="image/*"
            @change="previewImage1"
            class="upload_btn"
          />
          <button v-if="preview1 !== null" class="delete" @click="reset1">
            ✖️
          </button>
        </label>

        <label for="file" class="space">
          <div class="photo_outer">
            <div class="photo_inner" @click="induceClick2">
              <span class="icon" v-if="preview2 === null">+</span>

              <img
                v-if="preview2 !== null"
                :src="preview2"
                class="photo_resp"
              />
            </div>
          </div>
          <input
            id="input2"
            type="file"
            accept="image/*"
            @change="previewImage2"
            class="upload_btn"
          />
          <button v-if="preview2 !== null" class="delete" @click="reset2">
            ✖️
          </button>
        </label>

        <label for="file" class="space">
          <div class="photo_outer">
            <div class="photo_inner" @click="induceClick3">
              <span class="icon" v-if="preview3 === null">+</span>

              <img
                v-if="preview3 !== null"
                :src="preview3"
                class="photo_resp"
              />
            </div>
          </div>
          <input
            id="input3"
            type="file"
            accept="image/*"
            @change="previewImage3"
            class="upload_btn"
          />
          <button v-if="preview3 !== null" class="delete" @click="reset3">
            ✖️
          </button>
        </label>

        <label for="file" class="space">
          <div class="photo_outer">
            <div class="photo_inner" @click="induceClick4">
              <span class="icon" v-if="preview4 === null">+</span>

              <img
                v-if="preview4 !== null"
                :src="preview4"
                class="photo_resp"
              />
            </div>
          </div>
          <input
            id="input4"
            type="file"
            accept="image/*"
            @change="previewImage4"
            class="upload_btn"
          />
          <button v-if="preview4 !== null" class="delete" @click="reset4">
            ✖️
          </button>
        </label>
        <!--  -->
      </div>
    </div>
    <!-- <button @click="test">卡片測試</button> -->
    <!-- <button type="button" @click="contentPost">儲存記錄</button> -->
    <!-- <button type="button" @click="deletePost">✖️</button> -->
  </div>
</template>

<script>
import axios from "axios";
import {
  userInfoGet,
  blogTextPost,
  blogTextEdit,
  photoDelete,
  blogTextDelete,
  photosDelete,
} from "@/request/http.js";
import Photo from "@/components/UploadPhoto";
export default {
  name: "Blog_edit",
  props: ["mine", "ftlID", "isExisted", "hasArticle"],
  components: { Photo },
  data() {
    return {
      record: this.mine[0],
      defaultImgOn:'this.src="' + require('@/assets/a.jpg') + '"',
      defaultImg: require("@/assets/a.jpg"),
      api: "http://34.80.22.91/",
      author: "",
      src: "",
      title: "",
      content: "",
      preview: null,
      image: null,
      imageID: 0,
      preview1: null,
      image1: null,
      imageID1: 0,
      preview2: null,
      image2: null,
      imageID2: 0,
      preview3: null,
      image3: null,
      imageID3: 0,
      preview4: null,
      image4: null,
      imageID4: 0,
      previews: [],
      // previews:new Array(5),
      // images:new Array(5),
    };
  },
  created() {
    //取得使用者名稱跟照片 => 自動填上
    userInfoGet(this.$store.state.userID)
      .then((res) => {
        // console.log(res.data);
        this.author = res.data.userName;
        this.src = res.data.userPhotoPath;
      })
      .catch((err) => {
        console.log(err);
      });
    
    if(this.mine.length){
   
    if (this.mine[0].photoPath[0]) {
      this.preview = this.mine[0].photoPath[0].photoPath;
      this.imageID = this.mine[0].photoPath[0].photoId;
    }
    if (this.mine[0].photoPath[1]) {
      this.preview1 = this.mine[0].photoPath[1].photoPath;
      this.imageID1 = this.mine[0].photoPath[1].photoId;
    }
    if (this.mine[0].photoPath[2]) {
      this.preview2 = this.mine[0].photoPath[2].photoPath;
      this.imageI2 = this.mine[0].photoPath[2].photoId;
    }
    if (this.mine[0].photoPath[3]) {
      this.preview3 = this.mine[0].photoPath[3].photoPath;
      this.imageID3 = this.mine[0].photoPath[3].photoId;
    }
    if (this.mine[0].photoPath[4]) {
      this.preview4 = this.mine[0].photoPath[4].photoPath;
      this.imageID4 = this.mine[0].photoPath[4].photoId;
    }
    }
    
    // if (!this.mine.length) {
    //   this.title = "";
    //   this.content = "";
    //   this.photoPath = [];
    // }
  },
  //  watch:{
  //   mine:{
  //     handler(value){
  //       console.log(value)
  //       this.record = value;
  //     },
  //     deep:true,
  //   },
   
  //   // ftlID(now, before){
  //   //   console.log(',,,,,,,')
  //   //   this.ftlID = now;
  //   // },
  // //   // isExisted", "hasArticle"
  // //   isExisted(now, brfore){
  // //       this.isExisted = now;
  // //   },
  // //   hasArticle(now,before){
  // //     this.hasArticle = now;
  // //   }
  // },
  methods: {
    
    deletePost() {
       this.$emit("deleteMine");
     if(!this.hasArticle){
       return
     }
      const deleteData = {
        id: this.ftlID,
      };
      blogTextDelete(deleteData)
        .then((res) => {
          // console.log(res.data);
          // console.log("刪除文章成功");
          
        
        })
        .catch((err) => {
          console.log(err.response);
          // console.log("刪除文章失敗");
          
        });

      photosDelete(deleteData)
        .then((res) => {
          // console.log(res.data);
          // console.log("刪除圖片們成功");
          
        })
        .catch((err) => {
          console.log(err.response);
          
          // console.log("刪除圖片們失敗");
        });
    
     
    },

    test() {
      console.log(this.mine);
    },
    //按了儲存紀錄後做的事
    contentPost() {
      if(!this.record.title){
        this.$toast.show('請輸入標題')
        return
      }
      if (this.hasArticle) {
        const textDataUpdate = {
          ftlid: this.ftlID,
          tripId: parseInt(localStorage.getItem("trip")),
          title: this.record.title,
          articleContent: this.record.articleContent,
        };

        blogTextEdit(textDataUpdate)
          .then((res) => {
            // console.log(res);
            // console.log("修改文字成功");
            //做什麼讓父元件更新-----------
            if (res.status === 200) {
              if (this.preview) {
                this.previews.push({
                  photoId: this.imageID,
                  photoPath: this.preview,
                });
              }
              if (this.preview1) {
                this.previews.push({
                  photoId: this.imageID1,
                  photoPath: this.preview1,
                });
              }
              if (this.preview2) {
                this.previews.push({
                  photoId: this.imageID2,
                  photoPath: this.preview2,
                });
              }
              if (this.preview3) {
                this.previews.push({
                  photoId: this.imageID3,
                  photoPath: this.preview3,
                });
              }
              if (this.preview4) {
                this.previews.push({
                  photoId: this.imageID4,
                  photoPath: this.preview4,
                });
              }
              this.$emit(
                "updateText",
                this.record.title,
                this.record.articleContent,
                this.previews
              );
            }
            //  this.$router.push('/blog')
          })
          .catch((err) => {
            console.log(err.response);
            // console.log("修改文字失敗");
            if (err.response.status === 400) {
              if (this.preview) {
                this.previews.push({
                  photoId: this.imageID,
                  photoPath: this.preview,
                });
              }
              if (this.preview1) {
                this.previews.push({
                  photoId: this.imageID1,
                  photoPath: this.preview1,
                });
              }
              if (this.preview2) {
                this.previews.push({
                  photoId: this.imageID2,
                  photoPath: this.preview2,
                });
              }
              if (this.preview3) {
                this.previews.push({
                  photoId: this.imageID3,
                  photoPath: this.preview3,
                });
              }
              if (this.preview4) {
                this.previews.push({
                  photoId: this.imageID4,
                  photoPath: this.preview4,
                });
              }
              this.$emit(
                "updateText",
                this.record.title,
                this.record.articleContent,
                this.previews
              );
            }
          });

        return;
      }
     
      // const textData = {
      //   ftlid: this.ftlID,
      //   tripId: parseInt(localStorage.getItem("trip")),
      //   title: this.record.title,
      //   articleContent: this.record.articleContent,
      // };
      // // console.log(textData);
      // blogTextPost(textData)
      //   .then((res) => {
      //     // console.log(res);
      //     // console.log("新增文字成功");
      //     if (res.status === 200) {
      //       if (this.preview) {
      //         this.previews.push({
      //           photoId: this.imageID,
      //           photoPath: this.preview,
      //         });
      //       }
      //       if (this.preview1) {
      //         this.previews.push({
      //           photoId: this.imageID1,
      //           photoPath: this.preview1,
      //         });
      //       }
      //       if (this.preview2) {
      //         this.previews.push({
      //           photoId: this.imageID2,
      //           photoPath: this.preview2,
      //         });
      //       }
      //       if (this.preview3) {
      //         this.previews.push({
      //           photoId: this.imageID3,
      //           photoPath: this.preview3,
      //         });
      //       }
      //       if (this.preview4) {
      //         this.previews.push({
      //           photoId: this.imageID4,
      //           photoPath: this.preview4,
      //         });
      //       }
      //       this.$emit(
      //         "createText",
      //         this.record.title,
      //         this.record.articleContent,
      //         this.author,
      //         this.src,
      //         this.previews
      //       );
      //     }
        //   // this.$emit("reload");
        // })
        // .catch((err) => {
        //   console.log(err.response);
        //   // console.log("新增文字失敗");
        // });
      //post圖片??
      // this.$router.go(0);
    },

    //下面.............
    induceClick() {
      // if(this.preview){
      //   return
      // }
      document.querySelector("#input").click();
    },
    previewImage(event) {
      let vm = this;
      var input = event.target;
      let formData = new FormData();
      // console.log(this.ftlID)
      // console.log(parseInt(localStorage.getItem("trip")))
      formData.append("FtlId", this.ftlID);
      formData.append("TripId", parseInt(localStorage.getItem("trip")));
      formData.append("PhotoContent", input.files[0]);
      axios
        .post("http://34.80.22.91/api/Content/Photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          console.log("照片0上傳成功！");

          if (res.status === 200) {
            this.imageID = res.data.photoId;
            if (input.files) {
              var reader = new FileReader();
              reader.onload = (e) => {
                vm.preview = e.target.result;
              };
              vm.image = input.files[0];
              reader.readAsDataURL(input.files[0]);
            }
          }
        })
        .catch((err) => {
          console.log(err.response)
            this.$toast.show(`照片上傳失敗`);
        });
    },
    reset(e) {
      // console.log(this.imageID)
      let vm = this;
      photoDelete({ id: this.imageID })
        .then((res) => {
          // console.log(res);
          // console.log("成功");
          if (res.status === 200) {
            vm.image = null;
            vm.preview = null;
            this.$emit("deletePhoto", 0);
          }
        })
        .catch((err) => {
          console.log(err.response)
            this.$toast.show(`照片刪除失敗`);
        });
    },
    induceClick1() {
      document.querySelector("#input1").click();
    },
    previewImage1(event) {
      let vm = this;
      var input = event.target;
      let formData = new FormData();
      formData.append("FtlId", this.ftlID);
      formData.append("TripId", parseInt(localStorage.getItem("trip")));
      formData.append("PhotoContent", input.files[0]);
      axios
        .post("http://34.80.22.91/api/Content/Photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          console.log("照片1上傳成功！");

          if (res.status === 200) {
            this.imageID1 = res.data.photoId;
            if (input.files) {
              var reader = new FileReader();
              reader.onload = (e) => {
                vm.preview1 = e.target.result;
              };
              vm.image1 = input.files[0];
              reader.readAsDataURL(input.files[0]);
            }
          }
        })
        .catch((err) => {
            this.$toast.show(`照片上傳失敗`);
        });
    },
    reset1() {
      let vm = this;
      // console.log(this.imageID1)
      photoDelete({ id: this.imageID1 })
        .then((res) => {
          // console.log(res);
          // console.log("成功");
          if (res.status === 200) {
            vm.image1 = null;
            vm.preview1 = null;
          }
        })
        .catch((err) => {
          this.$toast.show(`照片刪除失敗`);
        });
    },

    induceClick2() {
      document.querySelector("#input2").click();
    },
    previewImage2(event) {
      let vm = this;
      var input = event.target;
      let formData = new FormData();
      formData.append("FtlId", this.ftlID);
      formData.append("TripId", parseInt(localStorage.getItem("trip")));
      formData.append("PhotoContent", input.files[0]);
      axios
        .post("http://34.80.22.91/api/Content/Photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          console.log("照片2上傳成功！");

          if (res.status === 200) {
            this.imageID2 = res.data.photoId;
            if (input.files) {
              var reader = new FileReader();
              reader.onload = (e) => {
                vm.preview2 = e.target.result;
              };
              vm.image2 = input.files[0];
              reader.readAsDataURL(input.files[0]);
            }
          }
        })
        .catch((err) => {
            this.$toast.show(`照片上傳失敗`);
        });
    },
    reset2() {
      let vm = this;
      console.log(this.imageID2)
      photoDelete({ id: this.imageID2 })
        .then((res) => {
          // console.log(res);
          // console.log("成功");
          if (res.status === 200) {
            vm.image2 = null;
            vm.preview2 = null;
          }
        })
        .catch((err) => {
         this.$toast.show(`照片刪除失敗`);
        });
    },
    induceClick3() {
      document.querySelector("#input3").click();
    },
    previewImage3(event) {
      let vm = this;
      var input = event.target;
      let formData = new FormData();
      formData.append("FtlId", this.ftlID);
      formData.append("TripId", parseInt(localStorage.getItem("trip")));
      formData.append("PhotoContent", input.files[0]);
      axios
        .post("http://34.80.22.91/api/Content/Photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          console.log("照片3上傳成功！");

          if (res.status === 200) {
            this.imageID3 = res.data.photoId;
            if (input.files) {
              var reader = new FileReader();
              reader.onload = (e) => {
                vm.preview3 = e.target.result;
              };
              vm.image3 = input.files[0];
              reader.readAsDataURL(input.files[0]);
            }
          }
        })
        .catch((err) => {
          
          this.$toast.show(`照片上傳失敗`);
          // console.log("照片3上傳失敗！");
        });
    },
    reset3() {
      let vm = this;
      photoDelete({ id: this.imageID3 })
        .then((res) => {
          // console.log(res);
          // console.log("成功");
          if (res.status === 200) {
            vm.image3 = null;
            vm.preview3 = null;
          }
        })
        .catch((err) => {
          this.$toast.show(`照片刪除失敗`);
          // console.log("失敗3");
        });
    },
    induceClick4() {
      document.querySelector("#input4").click();
    },
    previewImage4(event) {
      let vm = this;
      var input = event.target;
      let formData = new FormData();
      formData.append("FtlId", this.ftlID);
      formData.append("TripId", parseInt(localStorage.getItem("trip")));
      formData.append("PhotoContent", input.files[0]);
      axios
        .post("http://34.80.22.91/api/Content/Photo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
          console.log("照片4上傳成功！");

          if (res.status === 200) {
            this.imageID4 = res.data.photoId;
            if (input.files) {
              var reader = new FileReader();
              reader.onload = (e) => {
                vm.preview4 = e.target.result;
              };
              vm.image4 = input.files[0];
              reader.readAsDataURL(input.files[0]);
            }
          }
        })
        .catch((err) => {
            this.$toast.show(`照片上傳失敗`);
        });
    },
    reset4() {
      let vm = this;

      photoDelete({ id: this.imageID4 })
        .then((res) => {
          // console.log(res);
          // console.log("成功");
          if (res.status === 200) {
            vm.image4 = null;
            vm.preview4 = null;
          }
        })
        .catch((err) => {
         this.$toast.show(`照片刪除失敗`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.card {
  box-sizing: border-box;
  margin: 0.5rem auto;
  border-radius: 4px;
  // background-color: #444;
  width: 100%;
  height: 400px;
  //   border-bottom: 2px solid #ddd;
  & + & {
    margin-top: 1rem;
  }
}

.title {
  font-size: 1.5em;
  margin: 18px 0;
  border: none;
  &:focus {
    // padding: 0.5rem;
    outline: 1px solid #ddd;
  }
}

.img_inner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  //   margin: 0 0.5rem 0 0;
  //   border: 3px solid rgb(0, 0, 0);
}

.img_resp {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.author {
  margin: 0 0.5rem;
  text-align: center;
  &:before {
    content: "";
    display: block;
    height: 23%;
  }
}

.block_text,
.block_author,
.left,
.right_btns {
  display: flex;
}

.right_btns {
  height: max-content;
}

.block_author {
  justify-content: space-between;
  height: 30px;
}

.block_text {
  height: 210px;
}

.left {
  width: 60%;
  // background-color: whitesmoke;
}

.btn_reset {
  border: none;
  background-color: transparent;
  position: relative;
  &:hover > .notice {
    display: block;
    width: max-content;
    left: 100%;
    top: -0.5rem;
    position: absolute;
  }
}

.notice {
  display: none;
}

.content {
  height: 100%;
  display: block;
  // width: 400px;
  width: 98%;
  //   margin-right: 0.5rem;
  resize: none;
  border: none;
  // padding: 0.5rem;
  &:focus {
    // padding: 0.5rem;
    outline: 1px solid #ddd;
  }
}

.right {
  //   background-color: wheat;
  width: 40%;
  overflow: scroll;
}

.space {
  // width: 100%;
  position: relative;
  display: block;
  // width: 250px;
  &:hover .delete {
    display: inline;
  }
}

.photo_outer {
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: #444;
  & + & {
    margin-top: 0.5rem;
  }
}

.photo_resp {
  display: block;
  width: 100%;
}

.upload_btn {
  display: none;
}

.delete {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.7);
}

.icon {
  font-size: 20px;
  // font-weight: bold;
  display: block;
  line-height: 11.5rem;
  color: #fff;
  text-align: center;
}

@media screen and (max-width: 768px) and (min-width: 480px) {
 .photo_outer{
    margin:.3rem;
    padding:.3rem;
    background-color:#444;
    &+&{
        margin-top:.3rem;
    }
    
}
.card{
  height: 270px;
}
.title{
  margin:.5rem 0;
}
.icon{
  line-height: 5rem;
}
} 

</style>
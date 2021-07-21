<template>
  <div v-if="info" class="card">
    <!-- 作者區 / 上 -->
    <div class="block_author">
      <div class="img_inner">
        <img :src="`${info.user.userImage ? `${api}${info.user.userImage}` : defaultImg }`" alt="avator" class="img_resp" :onerror="defaultImgOn"/>
      </div>
   
            
      <p class="author">{{info.user.userName}}</p>

    </div>
     <h2 class="title">{{info.title}}</h2>
    <!-- 文章區 / 下 -->
    <div class="block_text">
      <!-- 文字區 / 左 -->

      <div class="left">
       
        <textarea class="content" v-model="info.articleContent" readonly rows="10">

    </textarea>
      </div>

      <!-- 照片區 / 右 -->
      <div class="right photo_list">
        
        <div class="photo_outer" v-for="photo in info.photoPath" :key="photo.photoId">
          <div class="photo_inner">
            <!-- :src="`${photo.photoPath ? `${api}${photo.photoPath}` : errorImg }`" -->
            <img :src="`${photo.photoPath ? photo.photoPath : errorImg }`" alt="photo" class="photo_resp" :onerror="errorImg"/>
          </div>
        </div>

        
      </div>

      
    </div>
    <!-- <button @click="test">卡片測試</button> -->
  </div>
</template>

<script>
export default {
  name: "Blogcard",
  props: ['info'],
  data(){
    return{
      defaultImgOn:'this.src="' + require('@/assets/a.jpg') + '"',
       defaultImg: require("@/assets/a.jpg"),
       errorImg: 'this.src="' + require('@/assets/noImage.png') + '"',
        api:'http://34.80.22.91/'
    }
  },
  methods: {
    test() {
      console.log(this.info);
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
  height: 350px;
//   border-bottom: 2px solid #ddd;
  &+&{
      margin-top:1rem;
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

.author{
    margin:0 .5rem;
    text-align: center;
    &:before{
        content:'';
        display: block;
        height: 23%;
    }
}

.block_text,
.block_author {
  display: flex;
}

.block_author{
    height: 30px;
}

.block_text{
    height: 210px;
}

.left {
  width: 60%;
  // background-color: whitesmoke;
}

.content {
    height: 100%;
  display: block;
  // width: 400px;
  width: 98%;
  //   margin-right: 0.5rem;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
  
}


.right {
//   background-color: wheat;
  width: 40%;
    overflow: scroll;
}



.photo_outer{
    margin:.5rem;
    padding:.5rem;
    background-color:#444;
    &+&{
        margin-top:.5rem;
    }
}

.photo_resp{
    width: 100%;
    display: block;
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
} 

@media screen and (max-width: 480px) and (min-width: 320px) {
  .photo_outer{
    margin:3px;
    padding:3px;
    background-color:#444;
    &+&{
        margin-top:3px;
    }
    
}

.card{
  height: 250px;
}

.title{
  margin:3px 0;
}
.block_text{
  height: 180px;
}

}
</style>
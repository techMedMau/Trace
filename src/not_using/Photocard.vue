<template>
<div>
 
    <label for="file" class="space mx-auto" >
        <div class="img_inner" @click="induceClick">
            
            <span class="icon" v-if="preview === null">➕</span>
          
            <img :src="preview" class="img_resp" />
       </div>
      <input id="input" type="file" accept="image/*" @change="previewImage" class="upload_btn">
     <button class="clear" @click="reset">✖️</button>
    </label>

    <label for="file" class="space mx-auto" >
        <div class="img_inner" @click="induceClick1">
            
            <span class="icon" v-if="preview1 === null">➕</span>
            
            <img :src="preview1" class="img_resp" />
       </div>
      <input id="input1" type="file" accept="image/*" @change="previewImage1" class="upload_btn">
     <button class="clear" @click="reset1">✖️</button>
    </label>

    <label for="file" class="space mx-auto" >
        <div class="img_inner" @click="induceClick2">
            
            <span class="icon" v-if="preview2 === null">➕</span>
             
            <img :src="preview2" class="img_resp" />
       </div>
      <input id="input2" type="file" accept="image/*" @change="previewImage2" class="upload_btn">
     <button class="clear" @click="reset2">✖️</button>
    </label>

    <label for="file" class="space mx-auto" >
        <div class="img_inner" @click="induceClick3">
             
            <span class="icon" v-if="preview3 === null">➕</span>
            
            <img :src="preview3" class="img_resp" />
       </div>
      <input id="input3" type="file" accept="image/*" @change="previewImage3" class="upload_btn">
     <button class="clear" @click="reset3">✖️</button>
    </label>

    <label for="file" class="space mx-auto" >
        <div class="img_inner" @click="induceClick4">
           
            <span class="icon" v-if="preview4 === null">➕</span>
           
            <img :src="preview4" class="img_resp" />
       </div>
      <input id="input4" type="file" accept="image/*" @change="previewImage4" class="upload_btn">
     <button class="clear" @click="reset4">✖️</button>
    </label>
    <!-- <input type="submit" value="Upload" id="files" name="files" @click="uploadFiles"/>
     </form> -->
     
</div>
      <!-- <label for="file" class="img1">
   <div id="fileList1" class="fileLists">
       <img src="/template/mobile/new2/static/images/aodi/idA.png" alt="">
   </div>
     <input type="file" accept="image/*" name="" id="file" class="file" onclick="handl(1)">
</label> -->
</template>

<script>

export default {
    name:'Photocard',
    data(){
        return{
            preview: null,
            image: null,
            preview1: null,
            image1: null,
            preview2: null,
            image2: null,
            preview3: null,
            image3: null,
            preview4: null,
            image4: null,
          //   testText:{
          //      ftlId: 1 , 
          //       photoName: '2' ,
          //      photoType:'', 
          //     photoImg: null,
          // } 
        }
    },
    methods:{
     
        induceClick(){
            document.querySelector('#input').click()
        },
         induceClick1(){
            document.querySelector('#input1').click()
        },
        induceClick2(){
            document.querySelector('#input2').click()
        },
        induceClick3(){
            document.querySelector('#input3').click()
        },
        induceClick4(){
            document.querySelector('#input4').click()
        },
    previewImage: function(event) {
      var input = event.target;
      // console.log(event.target.files)
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
          this.$emit("updatePics", this.preview, this.image);
          // console.log(this.image)
        }
        this.image=input.files[0];
      
        reader.readAsDataURL(input.files[0]);}
    },
    previewImage1: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview1 = e.target.result;
           this.$emit("updatePics", this.preview1,this.image1);
           
        }
        this.image1=input.files[0];
        reader.readAsDataURL(input.files[0]);
       
      }
    },
    previewImage2: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview2 = e.target.result;
          this.$emit("updatePics", this.preview2, this.image2);
        }
        this.image2=input.files[0];
        reader.readAsDataURL(input.files[0]);
        
      }
    },
    previewImage3: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview3 = e.target.result;
          this.$emit("updatePics", this.preview3, this.image3);
        }
        this.image3=input.files[0];
        reader.readAsDataURL(input.files[0]);
        
      }
    },
    previewImage4: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview4 = e.target.result;
          this.$emit("updatePics", this.preview4, this.image4);
        }
        this.image4=input.files[0];
        reader.readAsDataURL(input.files[0]);
       
       
      }
     
    },
    reset: function () {
      this.image = null;
      this.preview = null;
      // this.image_list = [];
      // this.preview_list = [];
    },
     reset1: function () {
      this.image1 = null;
      this.preview1 = null;
    },
    reset2: function () {
      this.image2 = null;
      this.preview2 = null;
    },
    reset3: function () {
      this.image3 = null;
      this.preview3 = null;
    },
    reset4: function () {
      this.image4 = null;
      this.preview4 = null;
    },
    }
}
</script>

<style scoped>


.mx-auto{
    margin-left: auto;
     margin-right: auto;
}
.space{
    position: relative;
    display: block;
    width: 250px;
   
}
.img_inner {
  box-sizing: border-box;
  width: 100%;
  height: max-content;
  margin-bottom:1rem;
  padding:.5rem;
  background-color:rgba(173, 209, 230, 0.8);
  border-radius: 4px;
}

.img_resp {
  display: block;
  width: 100%;
  
}

.upload_btn{
    display: none;
}

.clear{
    position: absolute;
    right:-.5rem;
    top:-.5rem;
    border:none;
    border-radius: 3px;
    width: 25px;
    height: 25px;
}

.icon{
  line-height: 9rem;
}

</style>
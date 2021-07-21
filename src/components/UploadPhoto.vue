<template>
  <label for="file" class="space" @click="test">
    <div class="photo_outer" >
      <div class="photo_inner" @click="induceClick">
        <span class="icon" v-if="previews[index] === undefined">+</span>

        <img :src="previews[index]" class="photo_resp" />
      </div>
    </div>
    <input
      id="input"
      type="file"
      accept="image/*"
      @change="previewImage"
      class="upload_btn"
    />
    <button v-if="previews[index] !== undefined" class="delete" @click="reset">✖️</button>
  </label>
</template>

<script>
export default {
  name: "UploadPhoto",
  props:['index','previews'],
  data() {
    return {
      preview: null,
      image: null,
    };
  },
  methods: {
      test(){
            // console.log(this.index)
      },
    induceClick() {
        
      document.querySelector("#input").click();
    },
    previewImage(event) {
        let vm = this
      var input = event.target;
      // console.log(event.target.files)
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        //   console.log(this.preview)
        //   console.log(this.image)
        //   console.log(this.index)
          this.$emit("updatePics", this.preview, this.image, vm.index);
          // console.log(this.image)
        };
        this.image = input.files[0];

        reader.readAsDataURL(input.files[0]);
      }
    },
    reset() {
      this.image = null;
      this.preview = null;
    },
  },
};
</script>

<style lang="scss" scoped>
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
   /* font-weight: bold; */
  display: block;
  line-height: 11.5rem;
  color: #fff;
  text-align: center;
}

</style>
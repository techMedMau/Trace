<template>
  <div class="toast" v-show="isShow" >
    <div class="toast_inside">
        {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '', duration = 1500) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }

</script>

<style>



.toast {
   box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .7rem;
  color:#fff;
  background-color: #000;
  z-index: 9999;
  border-radius: 3px;
  font-size:13px;
}

.toast_inside{
   box-sizing: border-box;
  border:1px solid #fff;
  padding:.7rem;
}

</style>
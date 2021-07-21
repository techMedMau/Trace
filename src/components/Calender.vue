<template>

<!-- 日曆的部分
    <button type="button" @click="picking" class="style_reset">
    <i class="far fa-calendar fa-2x"></i>
    </button>
新增旅遊事件的部分
    <button type="button" class="style_reset btn_createEvent" @click="createEvent" v-show="allset">➕</button>
    <p>{{friendSelected}}</p> -->
<div>
    
    <div class="buttons">
        <button type="button" class="btn" @click="picking"> 日期 </button>
    
    </div>
</div>
</template>

<script>

export default {
    name:'Mapbutttons',
    props:['friendSelected','allset','tripID'],
    data(){
        return{
            isPicking: false,
       
          
        }
    },
    methods:{
        // dateChosed(){
        //     this.$emit('sendDate', this.date);
        // },
        picking(){
           
            this.isPicking = !this.isPicking;
            this.$emit('picking', this.isPicking);
        },
        // createEvent(){
        //     if(this.allset){
        //         this.isCreating = !this.isCreating;
        //         this.$emit('creating', this.isCreating);
        //         return
        //     }
        //     var vm = this;
        //     this.alert1=true;
        //     setTimeout(function(){vm.alert1 = false; }, 2000);
        // },
        //行程
        // warning2(){ 
        //     var vm = this;
        //     if(this.tripID === 0){
        //         this.alert2=true;
        //         setTimeout(function(){vm.alert2 = false; }, 2000);
        //     }else{
        //         this.$router.push('/planning_edit');
        //     }
        // },
        // //紀錄
        // warning3(){
        //     var vm = this;
        //     if(this.tripID === 0){
        //         this.alert3=true;
        //         setTimeout(function(){vm.alert3 = false; }, 2000);
        //     }else{
        //         this.$router.push('/blog');
        //     }
        // },

        
    }
}
</script>

<style lang="scss" scoped>
.buttons{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom:13rem;
   
}
.btn{
    // width: max-content;
    margin:5px 0;
    border:none;
    background-color: #fff;
    padding:.5rem;
    border-radius: 3px;
    box-shadow: 0px 1px 1px 1px rgba(0,0,0,.3);
}

//p+btn的框框
.alert{
    right:0;
    display: flex;
    width: max-content;
}

//警告標語p
.warning_word{
    display: none;
    vertical-align: bottom;
    margin: 0 .5rem;
    padding:3px .5rem;
    height: max-content;
    border-radius: 3px;
    color:#fff;
    background-color: rgb(0, 0, 0);
}

.active{
    display: flex;
}

// .fa-calendar{
//     position: absolute;
//     right:.5rem;
//     bottom:20rem;
//     background-color: whitesmoke;
//     border:3px solid #000;
//     border-radius: 50%;
//     padding:1rem;
//     &:hover{
//         opacity: .7;
//     }
// }

// .btn_createEvent{
//     color:#000;
//     position: absolute;
//     font-size: 20px;
//     right:.5rem;
//     bottom:15rem;
//     background-color: whitesmoke;
//     border:3px solid #000;
//     border-radius: 50%;
//     padding:1rem;
//     &:hover{
//         opacity: .7;
//     }
// }



//yyyy/mm/dd
// .date::-webkit-datetime-edit-fields-wrapper{
//   position: absolute;
//   font-size:15px;
//   right:-.7rem;
//   top:120%
// }

// .date_background{
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   background-color: rgb(196, 198, 224);
//   position:absolute;
//   right:0;
//   bottom:20rem;
// }
</style>
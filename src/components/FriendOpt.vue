<template>
    <div class="friendCard" >
       
        <div class="img_inner" :class="{active: isStyling, border: isFounder}" @click="choice">
            <img  :src="`${
                    image ? `${api}${image}` : defaultImg
                  }`" alt="photo" class="img_resp"  :onerror="defaultImgOn">
        </div>
        <!--  -->
        <p v-if="this.$route.name === 'MyMap'" class="name">{{name}}</p>
        <p v-else class="name dynamic" >{{name}}</p>
        <!--  -->
    </div>
</template>

<script>
export default {
    name:"FriendOpt",
    props:['name','id', 'editable','index','image','isFounder','formember'],
    // props:{name:String,id:Number,src:{type:String, required: false, default:'@/assets/cat.jpg'}},
    data(){
        return{
             defaultImgOn:'this.src="' + require('@/assets/a.jpg') + '"',
            defaultImg:require('@/assets/a.jpg'),
            api: "http://34.80.22.91/",
            isActive:false,
            isStyling:false,
            dynamic:true
        }
    },
    created(){
        // console.log("created");
    },
    methods:{
        choice(){
          
            if(this.$route.name ==='MyMap' || this.editable === true){
                 this.isActive=!this.isActive
            }
            if(this.$route.name ==='MyMap' && !this.formember){
                this.isStyling = !this.isStyling
            }
            if(this.$route.name ==='MyMap' && this.isActive){
                this.$emit('friendChosed', this.id, this.name, this.image);
            }else{
                this.$emit('friendNotChosed', this.id, this.name,  this.image)
            }
            if(this.$route.name ==='Planning_edit' && this.editable){
                this.$emit('friendChosed', this.index);
            }
        },
        
    }

}
</script>

<style lang="scss" scoped>


.img_inner{
    // justify-content: end;
    width:70px;
    height: 70px;
    border-radius: 50%; 
    margin: 0 .5rem;
    // border: 3px solid rgb(0, 0, 0);
    
    
}

.active{
    border: 3px solid rgb(255, 253, 223);
    opacity: .7;
} 

.img_resp{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    
}

.name{
    border:1px solid #000;
    border-radius: 4px;
    background-color: rgba(255,255,255,.5);
    width: max-content;
    padding:0 .5rem;
    margin: .5rem auto;
    display: block;
}

// .border{
//     border: 3px solid rgb(255, 251, 195);
// }
.dynamic{
    display:none;
}

.friendCard{
   position: relative;
   &:hover .dynamic{
       display: block;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%) ;
}
}



</style>
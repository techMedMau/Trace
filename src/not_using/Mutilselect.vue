<template>
  <!-- 自制multiselect -->
         <div class="search_bar">
             <button type="button" class="select_btn" @click="isListing = !isListing">↓</button>
             <ul v-show="isListing" class="friend_options"  @change="refreshList">
                <li class="options" v-for="item in friendList" :key="item.userId" @click="selectFriends(item.userName, item.userId)">{{item.userName}}</li>
               
             </ul>
             <div class="tags">
            
             <p class="tag" v-for="item, index in tags" :key="index" @click="deletSelect(index)">{{item}} <button type="button" class="clear" >✖️</button></p>
             </div>
        </div>
         <!-- 自制multiselect -->
</template>

<script>
export default {
    name:'Multiselect',
    props:[],
    data(){
        return{
            isGroupNameChange:false,
            userId:1,
            isListing:false,
            tags:[],
            groupData:[],
            friendList:[],
            friendList2:[],//名字版的friendList
            groupMemberData:{
                groupId: this.id,
                memberIdList:[]//編輯後的成員id
            },
            groupDataSend:{
                groupId: this.id,
                groupName: this.name,
            },
            groupMembers:[]//編輯前的成員id
        }
    },
    computed:{
        refresh(){
            return this.friendList2.filter((item)=>!this.tags.includes(item))
        }
    },
    methods:{
        selectFriends(name,id){
            if(this.tags.includes(name)){return}
            this.tags.push(name);
            // this.friendList2.isClick = !boolean
            this.groupMemberData.memberIdList.push(id);
        },
        deletSelect(index){
            // console.log(index)
            this.tags.splice(index,1)
            this.groupMemberData.memberIdList.splice(index,1);
        }
    }


}
</script>

<style lang="scss" scoped>
/* 搜尋匡 */
.search_bar{
    height: 3rem;
    width: 90%;
    background-color: rgba(255,255,255,0.8);
    border-radius: 3px;
    margin:0 auto;
    position: relative;
}

// 選擇鈕
.select_btn{
    position: absolute;
    right:0;
    border: none;
    background-color: transparent;
    top:5px;
   
}

// tags
.tags{
    position: absolute;
    top: 3px;
    left: 3px;
}

.tag{
    padding:3px;
    display: inline-block;
    margin:0;
    background-color: #e3f2ff;
    border-radius: 3px;
    &+&{
        margin-left:.5rem
    }
}

/* ul */
.friend_options{
    border-radius: 3px;
    padding:0;
    margin:0;
    width: 98%;
    background-color: #fff;
    list-style-type:none;
    position: absolute;
    left:0;
    top:100%;
    border:2px solid #002242;
}

/* li */
.options{
    &:hover{
        background-color: #557ca1;
    }
}
</style>
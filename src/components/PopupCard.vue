
<template>
  <div class="card">
        <ul class="list">
            <li class="list_item" v-for="location in locationInfo.tripEvents" :key="location.tripId"  @click="locationToTrip(location.tripId,location.tripName,location.startingDate,location.endingDate)">
                <h3 class="trip">{{location.tripName}}</h3>
                <p class="time">{{location.startingDate.split('T')[0]}}</p>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
    name:'PopupCard',
    props:['locationInfo'],
    methods:{
        selected(tripID){
            // console.log(tripID)
            // this.$emit('getSelectedTrip', tripID)
        },
        locationToTrip(tripID,name,start,end){
            // console.log(start)
            // console.log(end)
             this.$emit('locationToTrip',tripID,name,start,end)
             localStorage.setItem('trip', tripID);
             localStorage.setItem('tripName', name);
              localStorage.setItem('start', start);
              localStorage.setItem('end', end)
        }
    }

}
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
.card{
    width: 100%;
height: max-content;
border-radius: 2px;
border:1px solid #fff;
}

.list{
    margin: 0;
  padding: 0;
  list-style: none;
}

.list_item{
    color:#000;
    padding: .5rem;
    &:hover{
        // background-color: rgba(255,255,255,.7);
        opacity: .7;
    }
}

.list_item+.list_item{
    border-top: 1px solid #fff;
}

.trip{
    margin:0;
    font-weight: normal;
}

.time{
    margin: 0;
    text-align: end;
}
</style>
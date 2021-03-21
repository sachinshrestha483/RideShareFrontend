<template>
<div class="flex flex-col mt-8" v-if="userVehiclesList != null">
    

<div 

        v-for="item in userVehiclesList"
        :key="item"

>

<IndividualUserVehicle :UserVehicle="item" :vehicleTypes="vehicleTypes" />


</div>

    </div>


</template>

<script>
import IndividualUserVehicle from "@/components/UserVehicles/IndividualUserVehicle"
export default {
props:[
    'userVehiclesList',
    'vehicleTypes'
],
components:{
IndividualUserVehicle
},
setup(){

}

}
</script>

<style>

</style>
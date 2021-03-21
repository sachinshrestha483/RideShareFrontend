<template>
  <div>
    <div
      v-for="VehicleType in VehicletypeList"
      :key="VehicleType"
    >
      <!-- {{carSharePrefrence}} -->
      <IndividualVehicleType
        :VehicleTypeObject="VehicleType"
      />
    </div>
  </div>
</template>

<script>
import IndividualVehicleType from "@/components/VehicleTypes/IndividualVehicleType"

export default {

components:{
IndividualVehicleType
},
props:[
    "VehicletypeList"
]

};
</script>

<style>
</style>
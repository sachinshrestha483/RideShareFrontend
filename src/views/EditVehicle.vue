<template>
  <div class="pageMargin2">
    <div class="text-center primaryHeading">User Vehicles</div>
    <!-- {{ userVehicles }} -->

<UserVehicleList  :userVehiclesList="userVehicles" :vehicleTypes="vehicleTypes"  />



  </div>
</template>

<script>
import VehicleFunctions from "@/composables/VehicleFunctions";
import VehicleTypeFunctions from "@/composables/VehicleTypeFunctions";

import UserVehicleList from "@/components/UserVehicles/UserVehicleList"
import { ref } from "vue";
export default {
    components:{
UserVehicleList
    },
  setup() {
    const { GetUserVehicles } = VehicleFunctions();
    const { GetVehicleTypes } = VehicleTypeFunctions();

    const userVehicles = ref([]);
    const vehicleTypes=ref([]);
    const loadData = async () => {
      userVehicles.value = await GetUserVehicles();
      vehicleTypes.value = await GetVehicleTypes();

};

    loadData();

  


return { userVehicles ,vehicleTypes};
  },
};
</script>

<style>
</style>
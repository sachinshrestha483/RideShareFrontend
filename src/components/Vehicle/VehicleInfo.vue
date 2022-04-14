<template>
 
  <!-- {{vehicle}}  -->

 <div class="flex flex-row justify-center w-full">
    <div class="flex flex-col md:w-6/12 w-10/12" v-if="vehicle!=null">
      <div
        class="
          shadow-md
          p-8
          hover:bg-gray-200
          text-md text-gray-600
          mb-2
          md:text-left
          text-center
          font-bold
          rounded-lg
          shadow-xl
        "
      >
        <div class="text-2xl mb-4 ml-1">
          <div class="flex justify-around items-center">Vehicle Info</div>
        </div>
        <div class="text-lg">
          <!-- sdsd -->
          <!-- {{ user }} -->
<!-- h-32 w-32 rounded-full -->
          <div class="flex flex-row gap-8 justify-around items-center">
              <img
                class="object-fill h-64 w-64 ..."
                :src="vehicle.vehiclePhotoUrl"
              />
            <div class="flex flex-col">
              <div>Company : {{ vehicle.companyName}} </div>
              <div>Model : {{ vehicle.modelName }} </div>
              <div>Type : {{ vehicle.vehicleType.name }} </div>
              <div>Color  : {{  vehicle.color}} </div>
              <div>License Plate Number  : {{ vehicle.licensePlateNumber }} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>




</template>

<script>
import { onMounted, ref } from "vue";
import VehicleFunctions from "@/composables/VehicleFunctions";
export default {
  props: ["vehicleId"],
  setup(props) {
    const vehicle = ref(null);

    const { GetUserVehicleById } = VehicleFunctions();

    const loadData = async() => {

        var res= await  GetUserVehicleById(props.vehicleId);
        vehicle.value= res;



    };

    onMounted(async () => {
     await  loadData();
    });
    return {vehicle}
  },
};
</script>

<style>
</style>
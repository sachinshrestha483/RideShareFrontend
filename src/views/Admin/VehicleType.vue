<template>
  <div class="pageMargin2">
    <p class="primaryHeading text-center">Vehicle Type Settings</p>

    <div>
      <div
        class="md:grid md:gap-4 md:grid-cols-3 md:justify-between flex flex-col md:mt-10 mt-8"
      >
        <form @submit.prevent="AddVehicleTypeFun" >
          <div class="flex flex-col  ">
            <div>
              <input
                required
                class="inputBox"
                v-model="vehicleTypeName"
                placeholder="Add Travel Prefrence"
              />
            </div>

            <div class="text-center">
              <button type="submit" class="primaryButton">
                Add Vehicle Type
              </button>
            </div>
          </div>
        </form>
        <div class="col-span-2">
          <VehicleTypeList
            v-if="vehicleTypesList != null"
            :VehicletypeList="vehicleTypesList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleTypeList from "@/components/VehicleTypes/VehicleTypeList";
import VehicleTypeFunctions from "@/composables/VehicleTypeFunctions";
import { ref } from 'vue';
export default {
  components: {
    VehicleTypeList,
  },

  setup() {
    const {
      AddVehicleType,
      GetVehicleTypes,
    } = VehicleTypeFunctions();
    const vehicleTypesList = ref(null);
    const vehicleTypeName = ref("");
    const getData = async () => {
      vehicleTypesList.value = await GetVehicleTypes();
    };
    getData();
    const AddVehicleTypeFun = async () => {

       await  AddVehicleType(vehicleTypeName.value)
       getData();
    };

    return { vehicleTypesList, AddVehicleTypeFun, vehicleTypeName };
  },
};
</script>

<style>
</style>
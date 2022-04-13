<template>
  <div class="pageMargin2">
    <p class="primaryHeading text-center">Vehicle Type Settings</p>

    <div>
      <div
        class="
          md:grid md:gap-4 md:grid-cols-3 md:justify-between
          flex flex-col
          md:mt-10
          mt-8
        "
      >
        <form @submit.prevent="AddVehicleTypeFun">
          <div class="flex flex-col">
            <div>
              <input
                required
                class="inputBox mb-0"
                v-model="vehicleTypeName"
                placeholder=" Vehicle Type "
              />
            </div>

            <span class="text-sm text-red-500 mr-2 font-medium">{{
              formErrors.vehicleTypeName
            }}</span>

            <div class="text-center mt-4">
              <button type="submit" v-if="!isSubmitting" class="primaryButton">
                Add Vehicle Type
              </button>
              <button disabled v-else class="primaryButton">
                Adding Vehicle Type
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
import { successAlert, errorAlert } from "@/composables/Notifications.js";

import { ref } from "vue";
export default {
  components: {
    VehicleTypeList,
  },

  setup() {
    const { AddVehicleType, GetVehicleTypes } = VehicleTypeFunctions();
    const vehicleTypesList = ref(null);
    const vehicleTypeName = ref("");

    const isSubmitting= ref(false);

    const clearFormErors = () => {
      const keys = Object.keys(formErrors.value);
      keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key] = null;
      });
    };

    const formErrors = ref({
      vehicleTypeName: null,
    });

    const getData = async () => {
      vehicleTypesList.value = await GetVehicleTypes();
    };
    getData();
    const AddVehicleTypeFun = async () => {
      clearFormErors();

      if (
        vehicleTypeName.value == null ||
        vehicleTypeName.value.toString().trim() == ""
      ) {
        console.log("1");
        formErrors.value.vehicleTypeName = "Name Cannot Be Null";
        return;
      }

      if (vehicleTypeName.value.toString().trim().length < 2) {
        console.log("2");
        formErrors.value.vehicleTypeName =
          "Name Length Should Be Greater Than 2";
        return;
      }
isSubmitting.value=true;
      let result = await AddVehicleType(vehicleTypeName.value);
isSubmitting.value=false;

      if (result) {
        successAlert("Data Added Sucessfully");
      } else {
        errorAlert("Cant Add Data");
      }

      getData();
    };

    return { vehicleTypesList, AddVehicleTypeFun, vehicleTypeName, formErrors, isSubmitting };
  },
};
</script>

<style>
</style>
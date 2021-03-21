<template>
  <div class="pageMargin2">
    <div class="text-center primaryHeading">Add Vehicle</div>
    <div class="text-center">
      <router-link
        :to="{ name: 'UserEditVehicle' }"
        class="primaryButton text-center"
        >Edit Car</router-link
      >
    </div>
    <form @submit.prevent="AddVehicleFun">
      <div class="flex flex-row justify-center">
        <div class="mb-4 w-full flex flex-col">
          <input
            class="inputBox"
            v-model="vehicleCompanyName"
            placeholder="Company Name"
          />
          <input
            v-model="vehicleModelName"
            class="inputBox"
            placeholder="Company Model"
          />

          <input
            v-model="vehicleLicensePlateNumber"
            class="inputBox"
            placeholder="License Plate Number"
          />

          <input
            v-model="vehicleDateOfRegisteration"
            type="date"
            class="inputBox"
            placeholder="Date Of Refisteration"
          />
          <input v-model="vehicleColor" class="inputBox" placeholder="Color" />

          <select
            v-model="selectedVehicleTypeId"
            name="cars"
            required
            class="focus:outline-none my-4 text-gray-500 rounded-lg p-2 border-2 border-gray-200 bg-gray-200 w-full h-12 focus:border-blue-500 font-medium text-gray-500;"
            id="cars"
          >
            <option value="">Select The Vehicle Type</option>
            <option v-for="item in filteredVehicleTypes" :key="item" :value="item.id">
              {{ item.name }}
            </option>
          </select>

          <p class="text-red-500">
            {{ fileError }}
          </p>
          <input
            class="inputBox p-1"
            multiple
            v-on:change="handleFileChange"
            type="file"
          />

          <button type="submit" class="primaryButton">Add Vehicle</button>
        </div>

        <div></div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import VehicleTypeFunctions from "@/composables/VehicleTypeFunctions";
import VehicleFunctions from "@/composables/VehicleFunctions";

export default {
  setup() {
    const vehicleCompanyName = ref("");
    const vehicleModelName = ref("");
    const vehicleLicensePlateNumber = ref("");
    const vehicleDateOfRegisteration = ref("");
    const vehicleColor = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const vehicleTypes = ref([]);
    const selectedVehicleTypeId = ref(0);

    const { GetVehicleTypes } = VehicleTypeFunctions();
    const { AddVehicle } = VehicleFunctions();
    const load = async () => {
      console.log("Load Vehicle Types");
      vehicleTypes.value = await GetVehicleTypes();
    };

    load();



const filteredVehicleTypes = computed({
      get() {
        if (vehicleTypes.value != null) {
          return vehicleTypes.value.filter((n) => n.show == true);
        }
      },
    });



    const handleFileChange = (e) => {
      fileError.value = "";
      const selected = e.target.files[0];
      console.log(selected);
      const types = ["image/png", "image/jpeg"];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
      } else {
        file.value = null;
        fileError.value = "Please Selet an Image File (png/jpg)";
      }
    };

    const AddVehicleFun = async () => {
      const obj = {
        vehicleCompanyName: vehicleCompanyName.value,
        vehicleModelName: vehicleModelName.value,
        vehicleLicensePlateNumber: vehicleLicensePlateNumber.value,
        vehicleDateOfRegisteration: vehicleDateOfRegisteration.value,
        vehicleColor: vehicleColor.value,
        file: file.value,
        selectedVehicleTypeId: selectedVehicleTypeId.value,
      };

      console.log("----Object----");
      console.log(obj);
      console.log("----Object----");

      await AddVehicle(obj);
    };

    return {
      vehicleCompanyName,
      vehicleModelName,
      vehicleLicensePlateNumber,
      vehicleDateOfRegisteration,
      vehicleColor,
      handleFileChange,
      AddVehicleFun,
      fileError,
      vehicleTypes,
      selectedVehicleTypeId,
      filteredVehicleTypes
    };
  },
};
</script>

<style>
</style>
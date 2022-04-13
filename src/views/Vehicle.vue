<template>
  <div class="pageMargin2">
    {{ formErrors }}
    <div class="text-center">
      <div class="flex flex-row justify-between w-full">
        <div class="text-center primaryHeading">Add Vehicle</div>
        <div class="flex flex-row items-center">
          <router-link
            :to="{ name: 'UserEditVehicle' }"
            class="primaryButton text-center flex flex-row items-center gap-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit Cars</router-link
          >
        </div>
      </div>
    </div>
    <form @submit.prevent="AddVehicleFun">
      <div class="flex flex-row justify-center">
        <div class="mb-4 w-full flex flex-col">
          <input
            class="inputBox mb-0"
            v-model="vehicleCompanyName"
            placeholder="Company Name"
          />
          <span class="text-sm text-red-500 mr-2 font-medium">{{
            formErrors.vehicleCompanyName
          }}</span>
          <input
            v-model="vehicleModelName"
            class="inputBox mt-4 mb-0"
            placeholder="Company Model"
          />
          <span class="text-sm text-red-500 mr-2 font-medium">
            {{ formErrors.vehicleModelName }}
          </span>

          <input
            v-model="vehicleLicensePlateNumber"
            class="inputBox mt-4 mb-0"
            placeholder="License Plate Number"
          />
          <span class="text-sm text-red-500 mr-2 font-medium">{{
            formErrors.vehicleLicensePlateNumber
          }}</span>

          <input
            required
            v-model="vehicleDateOfRegisteration"
            type="date"
            class="inputBox mt-4 mb-0"
            placeholder="Date Of Refisteration"
          />
          <span class="text-sm text-red-500 mr-2 font-medium">
            {{ formErrors.vehicleDateOfRegisteration }}
          </span>
          <input
            v-model="vehicleColor"
            class="inputBox mb-0 mt-4"
            placeholder="Color"
          />
          <span class="text-sm text-red-500 mr-2 font-medium">{{
            formErrors.vehicleColor
          }}</span>

          <select
            v-model="selectedVehicleTypeId"
            name="cars"
            required
            class="
              focus:outline-none
              my-4
              text-gray-500
              rounded-lg
              p-2
              border-2 border-gray-200
              bg-gray-200
              w-full
              h-12
              focus:border-blue-500
              font-medium
              text-gray-500;
              mb-0
              mt-4
            "
            id="cars"
          >
            <option value="">Select The Vehicle Type</option>
            <option
              v-for="item in filteredVehicleTypes"
              :key="item"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <span class="text-sm text-red-500 mr-2 font-medium">{{
            formErrors.selectedVehicleTypeId
          }}</span>

          <p class="text-red-500">
            {{ fileError }}
          </p>
          <input
            class="inputBox p-1 mb-0"
            multiple
            v-on:change="handleFileChange"
            type="file"
          />
          <span class="text-sm text-red-500 mr-2 font-medium">{{
            formErrors.file
          }}</span>

          <button
            type="submit"
            class="primaryButton mt-8"
            v-if="!submittingForm"
          >
            Add Vehicle
          </button>
          <button type="submit" class="primaryButton mt-8" disabled v-else>
            Adding Vehicle
          </button>
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
import { successAlert, errorAlert } from "@/composables/Notifications.js";
import { useRoute, useRouter } from "vue-router";

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
    const submittingForm = ref(false);
    const router = useRouter();

    const { GetVehicleTypes } = VehicleTypeFunctions();
    const { AddVehicle } = VehicleFunctions();
    const load = async () => {
      console.log("Load Vehicle Types");
      vehicleTypes.value = await GetVehicleTypes();
    };

    load();

    const clearFormErors = () => {
      const keys = Object.keys(formErrors.value);
      keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key] = null;
      });
    };

    const formErrors = ref({
      vehicleCompanyName: null,
      vehicleModelName: null,
      vehicleLicensePlateNumber: null,
      vehicleDateOfRegisteration: null,
      vehicleColor: null,
      file: null,
      selectedVehicleTypeId: null,
    });

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
      clearFormErors();
      if (
        obj.vehicleCompanyName == null ||
        obj.vehicleCompanyName.toString().trim() == ""
      ) {
        console.log("1");
        formErrors.value.vehicleCompanyName = "Company Name Cannot Be Null";
        return;
      }

      if (obj.vehicleCompanyName.toString().trim().length < 2) {
        console.log("2");

        formErrors.value.vehicleCompanyName =
          "Company Name Length Should Be Greater Than 2";
        return;
      }

      if (
        obj.vehicleModelName == null ||
        obj.vehicleModelName.toString().trim() == ""
      ) {
        console.log("3");

        formErrors.value.vehicleModelName = "Company Model Cannot Be Null";
        return;
      }

      if (obj.vehicleModelName.toString().trim().length < 2) {
        console.log("4");

        formErrors.value.vehicleModelName =
          "Company Model Length Should Be Greater Than 2";
        return;
      }

      if (
        obj.vehicleLicensePlateNumber == null ||
        obj.vehicleLicensePlateNumber.toString().trim() == ""
      ) {
        console.log("5");

        formErrors.value.vehicleLicensePlateNumber =
          "License Plate  Cannot Be Null";
        return;
      }

      if (obj.vehicleLicensePlateNumber.toString().trim().length != 10) {
        console.log("6");

        formErrors.value.vehicleLicensePlateNumber =
          "Length Of License Plate Number Should Be 10";
        return;
      }

      if (obj.vehicleDateOfRegisteration == null) {
        console.log("7");

        formErrors.value.vehicleDateOfRegisteration =
          "Date of Registration Cannot Be Null";
        return;
      }

      if (
        obj.vehicleColor == null ||
        obj.vehicleColor.toString().trim() == ""
      ) {
        console.log("8");

        formErrors.value.vehicleColor = "Vehicle Color Cannot Be Null";
        return;
      }

      if (obj.vehicleColor.toString().trim().length < 2) {
        console.log("9");

        formErrors.value.vehicleColor =
          "Vehicle Color Name Should Be Greater than 2";
        return;
      }

      if (obj.selectedVehicleTypeId == 0) {
        console.log("10");

        formErrors.value.vehicleColor = "Select Vehicle Type Id";
        return;
      }

      submittingForm.value = true;

      var res = await AddVehicle(obj);
      submittingForm.value = false;

      if (!res.haveError) {
        successAlert("Vehicle Added Successfully");
       router.push({ name: "UserEditVehicle" });

      } else {
        errorAlert("Vehicle Cant Be Added");
      }
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
      filteredVehicleTypes,
      formErrors,
      submittingForm,
    };
  },
};
</script>

<style>
</style>
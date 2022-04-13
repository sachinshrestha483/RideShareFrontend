<template>
  {{ formErrors }}
  <!-- {{userVehicle}} -->
  <form @submit.prevent="updateVehicle">
    <div class="shadow-md p-8 w-full text-lg">
      <label class="secondaryText text-lg">Company Name</label>
      <div class="flex flex-col mt-0 mb-4">
        <input v-model="userVehicle.companyName" class="inputBox mb-0" />
        <span class="text-sm text-red-500 mr-2 font-medium">{{
          formErrors.vehicleCompanyName
        }}</span>
      </div>

      <label class="secondaryText text-lg">Model Name</label>
      <div class="flex flex-col mt-0 mb-4">
        <input class="inputBox" v-model="userVehicle.modelName" />
        <span class="text-sm text-red-500 mr-2 font-medium">
          {{ formErrors.vehicleModelName }}
        </span>
      </div>

      <label class="secondaryText text-lg">License Plate Number</label>

      <div class="flex flex-col mt-0 mb-4">
        <input class="inputBox" v-model="userVehicle.licensePlateNumber" />
        <span class="text-sm text-red-500 mr-2 font-medium">{{
          formErrors.vehicleLicensePlateNumber
        }}</span>
      </div>

      <label class="secondaryText text-lg">Date Of Registration</label>
      <div class="flex flex-col mt-0 mb-4">
        <input class="inputBox" type="date" v-model="dateTimeString" />
        <span class="text-sm text-red-500 mr-2 font-medium">
          {{ formErrors.vehicleDateOfRegisteration }}
        </span>
      </div>

      <label class="secondaryText text-lg">Color</label>
      <div class="flex flex-col mt-0 mb-4">
        <input class="inputBox" v-model="userVehicle.color" />
        <span class="text-sm text-red-500 mr-2 font-medium">{{
          formErrors.vehicleColor
        }}</span>
      </div>

      <label class="secondaryText text-lg">Vehicle Type</label>
      <div class="flex flex-col mt-0 mb-4">
        <select
          v-model="userVehicle.vehicleTypeId"
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
          "
          id="cars"
        >
          <option value="">Select The Vehicle Type</option>
          <option v-for="item in vehicleTypes" :key="item" :value="item.id">
            {{ item.name }}
          </option>
        </select>
        <span class="text-sm text-red-500 mr-2 font-medium">{{
          formErrors.selectedVehicleTypeId
        }}</span>
      </div>

      <label class="secondaryText text-lg">Update Photo</label>
      <input
        class="inputBox p-1"
        v-on:change="handleFileChange"
        type="file"
        multiple
      />

      <div class="text-center">
        <button class="primaryButton" v-if="!submittingForm" type="submit">
          Update Vehicle
        </button>
        <button
          class="primaryButton"
          v-if="submittingForm"
          disabled
          type="submit"
        >
          Updating Vehicle
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import VehicleFunctions from "@/composables/VehicleFunctions";
import { successAlert, errorAlert } from "@/composables/Notifications.js";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
export default {
  props: ["userVehicle", "vehicleTypes"],

  setup(props, context) {
    const { UpdateVehicle } = VehicleFunctions();

    const selectedVehicleTypeId = ref(0);
    const file = ref(null);
    const fileError = ref(null);
    const submittingForm = ref(false);
    const { GetDateString ,GetUtcDateTime} = UtilityFunctions();

    const dateTimeString = ref(
      GetDateString(new Date(props.userVehicle.dateOfRegistration))
    );

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

    const updateVehicle = async () => {
      const obj = {
        id: props.userVehicle.id,
        vehicleCompanyName: props.userVehicle.companyName,
        vehicleModelName: props.userVehicle.modelName,
        vehicleLicensePlateNumber: props.userVehicle.licensePlateNumber,
        vehicleDateOfRegisteration: GetUtcDateTime(
          new Date(dateTimeString.value)
        ),
        vehicleColor: props.userVehicle.color,
        file: file.value,
        selectedVehicleTypeId: props.userVehicle.vehicleTypeId,
      };
      console.log(obj);
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
      var res = await UpdateVehicle(obj);
      context.emit("ReloadUserVehicle");

      if (!res.haveError) {
        successAlert("Vehicle Updated Sucessfully");
      } else {
        errorAlert("Failed To Update Vehicle");
      }
    };

    return {
      selectedVehicleTypeId,
      updateVehicle,
      handleFileChange,
      formErrors,
      submittingForm,
      dateTimeString,
    };
  },
};
</script>

<style>
</style>
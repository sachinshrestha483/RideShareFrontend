<template>
  <div class="shadow-md p-8 overflow-x-auto hover:bg-gray-200 secondaryText">
    <div class="flex flex-row items-center justify-between">
      <div>{{ VehicleTypeObject.name }}</div>

      <div class="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          v-on:click="editVehicleType = !editVehicleType"
          fill="currentColor"
          class="bi bi-pencil"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
          />
        </svg>
      </div>
    </div>
  </div>

  <div v-if="editVehicleType" class="p-4 shadow-md">
    <div class="flex flex-col">
      <form @submit.prevent="updateVehicleTypeFun">
        <input class="inputBox mb-0" v-model="VehicleTypeObject.name" />
                    <span class="text-sm text-red-500 mr-2 font-medium">{{
              formErrors.vehicleTypeName
            }}</span>

        <div class="flex flex-row items-center">
          <input
            type="checkbox"
            class="mb-2"
            v-model="VehicleTypeObject.show"
          />
          <label class="ml-2 py-0 secondaryText text-lg">Show/Hide</label>
        </div>

        <div class="flex flex-row">
          <button
            type="submit"
            v-if="!submittingForm"
            class="primaryButton text-center"
          >
            Update
          </button>
          <button
            type="submit"
            v-if="submittingForm"
            class="primaryButton text-center"
          >
            Updating
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import VehicleTypeFunctions from "@/composables/VehicleTypeFunctions";
import { successAlert, errorAlert } from "@/composables/Notifications.js";

export default {
  props: ["VehicleTypeObject"],

  setup(props) {
    const { UpdateVehicleType, GetVehicleTypeById } = VehicleTypeFunctions();

    const editVehicleType = ref(false);
    const submittingForm = ref(false);

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

    const updateVehicleTypeFun = async () => {
      clearFormErors();
      if (
        props.VehicleTypeObject.name == null ||
        props.VehicleTypeObject.name.toString().trim() == ""
      ) {
        console.log("1");
        formErrors.value.vehicleTypeName = "Name Cannot Be Null";
        return;
      }

      if (props.VehicleTypeObject.name.toString().trim().length < 2) {
        console.log("2");
        formErrors.value.vehicleTypeName =
          "Name Length Should Be Greater Than 2";
        return;
      }

      submittingForm.value = true;
      var response = await UpdateVehicleType(
        props.VehicleTypeObject.id,
        props.VehicleTypeObject.name,
        props.VehicleTypeObject.show
      );
      submittingForm.value = false;

      if (response) {
        successAlert("Updated Sucessfully");
      } else {
        errorAlert("Failed To Update");
      }

      // load the object Too....
      let res = await GetVehicleTypeById(props.VehicleTypeObject.id);
      console.log("Update it ");
      console.log(res);

      //props.VehicleTypeObject=res;
      //console.log(props.VehicleTypeObject);

      props.VehicleTypeObject.name = res.name;

      props.VehicleTypeObject.show = res.show;
    };

    return { editVehicleType, updateVehicleTypeFun, submittingForm,formErrors };
  },
};
</script>

<style>
</style>
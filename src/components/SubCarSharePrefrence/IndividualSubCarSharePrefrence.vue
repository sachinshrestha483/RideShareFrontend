<template>
  <div class="shadow-md p-8 overflow-x-auto hover:bg-gray-200 secondaryText">
    <div class="flex flex-row items-center justify-between">
      <div>{{ subCarSharePrefrenceObject.name }}</div>
      <div class="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          v-on:click="editSubCarSharePrefrence = !editSubCarSharePrefrence"
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

  <div v-if="editSubCarSharePrefrence" class="p-4 shadow-md">
    <form @submit.prevent="updateSubCarSharePrefrence">
      <div class="flex flex-col">
        <input
          required
          class="inputBox mb-0"
          v-model="subCarSharePrefrenceObject.name"
        />
        <span class="text-sm text-red-500 mr-2 font-medium">{{
          formErrors.subCarSharePrefrenceName
        }}</span>

        <select
          required
          v-model="subCarSharePrefrenceObject.travelPrefrenceId"
          name="cars"
          class="
            mt-8
            mb-0
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
          <option
            v-for="item in carSharePrefrencesList"
            :key="item"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
        <span class="text-sm text-red-500 mr-2 font-medium">{{
          formErrors.selectedCarSharePrefrenceId
        }}</span>

        <div class="flex flex-row items-center mt-4">
          <input
            type="checkbox"
            class="mb-2"
            v-model="subCarSharePrefrenceObject.show"
          />
          <label class="ml-2 py-0 secondaryText text-lg">Show/Hide</label>
        </div>

        <button   v-if="!submittingForm" class="primaryButton">Update</button>
        <button   v-else class="primaryButton" disabled >Updating</button>

      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
import { successAlert, errorAlert } from "@/composables/Notifications.js";

export default {
  props: ["subCarSharePrefrenceObject", "carSharePrefrencesList"],

  setup(props) {
    const { UpdateSubCarSharePrefrences, getIndiSubCarSharePrefrenceById } =
      CarSharePrefrenceFunctions();

    //const carSharePrefrence = props.carSharePrefrenceObject;

    const editSubCarSharePrefrence = ref(false);
    const submittingForm= ref(false);

    const clearFormErors = () => {
      const keys = Object.keys(formErrors.value);
      keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key] = null;
      });
    };

    const formErrors = ref({
      subCarSharePrefrenceName: null,
      selectedCarSharePrefrenceId: null,
    });

    const updateSubCarSharePrefrence = async () => {
      clearFormErors();

      if (
        props.subCarSharePrefrenceObject.name == null ||
        props.subCarSharePrefrenceObject.name.toString().trim() == ""
      ) {
        console.log("1");
        formErrors.value.subCarSharePrefrenceName = "Name Cannot Be Null";
        return;
      }

      if (props.subCarSharePrefrenceObject.name.toString().trim().length < 2) {
        console.log("2");
        formErrors.value.subCarSharePrefrenceName =
          "Name Length Should Be Greater Than 2";
        return;
      }

      if (props.subCarSharePrefrenceObject.travelPrefrenceId == "") {
        formErrors.value.selectedCarSharePrefrenceId =
          "Select Car Share Prefrence";
        return;
      }
submittingForm.value=true;
      let updatedObject = await UpdateSubCarSharePrefrences(
        props.subCarSharePrefrenceObject.id,
        props.subCarSharePrefrenceObject.name,
        props.subCarSharePrefrenceObject.travelPrefrenceId,
        props.subCarSharePrefrenceObject.show
      );
submittingForm.value=false;
      if (updatedObject) {
        successAlert("Updated Sucessfully");
      } else {
        errorAlert("Failed To Update");
      }

      props.subCarSharePrefrenceObject = getIndiSubCarSharePrefrenceById(
        props.subCarSharePrefrenceObject.id
      );
    };

    return { editSubCarSharePrefrence, updateSubCarSharePrefrence, formErrors ,submittingForm};
  },
};
</script>

<style>
</style>
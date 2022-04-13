<template>
  {{ formErrors }}
  <div class="pageMargin1">
    <p class="primaryHeading text-center">CarShare Prefrence Settings</p>

    <div
      class="
        md:grid md:gap-4 md:grid-cols-3 md:justify-between
        flex flex-col
        md:mt-10
        mt-8
      "
    >
      <div class="flex flex-col">
        <div>
          <input
            class="inputBox mb-0"
            v-model="carSharePrefrenceName"
            placeholder="Add Travel Prefrence"
          />
          <span class="text-sm text-red-500 mr-2 font-medium">{{
            formErrors.carSharePrefrenceName
          }}</span>
        </div>

        <div class="text-center">
          <button
            v-on:click="AddCarSharePrefrenceFun"
            class="primaryButton mt-4"
          >
            Add Prefrence
          </button>
        </div>
      </div>
      <div class="col-span-2">
        <!-- list -->
        <CarSharePrefrenceList :carSharePrefrencesList="carSharePrefrences" />
      </div>
    </div>
  </div>
</template>

<script>
import CarSharePrefrenceList from "@/components/CarSharePrefrence/CarSharePrefrenceList";
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
import { ref } from "vue";
import { successAlert, errorAlert } from "@/composables/Notifications.js";

export default {
  components: {
    CarSharePrefrenceList,
  },
  setup() {
    const { AddCarSharePrefrence, getCarSharePrefrence } =
      CarSharePrefrenceFunctions();
    const carSharePrefrenceName = ref("");
    const carSharePrefrences = ref(null);

    const clearFormErors = () => {
      const keys = Object.keys(formErrors.value);
      keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key] = null;
      });
    };

    const formErrors = ref({
      carSharePrefrenceName: null,
    });

    const loadData = async () => {
      carSharePrefrences.value = await getCarSharePrefrence();
    };

    loadData();

    const AddCarSharePrefrenceFun = async () => {
      clearFormErors();

      if (
        carSharePrefrenceName.value == null ||
        carSharePrefrenceName.value.toString().trim() == ""
      ) {
        console.log("1");
        formErrors.value.carSharePrefrenceName = "Name Cannot Be Null";
        return;
      }

      if (carSharePrefrenceName.value.toString().trim().length < 2) {
        console.log("2");
        formErrors.value.carSharePrefrenceName =
          "Name Length Should Be Greater Than 2";
        return;
      }

      let res = await AddCarSharePrefrence(carSharePrefrenceName.value);
      if (res == true) {
        console.log("Value Added");
        successAlert("Added");
        loadData();
      } else {
        errorAlert("Failed in Adding Error");
      }
    };
    return {
      AddCarSharePrefrenceFun,
      carSharePrefrenceName,
      carSharePrefrences,
      formErrors,
    };
  },
};
</script>

<style>
</style>
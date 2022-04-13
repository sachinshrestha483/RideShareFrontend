<template>
  <div class="pageMargin1 p-4 md:p-0">
    <p class="primaryHeading text-center">Sub Car Share Prefrence Settings</p>

    <div
      class="
        md:grid md:gap-4 md:grid-cols-3 md:justify-between
        flex flex-col
        md:mt-10
        mt-8
      "
    >
      <form @submit.prevent="AddSubCarSharePrefrenceFun">
        <div class="flex flex-col">
          <div>
            <input
              required
              class="inputBox mb-0"
              v-model="subCarSharePrefrenceName"
              placeholder="Add Travel Prefrence"
            />
            <span class="text-sm text-red-500 mr-2 font-medium">{{
              formErrors.subCarSharePrefrenceName
            }}</span>

            <select
              v-model="selectedCarSharePrefrenceId"
              name="cars"
              required
              class="
                mb-0
                mt-8
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
              <option value="">Select The Prefrence</option>
              <option
                v-for="item in carSharePrefrences"
                :key="item"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <span class="text-sm text-red-500 mr-2 font-medium">{{
              formErrors.selectedCarSharePrefrenceId
            }}</span>
          </div>

          <div class="text-center mt-4">
            <button type="submit" class="primaryButton"  v-if="!submittingForm"  >
              Add Sub Prefrence
            </button>
             <button type="submit" class="primaryButton"  disabled  v-else  >
              Adding  Sub Prefrence
            </button>
          </div>
        </div>
      </form>
      <div class="col-span-2">
        <!-- {{subCarSharePrefrences}} -->

        <SubCarSharePrefrenceList
          :subCarSharePrefrencesList="subCarSharePrefrences"
          :carSharePrefrencesList="carSharePrefrences"
        />
        <!-- list -->
        <!-- <CarSharePrefrenceList :carSharePrefrencesList="carSharePrefrences" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import SubCarSharePrefrenceList from "@/components/SubCarSharePrefrence/SubCarSharePrefrenceList";
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
import { ref } from "vue";
import { successAlert, errorAlert } from "@/composables/Notifications.js";

export default {
  components: {
    SubCarSharePrefrenceList,
  },
  setup() {
    const {
      AddSubCarSharePrefrence,
      getCarSharePrefrence,
      getAllSubCarPrefrences,
    } = CarSharePrefrenceFunctions();
    const subCarSharePrefrenceName = ref("");
    const selectedCarSharePrefrenceId = ref("");
    const subCarSharePrefrences = ref(null);
    const carSharePrefrences = ref([]);
    const submittingForm= ref(false);
    const loadData = async () => {
      subCarSharePrefrences.value = await getAllSubCarPrefrences();
      carSharePrefrences.value = await getCarSharePrefrence();
    };

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

    loadData();

    const AddSubCarSharePrefrenceFun = async () => {
      console.log("Add Sub Car Share Prefrence");

      clearFormErors();
      if (
        subCarSharePrefrenceName.value == null ||
        subCarSharePrefrenceName.value.toString().trim() == ""
      ) {
        console.log("1");
        formErrors.value.subCarSharePrefrenceName = "Name Cannot Be Null";
        return;
      }

      if (subCarSharePrefrenceName.value.toString().trim().length < 2) {
        console.log("2");
        formErrors.value.subCarSharePrefrenceName =
          "Name Length Should Be Greater Than 2";
        return;
      }

      if (selectedCarSharePrefrenceId.value == "") {
        formErrors.value.selectedCarSharePrefrenceId =
          "Select Car Share Prefrence";
        return;
      }
submittingForm.value=true;
      let res = await AddSubCarSharePrefrence(
        subCarSharePrefrenceName.value,
        selectedCarSharePrefrenceId.value
      );
submittingForm.value=false;



      if (res == true) {
        successAlert("Added Sucessfully");
        loadData();
      }
      else{
        errorAlert("Failed To Add it")
      }

      console.log("data Added");
      // if (res == true) {
      //   console.log("Value Added");
      //   loadData();
      // }
    };
    return {
      AddSubCarSharePrefrenceFun,
      subCarSharePrefrenceName,
      subCarSharePrefrences,
      carSharePrefrences,
      selectedCarSharePrefrenceId,
      formErrors,
      submittingForm
    };
  },
};
</script>

<style>
</style>
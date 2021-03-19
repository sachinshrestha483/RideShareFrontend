<template>
  <div class="pageMargin1 p-4 md:p-0">
    <p class="primaryHeading text-center">Sub Car Share Prefrence Settings</p>

    <div
      class="md:grid md:gap-4 md:grid-cols-3 md:justify-between flex flex-col md:mt-10 mt-8"
    >
      <form @submit.prevent="AddSubCarSharePrefrenceFun">
        <div class="flex flex-col">
          <div>
            <input
              required
              class="inputBox"
              v-model="subCarSharePrefrenceName"
              placeholder="Add Travel Prefrence"
            />
            <select
              v-model="selectedCarSharePrefrenceId"
              name="cars"
              required
              class="focus:outline-none my-4 text-gray-500 rounded-lg p-2 border-2 border-gray-200 bg-gray-200 w-full h-12 focus:border-blue-500 font-medium text-gray-500;"
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
          </div>

          <div class="text-center">
            <button type="submit" class="primaryButton">
              Add Sub Prefrence
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
    const loadData = async () => {
      subCarSharePrefrences.value = await getAllSubCarPrefrences();
      carSharePrefrences.value = await getCarSharePrefrence();
    };

    loadData();

    const AddSubCarSharePrefrenceFun = async () => {
      console.log("Add Sub Car Share Prefrence");

      let res = await AddSubCarSharePrefrence(
        subCarSharePrefrenceName.value,
        selectedCarSharePrefrenceId.value
      );

      if (res == true) {
        loadData();
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
    };
  },
};
</script>

<style>
</style>
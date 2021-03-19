<template>
  <div class="pageMargin1">
    <p class="primaryHeading text-center">CarShare Prefrence Settings</p>

    <div
      class="md:grid md:gap-4 md:grid-cols-3 md:justify-between flex flex-col md:mt-10 mt-8"
    >
      <div class="flex flex-col">
        <div>
          <input
            class="inputBox"
            v-model="carSharePrefrenceName"
            placeholder="Add Travel Prefrence"
          />
        </div>

        <div class="text-center">
          <button v-on:click="AddCarSharePrefrenceFun" class="primaryButton">
            Add Prefrence
          </button>
        </div>
      </div>
      <div class="col-span-2">
        <!-- list -->
        <CarSharePrefrenceList   :carSharePrefrencesList="carSharePrefrences" />
      </div>
    </div>
  </div>
</template>

<script>
import CarSharePrefrenceList from "@/components/CarSharePrefrence/CarSharePrefrenceList";
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
import { ref } from "vue";

export default {
  components: {
    CarSharePrefrenceList,
  },
  setup() {
    const { AddCarSharePrefrence,getCarSharePrefrence } = CarSharePrefrenceFunctions();
    const carSharePrefrenceName = ref("");
    const carSharePrefrences = ref(null);

const loadData = async () => {
      carSharePrefrences.value = await getCarSharePrefrence();
    };

    loadData();

    const AddCarSharePrefrenceFun = async () => {
      let res = await AddCarSharePrefrence(carSharePrefrenceName.value);
      if (res == true) {
        console.log("Value Added");
        loadData();
      }
    };
    return { AddCarSharePrefrenceFun, carSharePrefrenceName ,carSharePrefrences};
  },
};
</script>

<style>
</style>
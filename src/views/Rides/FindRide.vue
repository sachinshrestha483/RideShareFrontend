<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Find a Ride</div>
    <br />

    <div class="flex flex-row w-full justify-center items-center">
      <div class="flex flex-col md:w-4/12 w-10/12">
        <div class="flex flex-row justify-center">
          <input type="text" class="inputBox mb-8" />
          <vue-bootstrap-typeahead
            class=""
            ref="initialPSearchBox"
            v-on:keyup="InitialPchange"
            :data="filteredNames"
            @hit="SelectInitialPosition($event)"
          />
        </div>

        <div class="flex flex-row justify-center">
          <input type="text" class="inputBox mb-8" />
        </div>
      </div>
      <div class="flex flex-col">
        <button class="focus:outline-none">
          <img
            src="/updownarrow.svg"
            class="
              shadow-lg
              cursor-pointer
              border-4
              hover:border-blue-500
              rounded-full
            "
            width="65"
            height="65"
          />
        </button>
      </div>
    </div>

    <div class="flex flex-row w-full justify-center">
      <div class="flex flex-col">
        <div class="border-t-4 border-gray-200 mb-4"></div>
        <div class="flex flex-row justify-between">
          <div class="w-10/12">
            <input type="datetime-local" class="inputBox mb-8" />
          </div>
          <div>
            <div
              class="
                flex flex-row
                items-center
                border-l-4
                px-5
                border-gray-200
                ml-8
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-14 text-blue-500 w-14 hover:text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                v-on:click="increaseNumberofPassenger"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>

              <input
                type="number"
                class="inputBox mx-2"
                style="text-align: center"
                v-model="numberOfPassengers"
                disabled
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-14 w-14 text-blue-500 hover:text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                v-on:click="decreaseNumberofPassenger"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="border-t-4 border-gray-200 w-full"></div>
      </div>
    </div>

    <div class="flex flex-row justify-center mb-4 mt-4">
      <button class="primaryButton">Search Ride</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";

export default {
  setup() {
    const numberOfPassengers = ref(1);
    const { getNames } = OpenStreetMapFunctions();
    const mainresult = ref([]);
    const filteredNames = ref([]);
    const initialPSearchBox = ref(null);
    const finalPSearchBox = ref(null);

    const increaseNumberofPassenger = () => {
      if (numberOfPassengers.value == 6) {
        numberOfPassengers.value == 0;
      } else {
        numberOfPassengers.value++;
      }
    };
    const decreaseNumberofPassenger = () => {
      if (numberOfPassengers.value == 1) {
        numberOfPassengers.value == 1;
      } else {
        numberOfPassengers.value--;
      }
    };
    const getPlaceNames = async (name) => {
      let res = await getNames(name);
      console.log("-------res is here------");
      console.log(res);
      console.log("-------res is here------");
      mainresult.value = res;
      filteredNames.value = res.map((e) => {
        return e.display_name;
      });

      console.log("-----main Result------");
      console.log(mainresult);
      console.log(filteredNames);
      console.log("--------main Result------");
    };

    const InitialPchange = () => {
      console.log("-------Change it------");
      console.log(initialPSearchBox.value.inputValue);
      console.log(initialPSearchBox.value.inputValue);
      getPlaceNames(initialPSearchBox.value.inputValue);
    };

    const FinalPchange = () => {
      console.log("-------Change it------");
      console.log(finalPSearchBox.value.inputValue);
      console.log(finalPSearchBox.value.inputValue);
      getPlaceNames(finalPSearchBox.value.inputValue);
    };

    return {
      decreaseNumberofPassenger,
      increaseNumberofPassenger,
      numberOfPassengers,
      FinalPchange,
      InitialPchange


    };
  },
};
</script>

<style>
</style>
<template>
    <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Find a Ride</div>
    <br />

    <div class="flex flex-row w-full justify-center items-center">
      <div class="flex flex-col md:w-4/12 w-10/12">
        <div class="flex flex-row justify-center">
          <vue-bootstrap-typeahead
            class="w-full"
            ref="initialPSearchBox"
            v-on:keyup="InitialPchange"
            :data="filteredNames"
            @hit="SelectInitialPosition($event)"
          />
        </div>

        <div class="flex flex-row justify-center">
          <vue-bootstrap-typeahead
            class="w-full"
            v-on:keyup="FinalPchange"
            :data="filteredNames"
            ref="finalPSearchBox"
            @hit="SelectFinalPosition($event)"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <button class="focus:outline-none" v-on:click="swapLocations">
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
            <input
              v-model="rideDateTime"
              type="datetime-local"
              class="inputBox mb-8"
            />
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
      <button class="primaryButton" v-on:click="findRide">Search Ride</button>
    </div>
  </div>

  {{ initialPosition }}
  {{ finalPosition }}
  {{ rideDateTime }}
  {{ numberOfPassengers }}

</template>

<script>
import { ref, computed } from "vue";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import { FindRide } from "@/composables/RideFunctions";
import { FindRideDto } from "@/utility/Dtos/FindRideDto";
import GeoCordinatesFunction from "@/composables/GeoCordinatesFunctions";
import Store from "@/store/index";
export default {
  components: {
    VueBootstrapTypeahead,
  },
}
</script>

<style>

</style>
<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Your Rides</div>

    <div class="flex flex-row justify-center w-full">
      <div class="flex flex-col md:w-6/12 w-10/12">
        <div
          v-for="ride in rides"
          :key="ride.id"
          class="
            shadow-md
            p-8
            hover:bg-gray-200
            text-md text-gray-600
            mb-2
            md:text-left
            text-center
            font-bold
            rounded-lg
            shadow-xl
          "
        >
          <router-link
            :to="{
              name: 'YourRidesRide',
              params: {
                id: ride.id,
              },
            }"
          >
            <div class="text-2xl mb-4 ml-1">


              {{GetHumanReadabledate(new Date(ride.dateTimeOfRide))}}
             
              <!-- {{
                days[new Date(ride.dateTimeOfRide).getDay()].substring(0, 3)
              }},{{ new Date(ride.dateTimeOfRide).getDate() }}
              {{
                months[new Date(ride.dateTimeOfRide).getMonth()].substring(
                  0,
                  3
                )
              }},{{ new Date(ride.dateTimeOfRide).getHours() }}:{{
                new Date(ride.dateTimeOfRide).getMinutes()
              }} -->
            </div>

            <div class="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-circle-fill text-md ml-1"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              &nbsp;{{ ride.startLocationName }}
            </div>
            <div class="h-12 border-l-4 border-gray-600 ml-2"></div>
            <div class="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-circle-fill text-md ml-1"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" />
              </svg>
              &nbsp;

              {{ ride.endLocationName }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getMyRides } from "@/composables/RideFunctions";
import UtilityData from "@/utility/UtilityData";
import * as moment from "moment";
import UtilityFunctions from "@/utility/UtilityFunctions"

export default {
  components: {},
  setup() {
    const rides = ref([]);
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "january",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    getMyRides().then((responseObject) => {
      console.log(responseObject);
      if (responseObject.haveError) {
        console.log("Error Here");
      }
      rides.value = responseObject.responseObject;
    });

    const {GetHumanReadabledate}= UtilityFunctions();



    return { rides, days, months ,GetHumanReadabledate};
  },
};
</script>

<style>
</style>
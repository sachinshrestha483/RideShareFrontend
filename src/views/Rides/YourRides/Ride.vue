<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Ride Plan</div>

    <div class="flex flex-row justify-center w-full" v-if="ride != null">
      <div class="flex flex-col md:w-6/12 w-10/12">
        <div
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
          <div class="text-2xl mb-4 ml-1">
           {{initialDateTimeString}} 
            <!-- {{
              days[new Date(ride.dateTimeOfRide).getDay()].substring(0, 3)
            }},{{ new Date(ride.dateTimeOfRide).getDate() }}

            {{
              months[new Date(ride.dateTimeOfRide).getMonth()].substring(0, 3)
            }},{{ new Date(ride.dateTimeOfRide).getHours() }}:{{
              new Date(ride.dateTimeOfRide).getMinutes()
            }} -->
          </div>

         <router-link
            :to="{
              name: 'YourRidepath',
              params: { id: ride.id , zoomlat:ride.startLocationLatitude, zoomlon:ride.startLocationLongitude },
            }"
            class="flex flex-row items-center"
          >
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

            (

                         {{initialDateTimeString}} 

            <!-- {{
              days[new Date(ride.dateTimeOfRide).getDay()].substring(0, 3)
            }},{{ new Date(ride.dateTimeOfRide).getDate() }}

            {{
              months[new Date(ride.dateTimeOfRide).getMonth()].substring(0, 3)
            }},{{ new Date(ride.dateTimeOfRide).getHours() }}:{{
              new Date(ride.dateTimeOfRide).getMinutes()
            }} -->

            )

            <div class="grid grid-cols-3 gap-4 grid-row-reverse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 col-span-1 text-right"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
         </router-link>

          <div class="h-12 border-l-4 border-gray-600 ml-2"></div>

         <router-link
            :to="{
              name: 'YourRidepath',
              params: { id: ride.id , zoomlat:ride.endLocationLatitude, zoomlon:ride.endLocationLongitude},
            }"
            class="flex flex-row items-center"
          >
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

            (
             {{finalDateTimeString}} 
              <!-- {{ new Date(ride.destinationReachingDateTime)}}

            {{
              days[
                new Date(ride.destinationReachingDateTime).getDay()
              ].substring(0, 2)
            }}, -->
            <!-- {{ new Date(ride.destinationReachingDateTime).getDate() }} -->

            <!-- {{
              months[
                new Date(ride.destinationReachingDateTime).getMonth()
              ].substring(0, 3)
            }},{{ new Date(ride.destinationReachingDateTime).getHours() }}:{{
              new Date(ride.destinationReachingDateTime).getMinutes()
            }} -->

            )

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-right"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

  

<script>
import { ref } from "vue";

import { getMyRides, getMyRide } from "@/composables/RideFunctions";

import { useRoute, useRouter } from "vue-router";
import * as moment from "moment";


import UtilityData from "@/utility/UtilityData";
export default {
  setup() {
    const ride = ref(null);
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



    const router = useRoute();

    let rideId = router.params.id;


  const initialDateTimeString= ref(null)
  const finalDateTimeString = ref(null);


    getMyRide(rideId).then((responseObject) => {
      console.log("Response Object");

      console.log(responseObject);

      if (responseObject.haveError) {
        return;
      }

      /// Calculating Other Values

      ride.value = responseObject.responseObject;
      let speedinmpersec = UtilityData.averageSpeedinKmph / 3.6;

      let distanceinMeter = responseObject.responseObject.distanceinMeter;

      let localInitialDateTime = new Date(ride.value.dateTimeOfRide);

      console.log("local Initial Date time");

      console.log(localInitialDateTime);

      let timeinSeconds = Math.round(distanceinMeter / speedinmpersec);

      console.log("Time is Here ");

      console.log(timeinSeconds);

      let localFinalDateTime = localInitialDateTime;

      initialDateTimeString.value= moment(localInitialDateTime).format('MMMM Do YYYY, h:mm a')

      localFinalDateTime.setSeconds(
        localFinalDateTime.getSeconds() + timeinSeconds
      );

      console.log(localFinalDateTime);

      ride.value.destinationReachingDateTime = localFinalDateTime;
      finalDateTimeString.value= moment(localFinalDateTime).format('MMMM Do YYYY, h:mm a')  
    });

    return { ride, days, months, initialDateTimeString , finalDateTimeString };
  },
};
</script>

<style>
</style>
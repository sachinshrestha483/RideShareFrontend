<template>
  <div class="flex flex-row justify-center w-full">
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
            <div class="flex justify-between">
              <div>
                {{
                  days[
                    new Date(ride.dateTimeOfRide).getDay()
                  ].substring(0, 3)
                }},{{ new Date(ride.dateTimeOfRide).getDate() }}
                {{
                  months[
                    new Date(ride.dateTimeOfRide).getMonth()
                  ].substring(0, 3)
                }},{{
                  new Date(ride.dateTimeOfRide).getHours()
                }}:{{
                  new Date(ride.dateTimeOfRide).getMinutes()
                }}
              </div>
            </div>
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

            <div class="ml-2 truncate">
              {{ ride.startLocationName }}
            </div>
          </div>

          <div
            :class="`flex flex-col
              ${
                ride.intermediatePositions.length == 0
                  ? ' h-12	 '
                  : ' min-h-40'
              }
              border-l-4 border-gray-600
              ml-2
              text-left`"
          >
            <!-- <div class="h-12 border-l-4 border-gray-600 ml-2"></div> -->
            <div
              v-for="item in ride.intermediatePositions"
              :key="item.id"
              class="ml-4 text-left"
            >
              {{ item.positionName }}<br />
            </div>
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
            <div class="ml-2 truncate">
              {{ ride.endLocationName }}
            </div>
          </div>

          <div class="flex flex-row items-center justify-between mt-2">
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>
              {{ ride.numberofPassenger }}
            </div>
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {{ ride.price }}
            </div>
            <div class="flex justify-between items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="18" cy="5" r="2" />
                <path
                  d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5"
                />
              </svg>
              {{
                ride.distanceinMeter > 0 &&
                typeof ride.distanceinMeter == "number"
                  ? Math.round(ride.distanceinMeter / 1000)
                  : "0"
              }}
              km
              <!-- {{typeof(ride.responseObject.distanceinMeter)}} -->
            </div>
          </div>

          <div class="mt-2">
            <div class="text-center">
              {{ ride.routeVia }}
            </div>
          </div>

          <div
            class="mt-2 text-center flex justify-center items-center"
            v-if="ride.vehicle != null"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path
                d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"
              />
            </svg>

            {{ ride.vehicle.companyName }} {{ ride.vehicle.modelName }} ({{
              ride.vehicle.licensePlateNumber
            }}) ({{ ride.vehicle.color }})
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
 props:["ride"],
setup(props){
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
    return {days, months}
}
}
</script>

<style>

</style>
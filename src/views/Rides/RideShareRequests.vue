<template>
  <div class="pageMargin1">
    <div class="flex flex-col">
      <div class="text-center secondaryText mb-2 gap-4">
        Ride Sharing Requests
      </div>
      <div>
        {{ currentIndex }}
        Prev Possible{{ isPrevPossible }} isNextPossible{{ isNextPossible }}
        {{ list.length }}
        <!-- current Ride Share Offer {{currentRideShareOffer}} -->
        <!-- {{ list }}  -->
      </div>
      <div>
        <div class="flex flex-row justify-between">
          <div>
            <svg
              v-on:click="gotoPrevious"
              v-if="isPrevPossible"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
              />
            </svg>
          </div>

          <div>
            <svg
              v-on:click="goToNext"
              v-if="isNextPossible"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div v-if="dataLoaded && currentRideShareOffer != null">
        <div :key="currentIndex">
          Id- {{ currentRideShareOffer.id }}
          <!-- {{currentRideShareOffer}} -->

          <RideSummaryBox :ride="currentRideShareOffer.ride" />

          <CreateRideSharingRequest
            :key="rideSharingRequestComponentkey"
            class="mb-4"
            :avaliableSeats="currentRideShareOffer.ride.numberofPassenger"
            :rideId="currentRideShareOffer.ride.id"
            :startLat="null"
            :startLon="null"
            :endLat="null"
            :endLon="null"
            :startLocationName="null"
            :endLocationName="null"
            :numOfPassengers="currentRideShareOffer.numberOfPassengers"
            :reRender="reRender"
            :distanceFromInitialPosition="
              currentRideShareOffer.distancefromInitialLocation
            "
            :distanceFromFinalPosition="
              currentRideShareOffer.distancefromFinalLocation
            "
            :overLappingPath="currentRideShareOffer.overlappingPath"
            :ride="currentRideShareOffer.ride"
          />
        </div>
      </div>

      <!-- <div v-for="ridesharerequest in list" :key="ridesharerequest.id">
        <CreateRideSharingRequest
          :key="CreateRideSharingRequestComponentkey"
          class="mb-4"
          :avaliableSeats="ridesharerequest.ride.numberofPassenger"
          :rideId="ridesharerequest.ride.id"
          :startLat="null"
          :startLon="null"
          :endLat="null"
          :endLon="null"
          :startLocationName="null"
          :endLocationName="null"
          :numOfPassengers="$route.params.numofPassengers"
          :reRender="reRenderCreateRideSharingRequestComponent"
          :distanceFromInitialPosition="
            rideOverlappingData.responseObject.distanceFromInitialPosition
          "
          :distanceFromFinalPosition="
            rideOverlappingData.responseObject.distanceFromFinalPosition
          "
          :overLappingPath="overlappingPath"
          :ride="ride.responseObject"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import Store from "@/store/index";
import GeoCordinatesFunction from "@/composables/GeoCordinatesFunctions.js";
import {
  SaveRideShareOffer,
  getRideShareOffer,
  DeleteRideShareOffer,
  getRideShareOfferStatusText,
  getAllRideShareOffers,
} from "@/composables/RideFunctions";
import CreateRideSharingRequest from "@/components/Rides/Ride/CreateRideSharingRequest.vue";

import RideSummaryBox from "@/components/Rides/Ride/RideSummaryBox.vue";

export default {
  components: {
    CreateRideSharingRequest,
    RideSummaryBox,
  },

  props: [],

  setup(porps) {
    const list = ref([]);
    const dataLoaded = ref(false);
    const currentIndex = ref(0);
    const isNextPossible = computed(() => {
      return currentIndex.value < list.value.length - 1;
    });
    const rideSharingRequestComponentkey = ref(0);
    const reRender = () => {
      rideSharingRequestComponentkey.value++;
    };

    const isPrevPossible = computed(() => {
      return currentIndex.value > 0;
    });

    const currentRideShareOffer = ref(null);

    const goToNext = () => {
      console.log("Adding element");
      console.log(currentIndex);
      if (currentIndex.value < list.value.length - 1) {
        console.log("Inside if loop");
        currentIndex.value++;
      }
      console.log(currentIndex);
      currentRideShareOffer.value = list.value[currentIndex.value];
    };

    const gotoPrevious = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
      currentRideShareOffer.value = list.value[currentIndex.value];
    };

    const getData = async () => {
      const response = await getAllRideShareOffers();
      list.value = response.responseObject;
    };

    onMounted(async () => {
      await getData();
      dataLoaded.value = true;
      currentRideShareOffer.value = list.value[currentIndex.value];
    });

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

    return {
      list,
      isNextPossible,
      isPrevPossible,
      goToNext,
      gotoPrevious,
      currentIndex,
      currentRideShareOffer,
      reRender,
      rideSharingRequestComponentkey,
      dataLoaded,
      days,
      months,
    };
  },
};
</script>

<style>
</style>
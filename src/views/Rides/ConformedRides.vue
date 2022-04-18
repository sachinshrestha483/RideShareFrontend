<template>
  <div class="pageMargin1">
    <div class="flex flex-col">
      <div class="text-center secondaryText mb-2 gap-4">
        Confirmed Ride Requests
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
           <!-- {{currentRideShareOffer}}  -->

           <!-- <RideSharePaymentBox  :rideShareOfferId="currentRideShareOffer.ride" :rideCreaterId="currentRideShareOffer.ride.userId"  /> -->

          <RideSummaryBox :ride="currentRideShareOffer.ride" />

          <UserInfo  :userId="currentRideShareOffer.ride.userId"  :title="`Driver Info`" class="mt-8"/>
         
          <NotesForOfferCreator  :title="`Notes For Offer Creator`" :bodyText="currentRideShareOffer.notesForOfferCreator" class="mt-8"  />
         
          <VehicleInfo :vehicleId="currentRideShareOffer.ride.vehicleId" class="mt-8"  />

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
    
      <div
      class="flex flex-col fixed bottom-0 right-0 bg-white z-50 h-fit"
     :key="currentIndex"
      v-if="showchatBox && dataLoaded && currentRideShareOffer != null"
    >
      <div class="flex flex-row-reverse w-full">
        <div>
          <svg
            v-on:click="showchatBox = !showchatBox"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-circle-fill text-gray-500"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
            />
          </svg>
        </div>
      </div>
      <ChatBox
        class="h-fit"
        :key="rideSharingRequestComponentkey"
        :rideShareRequestId="currentRideShareOffer.id"
      />
    </div>

    <div
      v-if="!showchatBox"
      class="
        w-16
        h-16
        bg-blue-500
        hover:blue-600
        rounded-full
        p-0
        pl-2
        pt-2
        fixed
        mb-8
        mr-4
        bottom-0
        right-0
        z-20
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        fill="currentColor"
        class="text-white text-center bi bi-messenger hover:text-gray-200"
        viewBox="0 0 16 16"
        v-on:click="showchatBox = !showchatBox"
      >
        <path
          d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import Store from "@/store/index";
import GeoCordinatesFunction from "@/composables/GeoCordinatesFunctions.js";
import ChatBox from "@/components/Rides/RideShare/ChatBox"

import {
  SaveRideShareOffer,
  getRideShareOffer,
  DeleteRideShareOffer,
  getRideShareOfferStatusText,
  getAllRideShareOffers,
} from "@/composables/RideFunctions";
import CreateRideSharingRequest from "@/components/Rides/Ride/CreateRideSharingRequest.vue";
import UserInfo from "@/components/User/UserInfo.vue";
import NotesForOfferCreator from "@/components/Rides/Ride/NotesForRideCreator"
import RideSummaryBox from "@/components/Rides/Ride/RideSummaryBox.vue";
import VehicleInfo from "@/components/Vehicle/VehicleInfo"
import RideSharePaymentBox from "@/components/Rides/RideShare/RideSharePaymentBox"

export default {
  components: {
    CreateRideSharingRequest,
    RideSummaryBox,
    ChatBox,
    UserInfo,
    NotesForOfferCreator,
    VehicleInfo,
    RideSharePaymentBox
  },

  props: [],

  setup(porps) {
    const list = ref([]);
    const dataLoaded = ref(false);
    const showchatBox = ref(false);
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
      list.value = response.responseObject.filter(e=>e.rideShareOfferStatus == 1);
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
      showchatBox,
    };
  },
};
</script>

<style>
</style>
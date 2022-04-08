<template>
  <div class="pageMargin1">
    <!-- {{$store.state.user }} -->
    <!-- {{ $route.params.id }}
    {{ $route.params }} -->
     <!-- Store  {{ $store}} -->
     <!-- {{$store.state.user}} -->
    <!-- {{ ride }} -->
    <!-- {{ ride }}
    {{ rideOverlappingData }} -->
  </div>
  <div>
    <div
      v-if="
        ride != null && rideOverlappingData != null && overlappingPath != null &&$store.state.user!=null
      "
    >
      <!-- {{ride.responseObject.path}} -->
      <!-- {{JSON.parse(ride.responseObject.path)[0]}} -->
      <!-- {{overlappingPath}} -->
      <RideDetails
        :rideId="$route.params.id"
        :overLappingPath="overlappingPath"
        :searchedinitialPosition="{
          name: $route.params.startLocationName,
          lat: $route.params.startLat,
          lon: $route.params.startLon,
        }"
        :searchedFinalPosition="{
          name: $route.params.endLocationName,
          lat: $route.params.endLat,
          lon: $route.params.endLon,
        }"
        class="mb-4"
        :distanceFromInitialPosition="
          rideOverlappingData.responseObject.distanceFromInitialPosition
        "
        :distanceFromFinalPosition="
          rideOverlappingData.responseObject.distanceFromFinalPosition
        "
      />

      <CreateRideSharingRequest
      v-if="ride.responseObject.rideId== $store.state.user.id "
        class="mb-4"
        :avaliableSeats="ride.responseObject.numberofPassenger"
        :rideId="$route.params.id"
        :startLat="$route.params.startLat"
        :startLon="$route.params.startLon"
        :endLat="$route.params.endLat"
        :endLon="$route.params.endLon"
        :startLocationName="$route.params.startLocationName"
        :endLocationName="$route.params.endLocationName"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import RideDetails from "@/components/Rides/Ride/RideDetails.vue";
import CreateRideSharingRequest from "@/components/Rides/Ride/CreateRideSharingRequest.vue";

import {
  GetRideOverlappingDetails,
  getMyRide,
} from "@/composables/RideFunctions";
import Store from "@/store/index";

export default {
  components: {
    RideDetails,
    CreateRideSharingRequest,
  },

  setup() {
    // console.log(useRoute.arguments);
    const router = useRoute();
    let rideId = router.params.id;

    const ride = ref(null);
    const rideOverlappingData = ref(null);
    const overlappingPath = ref(null);

    const getRide = async () => {
      let response = await getMyRide(rideId);
      ride.value = response;
    };

    const getRideData = async () => {
      console.log("Findig the Ride");
      console.log("Findig the Ride");
      console.log("Ride");
      let findRideDto = {};
      let user = Store.state.user;
      console.log(user);
      if (user == null) {
        console.log("User is Null");
        return;
      }
      findRideDto.UserId = user.id;
      findRideDto.StartPosition = {
        name: "",
        lat: router.params.startLat,
        lon: router.params.startLon,
      };
      findRideDto.EndPosition = {
        name: "",
        lat: router.params.endLat,
        lon: router.params.endLon,
      };
      findRideDto.rideId = parseInt(rideId);
      console.log(findRideDto);
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      console.log("Call The Find Ride Function");
      let response = await GetRideOverlappingDetails(findRideDto);
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      console.log("After Call The Find Ride Function");
      console.log(response);
      rideOverlappingData.value = response;
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Setting Query Response");
      console.log("Value Putted in it");
      console.log("Find Ride response");
    };

    onMounted(async () => {
      await getRide();
      await getRideData();
      overlappingPath.value = JSON.parse(ride.value.responseObject.path).slice(
        rideOverlappingData.value.responseObject.overLappingPathStartIndex,
        rideOverlappingData.value.responseObject.overLappingPathEndIndex
      );

      console.log(overlappingPath);
    });

    return { rideOverlappingData, ride, overlappingPath };
  },
};
</script>

<style>
</style>
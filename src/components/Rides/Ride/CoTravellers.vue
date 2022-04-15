<template>
  <div class="flex flex-row justify-center w-full">
    <div
      class="flex flex-col md:w-8/12 w-11/12"
      v-if="rideShareOffer != null && user != null"
    >
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
        <div class="flex flex-col text-lg gap-8">
          <!-- sdsd -->
          <!-- {{ user }} -->
          <div class="flex flex-row-reverse gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              v-on:click="UpdateRideShareOffer"
              width="22"
              height="22"
              class="text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              v-on:click="showMap = !showMap"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-pin-map-fill text-blue-500"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
              />
              <path
                fill-rule="evenodd"
                d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
              />
            </svg>
          </div>

          <div class="flex flex-row gap-8 justify-around items-center">
            <div>
              <img
                class="object-fill h-32 w-32 rounded-full ..."
                :src="user.profilePhotoUrl"
              />
            </div>
            <div class="flex flex-col w-full">
              <div class="">
                Name : {{ user.firstName }} {{ user.lastName }} ({{
                  rideShareOffer.numberOfPassengers > 1
                    ? `+ ${rideShareOffer.numberOfPassengers - 1}`
                    : ``
                }})
              </div>
              <div class="gap-8"></div>
              <div class="flex flex-row items-center gap-4">
                <div>
                  {{ rideShareOffer.startLocationName }}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </div>

                <div>
                  {{ rideShareOffer.endLocationName }}
                </div>
              </div>
              <!-- {{mapObject}} -->
            </div>
          </div>

          <div class="flex flex-row">
            <div
              class="w-full h-60 bg-red-500 w-8/12"
              v-if="
                mapObject != null && rideShareOffer != null && showMap == true
              "
            >
              <RideSharingRequestMap
                :searchedStartLocation="mapObject.searchedStartLocation"
                :searchedEndLocation="mapObject.searchedEndLocation"
                :startLocation="mapObject.startLocation"
                :endLocation="mapObject.endLocation"
                :path="rideShareOffer.ride.path"
                :overlappingPath="mapObject.overlappingPath"
                :intermediatePoints="rideShareOffer.ride.intermediatePositions"
                :distanceFromOfferedInitialPoint="
                  rideShareOffer.distanceFromInitialPosition
                "
                :distanceFromOfferedFinalPoint="
                  rideShareOffer.distanceFromFinalPosition
                "
                :overlappingStartIndex="0"
                :overlappingEndIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Identity from "@/composables/Identity";
import { getRideShareOfferById,SetResponseToRideShareOffer } from "@/composables/RideFunctions";
import RideSharingRequestMap from "@/components/Rides/Ride/RideSharingRequestMap.vue";
import { successAlert, errorAlert } from "@/composables/Notifications.js";

export default {
  components: { RideSharingRequestMap },
  props: ["RideShareOfferId", "reRender"],
  setup(props) {
    const user = ref(null);
    const numberOfPassengers = ref(null);
    const rideShareOffer = ref(null);
    const mapObject = ref(null);
    const showMap = ref(false);

    let { UserPublicProfile } = Identity();
    const loadData = async () => {
      let rideShareOfferResponse = await getRideShareOfferById(
        props.RideShareOfferId
      );
      rideShareOffer.value = rideShareOfferResponse.responseObject;
      let response = await UserPublicProfile(rideShareOffer.value.userId);
      if (response != null) {
        user.value = response;
      }
    };

    const UpdateRideShareOffer = async () => {
      const rideShareOfferb = {
        messageForOfferCreator: rideShareOffer.value.notesForOfferCreator,
        rideShareOfferId: rideShareOffer.value.id,
        statusId: 2,
      };
      console.log("rideShareOffer");
      console.log(rideShareOfferb);
      let response =  await SetResponseToRideShareOffer(rideShareOfferb);
      if(response.haveError)
      {
        errorAlert("Error While Rejecting it")
      }
      else{
        successAlert("Status Changed to rejected")
      }

      props.reRender();
    };

    onMounted(async () => {
      await loadData();

      mapObject.value = {
        searchedStartLocation: {
          name: rideShareOffer.value.startLocationName,
          lat: parseFloat(rideShareOffer.value.startLocationLatitude),
          lon: parseFloat(rideShareOffer.value.startLocationLongitude),
        },
        searchedEndLocation: {
          name: rideShareOffer.value.endLocationName,
          lat: parseFloat(rideShareOffer.value.endLocationLatitude),
          lon: parseFloat(rideShareOffer.value.endLocationLongitude),
        },

        path: rideShareOffer.value.ride.path,
        startLocation: {
          name: rideShareOffer.value.ride.startLocationName,
          lat: rideShareOffer.value.ride.startLocationLatitude,
          lon: rideShareOffer.value.ride.startLocationLongitude,
        },
        endLocation: {
          name: rideShareOffer.value.ride.endLocationName,
          lat: rideShareOffer.value.ride.endLocationLatitude,
          lon: rideShareOffer.value.ride.endLocationLongitude,
        },
        overlappingPath: JSON.parse(rideShareOffer.value.overlappingPath),
      };
    });
    return {
      user,
      rideShareOffer,
      mapObject,
      showMap,
      UpdateRideShareOffer,
    };
  },
};
</script>

<style>
</style>
<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-center">
      <div class="flex flex-col">
        <div class="text-left secondaryText">Create Sharing Request</div>
        <div class="flex flex-row items-center px-5">
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
            class="inputBox"
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
        <label
          class="text-md text-gray-600 mb-2 text-center text-center font-bold"
          >Price</label
        >
        <input
          type="number"
          class="inputBox"
          style="text-align: center"
          v-model="price"
        />
        <label class="text-md text-gray-600 mb-2 text-center font-bold"
          >Notes</label
        >

        <textarea
          type="text"
          class="inputBox"
          style="text-align: center"
          v-model="notes"
        />
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <button class="primaryButton" v-on:click="createRideShareOffer">
        Create Ride Sharing Request
      </button>
    </div>
  </div>

  <!-- <div
    class="
      shadow-md
      p-8
      text-md text-gray-600
      mb-2
      md:text-left
      text-center
      font-bold
      rounded-lg
      shadow-xl
    "
  >
    <div class="flex flex-col  ">
      <div class="w-4/12">
        <div class="text-left">Share Ride</div>
        <div class="flex flex-row items-center px-5 ml-8">
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
  </div> -->
</template>

<script>
import { ref, computed } from "vue";
import { SaveRideShareOffer } from "@/composables/RideFunctions";
import Store from "@/store/index";


export default {
  props: ["avaliableSeats","rideId", "startLocationName","startLat","startLon", "endLat", "endLon","endLocationName"],

  setup(props) {
    const numberOfPassengers = ref(0);
    const notes = ref("");
    const price = ref("");
     let user = Store.state.user;
      console.log(user);

    const increaseNumberofPassenger = () => {
      if (numberOfPassengers.value == props.avaliableSeats) {
        numberOfPassengers.value = 0;
      } else {
        numberOfPassengers.value++;
      }
    };

    const decreaseNumberofPassenger = () => {
      if (numberOfPassengers.value == 1) {
        numberOfPassengers.value = 1;
      } else {
        numberOfPassengers.value--;
      }
    };

    const createRideShareOffer = async () => {
      const rideShareOffer = {
        rideId:parseInt(props.rideId)  ,
        numberOfPassengers: numberOfPassengers.value,
        startLocationName: (props.startLocationName!=null)?props.startLocationName:" ",
        endLocationName: (props.endLocationName!=null)?props.endLocationName:" ",
        startLocationLatitude:  parseFloat(props.startLat),
        startLocationLongitude: parseFloat(props.startLon),
        endLocationLatitude: parseFloat(props.endLat) ,
        endLocationLongitude: parseFloat(props.endLon)    ,
        offeredPrice:  parseInt(price.value),
        notesForRideCreater: notes.value,
      //  notesForOfferCreator: "string",
        // rideShareOfferStatus: 0,
        //createdDateTime: "2022-04-07T15:42:36.842Z",
        //lastUpdated: "2022-04-07T15:42:36.842Z",
        userId: user.id,
      };
      console.log("rideShareOffer")

      console.log(rideShareOffer)

     await SaveRideShareOffer(rideShareOffer);
    };

    return {
      increaseNumberofPassenger,
      decreaseNumberofPassenger,
      numberOfPassengers,
      notes,
      price,
      createRideShareOffer,
    };
  },
};
</script>

<style>
</style>
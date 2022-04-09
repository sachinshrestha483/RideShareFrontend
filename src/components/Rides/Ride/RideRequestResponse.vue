<template>
  <div
    class="flex flex-row justify-center w-full"
    v-if="savedRideShareOffer != null"
  >
    <div class="flex flex-col md:w-6/12 w-10/12">
      <div
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
        <div class="text-2xl mb-4 ml-1">Respond To Request</div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-4 justify-between">
            <div class="flex flex-col justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="`h-5 w-5 ${
                  approved == responseTypeId ? 'text-blue-500' : ''
                }  `"
                v-on:click="responseTypeId = approved"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="text-sm">Approve</div>
            </div>

            <div class="flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="`h-5 w-5 ${
                  rejected == responseTypeId ? 'text-red-500' : ''
                }  `"
                v-on:click="responseTypeId = rejected"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>

              <div class="text-sm">Reject</div>
            </div>

            <div class="flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="`h-5 w-5 ${
                  updated == responseTypeId ? 'text-blue-500' : ''
                }  `"
                v-on:click="responseTypeId = updated"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clip-rule="evenodd"
                />
              </svg>

              <div class="text-sm">Updated</div>
            </div>

            <div class="flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="`h-5 w-5 ${
                  intersted == responseTypeId ? 'text-blue-500' : ''
                }  `"
                v-on:click="responseTypeId = intersted"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                />
              </svg>
              <div class="text-sm">Intrested</div>
            </div>
          </div>
          <div>
            <input
              type="text"
              class="inputBox"
              placeholder="Message For Request Owner"
              v-model="message"
            />
            <button
              class="primaryButton w-full"
              v-on:click="UpdateRideShareOffer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  getRideShareOfferStatusText,
  setRideSharerequestForReview,
  SetResponseToRideShareOffer,
  getRideShareOfferById,
} from "@/composables/RideFunctions";

export default {
  props: ["RideShareRequest", "reRender"],
  setup(props) {
    const approved = 1;
    const rejected = 2;
    const updated = 5;
    const intersted = 3;
    const responseTypeId = ref(4);
    const message = ref("");
    const savedRideShareOffer = ref(null);
    // const getAllRideShareOfferForUserRide

    const getRideShareOfferStatusTextFun = async (id) => {
      var response = await getRideShareOfferStatusText({
        rideId: props.RideShareRequest.id,
      });
      console.log(response);
      if (response.objSubmitted == false) {
        return null;
      } else {
        return response.responseObject.name;
      }
    };

    onMounted(async () => {
      console.log("Ride Share Request Id");
      console.log(props.RideShareRequest);

      await setRideSharerequestForReview({
        rideId: props.RideShareRequest.id,
      });

      var response = await getRideShareOfferById(props.RideShareRequest.id);
      savedRideShareOffer.value = response.responseObject;

      responseTypeId.value = savedRideShareOffer.value.rideShareOfferStatus;
      message.value=savedRideShareOffer.value.notesForOfferCreator
    });

    const UpdateRideShareOffer = async () => {
      const rideShareOffer = {
        messageForOfferCreator: message.value,
        rideShareOfferId: props.RideShareRequest.id,
        statusId: responseTypeId.value,
      };
      console.log("rideShareOffer");
      console.log(rideShareOffer);
      await SetResponseToRideShareOffer(rideShareOffer);
      props.reRender();
    };

    return {
      UpdateRideShareOffer,
      responseTypeId,
      approved,
      rejected,
      updated,
      intersted,
      message,
      savedRideShareOffer,
    };
  },
};
</script>

<style scoped>
</style>

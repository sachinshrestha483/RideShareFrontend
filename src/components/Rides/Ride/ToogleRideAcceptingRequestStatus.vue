<template>
  <div class="flex flex-row justify-center w-full">
          <!-- shadow-md
          p-8
          hover:bg-gray-200
          text-md text-gray-600
          mb-2
          md:text-left
          text-center
          font-bold
          rounded-lg
          shadow-xl -->
    <div class="flex flex-col w-6/12 p-1 mb-8" v-if="dataLoaded">
      <div
        class="

        "
      >
        <div class="flex flex-row-reverse">
          <div class="flex justify-center">
            <svg
            v-on:click="toogleAcceptingRequestStatus"
              xmlns="http://www.w3.org/2000/svg"
              v-if="isAcceptingRequestStatus"
              class="h-6 w-6 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>

            <svg
            v-on:click="toogleAcceptingRequestStatus"
              xmlns="http://www.w3.org/2000/svg"
              v-else
              class="h-6 w-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clip-rule="evenodd"
              />
              <path
                d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
// import {
//   toogleIsAcceptingRideRequest,
//   getIsAcceptingRideRequestStatus,
// } from "@/composables/RideFunctions";
import { successAlert, errorAlert } from "@/composables/Notifications.js";
import {
  toogleIsAcceptingRideRequest,
  getIsAcceptingRideRequestStatus,
} from "@/composables/RideFunctions.js";

export default {
  props: ["rideId"],
  setup(props) {
    //   onMounted(async()=>{

    //       await toogleIsAcceptingRideRequest({id:props.rideId})

    //   })
    const isAcceptingRequestStatus = ref(false);
    const dataLoaded = ref(false);
    const loadData = async () => {
      let response = await getIsAcceptingRideRequestStatus({
        id: props.rideId,
      });
      isAcceptingRequestStatus.value = response.responseObject.status;
    };

    onMounted(async () => {
      await loadData();
      dataLoaded.value = true;
    });

    const toogleAcceptingRequestStatus = async () => {
      let response = await toogleIsAcceptingRideRequest({ id: props.rideId });
      if (response == true) {
        successAlert("Status Changed Sucessfully");
        loadData();
      } else {
        errorAlert("Error While Changing Status");
      }
    };

    return {
      isAcceptingRequestStatus,
      toogleAcceptingRequestStatus,
      dataLoaded,
    };
  },
};
</script>

<style>
</style>
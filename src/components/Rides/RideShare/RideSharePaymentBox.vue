<template>
  <div
    v-if="rideShareOffer != null && rideShareOffer.rideShareOfferStatus == 1"
  >
    <!-- offer creator view {{ isOffercreatorView }}
    {{ rideShareOfferId }}
    {{ price }}
    {{ rideShareOffer.isPaymentDone }} -->

    

    <div
      v-if="!isOffercreatorView"
      class="
        text-gray-600
        p-4
        shadow-md
        font-bold
        bg-gray-100
        rounded-xl
        flex flex-row
        items-center
        gap-4
        text-md
      "
    >
      <div
        class="flex flex-row items-center gap-4"
        v-if="rideShareOffer.isPaymentDone"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-patch-check-fill text-green-500"
          viewBox="0 0 16 16"
        >
          <path
            d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"
          />
        </svg>
        <div>
          Payment Done for Amount {{ rideShareOffer.onlineCollectedAmount }}
        </div>
      </div>

      <div class="flex flex-row items-center gap-4" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-x-circle-fill text-red-500"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
          />
        </svg>
        <div>Payment Not Done Yet</div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="rideShareOffer.isPaymentDone"
        class="
          text-gray-600
          p-4
          shadow-md
          font-bold
          bg-gray-100
          rounded-xl
          flex flex-row
          items-center
          gap-4
          text-md
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-patch-check-fill text-green-500"
          viewBox="0 0 16 16"
        >
          <path
            d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"
          />
        </svg>
        Payment Done for Amount {{ rideShareOffer.onlineCollectedAmount }}
      </div>
      <div v-if="parseInt(price) > 0 && rideShareOffer.isPaymentDone == false">
        <div class="flex space-x-2 justify-center">
          <button
            v-on:click="capturePayment"
            v-if="isProcessingPayment == false"
            class="
              inline-block
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
          >
            Pay
          </button>
          <button
            v-else
            class="
              inline-block
              px-6
              py-2.5
              bg-blue-400
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-500 hover:shadow-lg
              focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-600 active:shadow-lg
              transition
              duration-150
              ease-in-out
            "
          >
            Processing Payment Dont Close the window
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
 

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
import Debouncing from "@/utility/Debouncing.js";
import { computed, ref, onMounted } from "vue";
import Store from "@/store/index";

import {
  pathDistance,
  AcceptPayment,
  getRideShareOfferById,
} from "@/composables/RideFunctions.js";
import { successAlert, errorAlert } from "@/composables/Notifications.js";
import Swal from "sweetalert2";

export default {
  components: {
    VueBootstrapTypeahead,
  },
  props: ["rideShareOfferId", "rideCreaterId", "price","reloadComponentsFun"],
  setup(props) {
    const user = Store.state.user;
    const paymentId = ref(null);
    const rideShareOffer = ref(null);
    const idRequestCreator = ref(false);

    const isOffercreatorView = ref(true);

    const isProcessingPayment = ref(false);

    const GetPaymentId = (val) => {
      paymentId.value = val;
      postPayment();
    };

    const postPayment = async () => {
      isProcessingPayment.value = true;
      let response = await AcceptPayment({
        paymentId: paymentId.value,
        rideShareOfferId: rideShareOffer.value.id,
        price: parseInt(props.price),
      });
      isProcessingPayment.value = false;
      if (!response.haveError) {
        Swal.fire("Payment Done", "", "success");
        loadData();
        props.reloadComponentsFun();
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Something went wrong!",
        });
      }
    };

    const loadData = async () => {
      var response = await getRideShareOfferById(props.rideShareOfferId);
      rideShareOffer.value = response.responseObject;
    };

    let options = null;

    onMounted(async () => {
      // alert(response.razorpay_payment_id);
      await loadData();

      if (rideShareOffer.value.userId != user.id) {
        isOffercreatorView.value = false;
      } else {
        isOffercreatorView.value = true;
      }
      if (isOffercreatorView)
        options = {
          key: "rzp_test_6pWr7K9xz2LCTh",
          amount: parseInt(props.price) * 100, // 2000 paise = INR 20
          name: "Bla Bla Car",
          description: "payment for Ride Share id " + rideShareOffer.value.id,
          image: "https://razorpay.com/favicon.png",
          handler: function (response) {
            GetPaymentId(response.razorpay_payment_id);
          },
          prefill: {
            name: user.firstName + user.lastName,
            //   email: user.email,
            email: user.email,
          },

          notes: {
            address: "",
          },
          theme: {
            color: "#F37254",
          },
        };
    //  var rzp1 = new Razorpay(options);

      //   document.getElementById("rzp-button1").onclick = function (e) {
      //     rzp1.open();
      //     e.preventDefault();
      //   };
    });

    const capturePayment = () => {
      var rzp1 = new Razorpay(options);
      rzp1.open();
    };

    return {
      GetPaymentId,
      rideShareOffer,
      isProcessingPayment,
      capturePayment,
      isOffercreatorView,
    };
  },
};
</script>

<style>
</style>
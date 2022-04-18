<template>
  testPackage
  <button id="rzp-button1" class="p-4 bg-blue-500 text-white">Pay</button>
</template>
 

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
import Debouncing from "@/utility/Debouncing.js";
import { computed, ref, onMounted } from "vue";
import { pathDistance, AcceptPayment } from "@/composables/RideFunctions.js";
import { successAlert, errorAlert } from "@/composables/Notifications.js";

export default {
  components: {
    VueBootstrapTypeahead,
  },
  props: [],
  setup(props) {
    const paymentId = ref(null);
    
    const GetPaymentId = (val) => {
      paymentId.value = val;
      postPayment();
    };

    const postPayment = async () => {
      let response = await AcceptPayment({ paymentId: paymentId.value });

      if (!response.haveError) {
        successAlert("Payment Done ");
      } else {
        errorAlert("Payment Failed");
      }
    };

    onMounted(() => {
      // alert(response.razorpay_payment_id);

      var options = {
        key: "rzp_test_6pWr7K9xz2LCTh",
        amount: "2000", // 2000 paise = INR 20
        name: "Merchant Name",
        description: "Purchase Description",
        image: "https://razorpay.com/favicon.png",
        handler: function (response) {
          GetPaymentId(response.razorpay_payment_id);
        },
        prefill: {
          name: "",
          email: "",
        },

        notes: {
          address: "",
        },
        theme: {
          color: "#F37254",
        },
      };
      var rzp1 = new Razorpay(options);

      document.getElementById("rzp-button1").onclick = function (e) {
        rzp1.open();
        e.preventDefault();
      };
    });

    return { GetPaymentId };
  },
};
</script>

<style>
</style>
<template>
{{user}}
{{rideShareOfferResponse}}
</template>

<script>
import { onMounted, ref } from "vue";
import Identity from "@/composables/Identity";
import {getRideShareOfferById} from "@/composables/RideFunctions"

export default {
  props: ["RideShareOfferId"],
  setup(props) {
    const user = ref(null);
    const numberOfPassengers= ref(null);
    const rideShareOffer= ref(null);

    let { UserPublicProfile } = Identity();
    const loadData = async () => {
      
      let rideShareOfferResponse= await getRideShareOfferById(props.RideShareOfferId);
      rideShareOffer.value=   rideShareOfferResponse.responseObject;
    //   let response = await UserPublicProfile(rideShareOffer.value.userId);
    //   if (response != null) {
    //     user.value = response;
    //   }
    };

    onMounted(async () => {
      loadData();
    });
    return {
      user,
      rideShareOffer
    };
  },
};
</script>

<style>
</style>
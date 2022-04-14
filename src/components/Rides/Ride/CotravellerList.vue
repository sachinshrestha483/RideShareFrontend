<template>
  <div class=" mt-4  ">
    <div class="secondaryText text-center">Co-Passengers</div>
    <div v-for="item in rideShareOfferIds" :key="item">
      <CoTraveller :RideShareOfferId="item" class="w-full" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Identity from "@/composables/Identity";
import {
  getRideShareOffer,
  getAllApprovedRideShareOfferIds,
} from "@/composables/RideFunctions";
import CoTraveller from "@/components/Rides/Ride/CoTravellers";
export default {
  components: {
    CoTraveller,
  },
  props: ["RideId"],
  setup(porps) {
    const rideShareOfferIds = ref([]);

    const loadData = async () => {
      var res = await getAllApprovedRideShareOfferIds(porps.RideId);
      rideShareOfferIds.value = res.responseObject;
    };

    onMounted(async () => {
      await loadData();
    });

    return { rideShareOfferIds };
  },
};
</script>

<style>
</style>
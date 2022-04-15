<template>
  <div class=" mt-4  "  :key="rideShareOfferIds.length" >
    <div class="secondaryText text-center">Co-Passengers</div>
    <div v-for="item in rideShareOfferIds" :key="item">
      <CoTraveller :RideShareOfferId="item" class="w-full"
      
        :reRender="reRender"  />
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
  props: ["RideId","reloadRideShareOfferForRide"],
  setup(props) {
    const rideShareOfferIds = ref([]);

    const loadData = async () => {
      var res = await getAllApprovedRideShareOfferIds(props.RideId);
      rideShareOfferIds.value = res.responseObject;
    };

    onMounted(async () => {
      await loadData();
    });

    const reRender=async ()=>{
    await   loadData();
    props.reloadRideShareOfferForRide();
    }

    return { rideShareOfferIds ,reRender};
  },
};
</script>

<style>
</style>
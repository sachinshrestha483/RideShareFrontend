<template>
  <div class="mx-4">
    <div class="primaryHeading mb-8 text-center">Ride Route</div>
    <RideMapComponent          
      :zoomedLat="zoomedLat"
      :zoomedLon="zoomedLon"
      :ride="ride"
 > 
    </RideMapComponent>

  
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import RideMapComponent from "@/components/Map/RideMapComponent";
export default {
  components: {RideMapComponent},
  setup(props) {
    const ride = ref(null);
    const zoomedLat= ref(null);
    const zoomedLon=ref(null);
    const router = useRoute();
    let rideId = router.params.id;
    console.log("Ride ID"+ rideId);

    console.log('latitude:'+router.params.lat );
    console.log('longitude:'+router.params.lon );
    zoomedLat.value=router.params.lat;
    zoomedLon.value= router.params.lon;
    return {ride,zoomedLat,zoomedLon};
  },
};
</script>

<style>
</style>
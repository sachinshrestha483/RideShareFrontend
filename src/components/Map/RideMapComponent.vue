<template>
{{props}}
Props Are Here - {{ props}}
  <div id="mapid" ref="map"></div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: ["zoomedLon", "zoomedLat", "ride"],

  setup(props) {
    const map = ref(null);

    var mymap;

    console.log(props);

    onMounted(() => {
      console.log(map);
      console.log("Making The map");
      mymap = L.map(map.value).setView([23.3315, 75.0367], 5);
      const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileLayer = L.tileLayer(tileUrl, { attribution });
      tileLayer.addTo(mymap);

      console.log(props);
    });

    //props.getRouteFun();

    return {
      map,
    };
  },
};
</script>

<style>
#mapid {
  height: 100vh;
  width: 100%;
}
</style>
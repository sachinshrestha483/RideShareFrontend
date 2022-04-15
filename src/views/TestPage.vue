<template>



  <input v-model="pathArray" class="bg-blue-500" />

  <button v-on:click="submit" class="bg-blue-500 p-4">Submmit Page</button>

  <!-- <input type="text" 
   @input="processChange"
  class="bg-blue-500"  /> -->
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import OpenStreetMapFunctions from "@/composables/OpenStreetMapFunctions";
import UtilityFunctions from "@/utility/UtilityFunctions.js";
import Debouncing from "@/utility/Debouncing.js";
import { computed, ref } from "vue";
import { pathDistance } from "@/composables/RideFunctions.js";

export default {
  components: {
    VueBootstrapTypeahead,
  },
  props: [],
  setup(props) {
    const pathArray = ref("");
    const submit = async () => {
      let result = await pathDistance({ "Path": pathArray.value})
      console.log(result);
    };

    return {
      submit,
      pathArray,
    };
  },
};
</script>

<style>
</style>
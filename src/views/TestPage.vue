<template>
    <span class="text-sm text-red-500">{{formErrors.titleError}}</span>

  <div class="flex flex-col p-4">
    <input
      type="text"
      class="inputBox w-4/12 mb-0"
      style="text-align: center"
      v-model="name"
    />
    <span class="text-sm text-red-500 mr-2">{{formErrors.name}}</span>
  </div>

  <button  v-on:click="submit" >Submmit Page</button>

<button  v-on:click="clearFormErors" >Clear Form Errors</button>


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

export default {
  components: {
    VueBootstrapTypeahead,
  },
  props: [],
  setup(props) {
    const name = ref(null);
    const formErrors= ref({
        titleError:null,
        name:null
    });

    const clearFormErors=()=>{
        const keys = Object.keys(formErrors.value);
        keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key]=null;
    });

    }

    const submit =()=>{
        formErrors.value.titleError="dssdsd"
        formErrors.value.name="name cant be null"
    }

    return {
      name,
      formErrors,
      submit,
      clearFormErors
    };
  },
};
</script>

<style>
</style>
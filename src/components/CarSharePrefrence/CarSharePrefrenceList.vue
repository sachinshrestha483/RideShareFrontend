<template>
  <div v-if="carSharePrefrences">
    <div
      v-for="carSharePrefrence in carSharePrefrences"
      :key="carSharePrefrence"
    >
      <!-- {{carSharePrefrence}} -->
      <IndividualCarSharePrefrence  :carSharePrefrenceObject="carSharePrefrence"  />
    </div>
  </div>

  <!-- {{carSharePrefrences}} -->
</template>

<script>
import IndividualCarSharePrefrence from "@/components/CarSharePrefrence/IndividualCarSharePrefrence";
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
import { ref } from "vue";
export default {
  components: {
    IndividualCarSharePrefrence,
  },

  setup() {
    const { getCarSharePrefrence } = CarSharePrefrenceFunctions();
    const carSharePrefrences = ref(null);
    const loadData = async () => {
      carSharePrefrences.value = await getCarSharePrefrence();
    };

    loadData();

    return { carSharePrefrences };
  },
};
</script>

<style>
</style>
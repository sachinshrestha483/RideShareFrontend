<template>
  <div>
    <div
      v-for="carSharePrefrence in subCarSharePrefrencesList"
      :key="carSharePrefrence"
    >
      <!-- {{carSharePrefrence}} -->
      <IndividualSubCarSharePrefrence
        :subCarSharePrefrenceObject="carSharePrefrence"
        :carSharePrefrencesList="carSharePrefrencesList"
      />
    </div>
  </div>

  <!-- {{carSharePrefrences}} -->
</template>

<script>
import IndividualSubCarSharePrefrence from "@/components/SubCarSharePrefrence/IndividualSubCarSharePrefrence";
import { ref } from "vue";
export default {
  components: {
    IndividualSubCarSharePrefrence,
  },
  props: ["subCarSharePrefrencesList","carSharePrefrencesList"],
  setup(props) {
    //  const { getCarSharePrefrence } = CarSharePrefrenceFunctions();
    //const carSharePrefrences = ref(null);
    //const loadData = async () => {
    //carSharePrefrences.value = await getCarSharePrefrence();
    //};

    //loadData();

    return {};
  },
};
</script>

<style>
</style>
<template>
  <div class="pageMargin1">
    <p class="primaryHeading text-center">CarShare Prefrence Settings</p>

    <div
      class="md:flex md:flex-row md:justify-between flex flex-col md:mt-10 mt-8"
    >
      <div class="flex flex-col">
        <div>
          <input class="inputBox" placeholder="Add Travel Prefrence" />
        </div>

        <div class="text-center">
          <button class="primaryButton">Add Prefrence</button>
        </div>
      </div>
      <div>
        <!-- list -->
        <CarSharePrefrenceList />
      </div>
    </div>
  </div>
</template>

<script>
import CarSharePrefrenceList from "@/components/CarSharePrefrence/CarSharePrefrenceList";

export default {
  components: {
    CarSharePrefrenceList,
  },
};
</script>

<style>
</style>
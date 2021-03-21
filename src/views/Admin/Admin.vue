<template>
  <div class="pageMargin2">
    <p class="text-center primaryHeading">Admin Section</p>

    <div class="flex flex-col mt-8">
      <router-link 
      
      :to="{name:'CarSharePrefrenceSettings'}"
      class="shadow-md p-8 w-full  hover:bg-gray-200  secondaryText">
        Ride Prefrence Settings
      </router-link>


        <router-link 
      
      :to="{name:'SubCarSharePrefrenceSettings'}"
      class="shadow-md p-8 w-full  hover:bg-gray-200  secondaryText">
       Sub Ride Prefrence Settings
      </router-link>


      <router-link 
      
      :to="{name:'VehicleTypeSettings'}"
      class="shadow-md p-8 w-full  hover:bg-gray-200  secondaryText">
       Vehicle Type Settings
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
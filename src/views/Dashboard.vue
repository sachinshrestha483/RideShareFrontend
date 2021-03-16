<template>
  <div class="pageMargin1">
    <p class="text-3xl text-gray-600 mb-2  md:text-left  text-center  font-bold">Dashboard</p>
    <div class="border-b-2 border-gray-200"></div>
    <div class="bg-gray-200 md:h-28 p-4">
      <div class="flex flex-row items-center justify-center md:justify-start">
        <button class="rounded-full focus:outline-none">
          <div
            class="md:mr-4 mr-2 rounded-full flex p-4 md:h-30 md:w-30 bg-indigo-500 hover:bg-indigo-600 items-center justify-center text-white font-bold"
          >
            Add Your Photo
          </div>
        </button>

        <div class="flex flex-col">
          <p class="text-2xl">Hello Sachin</p>
          <p class="text-sm text-blue-500">-> Edit Your Profile</p>
          <p class="text-sm text-blue-500">-> View Your Profile</p>
        </div>

        <div></div>
      </div>
    </div>

    <div class="border border-gray-500 p-4 mt-2">
      <div class="flex flex-col"></div>

      <div class="flex flex-col md:flex-row justify-between mb-4">
        <router-link
          class="hover:bg-gray-300 hover:shadow-2xl p-8 bg-white shadow-md"
          :to="{ name: 'Home' }"
        >
          <div class="flex flex-col">
            <div class="text-2xl">Car&nbsp;Share&nbsp;Preference</div>
          </div>
        </router-link>

        <router-link
          class="hover:bg-gray-300 hover:shadow-2xl p-8 bg-white shadow-md"
          :to="{ name: 'MemberVerification' }"
        >
          <div class="flex flex-col">
            <div class="text-2xl">Member&nbsp;Verification</div>
          </div>
        </router-link>

        <router-link
          class="hover:bg-gray-300 hover:shadow-2xl p-8 bg-white shadow-md"
          :to="{ name: 'Home' }"
        >
          <div class="flex flex-col">
            <div class="text-2xl">Add/Edit&nbsp;Your&nbsp;Car</div>
          </div>
        </router-link>
      </div>

      <div class="flex justify-center border border-gray-500 border-t-1">
        <div class="flex flex-col text-center">
          <div class="text-2xl font-bold text-gray-500">Member activity</div>
          <div class="text-lg text-gray-500">Member since: Mar 2021</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
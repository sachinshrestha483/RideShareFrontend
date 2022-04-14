<template>
  <div class="flex flex-row justify-center w-full">
    <div class="flex flex-col md:w-6/12 w-10/12">
      <div
        class="
          shadow-md
          p-8
          hover:bg-gray-200
          text-md text-gray-600
          mb-2
          md:text-left
          text-center
          font-bold
          rounded-lg
          shadow-xl
        "
      >
        <div class="text-2xl mb-4 ml-1">
          <div class="flex justify-between">{{title}}</div>
        </div>
        <div class="text-lg">
          <!-- sdsd -->
          <!-- {{ user }} -->
          {{bodyText}}

          <div class="flex flex-row gap-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  props: ["bodyText","title"],
  setup(props) {},
};
</script>

<style>
</style>
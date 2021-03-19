<template>
  <div class="shadow-md p-8 overflow-x-auto hover:bg-gray-200 secondaryText">
    <div class="flex flex-row items-center justify-between">
      <div>{{ carSharePrefrenceObject.name }}</div>

      <div class="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          v-on:click="editCarSharePrefrence = !editCarSharePrefrence"
          fill="currentColor"
          class="bi bi-pencil"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
          />
        </svg>
      </div>
    </div>
  </div>

  <div v-if="editCarSharePrefrence" class="p-4 shadow-md">
    <div class="flex flex-col">
      <form @submit.prevent="updateCarSharePrefrence">
        <input class="inputBox" v-model="carSharePrefrenceObject.name" />
<div class="flex flex-row items-center">
<input type="checkbox"   class="mb-2" v-model="carSharePrefrenceObject.show" >
<label class="ml-2  py-0 secondaryText text-lg">Show/Hide</label>
</div>


<div class="flex flex-row">
        <button type="submit" class="primaryButton text-center">Update</button>

</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CarSharePrefrenceFunctions from "@/composables/CarSharePrefrenceFunctions";
export default {
  props: ["carSharePrefrenceObject"],

  setup(props) {
    const {
      UpdateCarSharePrefrence,
      getTravelPrefrenceById,
      
    } = CarSharePrefrenceFunctions();
    const carSharePrefrence = props.carSharePrefrenceObject;
    console.log("-----------Car Share Prefrence----------");
    console.log(carSharePrefrence);
    const editCarSharePrefrence = ref(false);

    const updateCarSharePrefrence = async () => {
      let res = await UpdateCarSharePrefrence(
        props.carSharePrefrenceObject.id,
        props.carSharePrefrenceObject.name,
        true
      );
      let updatedObj = await getTravelPrefrenceById(
        props.carSharePrefrenceObject.id
      );
      if (updatedObj != null) {
        props.carSharePrefrenceObject = updatedObj;
      }

      console.log("Update it");
    };

    return { editCarSharePrefrence, updateCarSharePrefrence };
  },
};
</script>

<style>
</style>
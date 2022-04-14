<template>
  <div class="flex flex-row justify-center w-full">
    <div class="flex flex-col md:w-6/12 w-10/12" v-if="user != null">
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

          <div class="flex flex-row gap-4 justify-around items-center">
            <div>
              <img
                class="object-fill h-32 w-32 rounded-full ..."
                :src="user.profilePhotoUrl"
              />
            </div>
            <div class="flex flex-col">
              <div>Name : {{ user.firstName }} {{ user.lastName }}</div>
              <div class="flex flex-row items-center gap-2">
                <div>Email : {{ user.email }}</div>
                <svg
                  v-if="!user.isEmailVerified"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x-circle-fill text-red-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                  />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-patch-check-fill text-green-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"
                  />
                </svg>
              </div>
              <div class="flex flex-row items-center gap-2">
                <div>Phone : {{ user.phoneNumber }}</div>
                <svg
                  v-if="!user.isPhoneNumberVerified"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x-circle-fill text-red-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                  />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-patch-check-fill text-green-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"
                  />
                </svg>
              </div>
              <div class="gap-8"></div>
              <div class="flex flex-col text-center">
                  <div class=" border-b-2 border-gray-500 p-1 "  v-for="travelPrefrence in user.userTravelPrefrences" :key="travelPrefrence"  >{{travelPrefrence}}</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Identity from "@/composables/Identity";
export default {
  props: ["userId","title"],
  setup(props) {
    const user = ref(null);

    let { UserPublicProfile } = Identity();

    const loadData = async () => {
      let response = await UserPublicProfile(props.userId);
      if (response != null) {
        user.value = response;
      }
    };

    onMounted(async () => {
      loadData();
    });

    return {
      user,
    };
  },
};
</script>

<style>
</style>
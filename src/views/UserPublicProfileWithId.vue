<template>
  <div
    v-if="loading == false && user == null"
    class="text-center primaryHeading mt-4"
  >
    User Dont Exist
  </div>

  <div v-else>
    <div v-if="user != null" class="pageMargin2">
      <!-- {{ user }} -->
      <div>
        <div class="flex flex-row justify-center">
          <div>
            <img
              v-if="user.profilePhotoUrl != null"
              :src="user.profilePhotoUrl"
              class="rounded-full w-28 h-28"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="86"
              height="86"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </div>
        </div>

        <div class="flex flex-row primaryHeading mt-2 justify-center">
          Sachin
        </div>
        <div
          class="flex text-gray-400 font-semibold flex-row secondaryText mt-4 justify-center"
        >
          19 y/o
        </div>

        <div class="mt-8 border-gray-300 border-b-2 p-4">
          <div
            v-for="item in user.userTravelPrefrences"
            :key="item"
            class="mt-2 text-gray-400 font-semibold"
          >
            {{ item }}
          </div>
        </div>

        <div class="mt-2 text-gray-400 font-semibold p-4">
          <div class="flex flex-row">
            <div>
              <svg
                v-if="user.isPhoneNumberVerified == true"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-check text-green-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-x text-red-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>

            <div>
              {{
                user.isPhoneNumberVerified == true
                  ? "Phone Verified"
                  : "Phone Not Verified"
              }}
            </div>
          </div>
        </div>

        <div
          class="text-gray-400 font-semibold flex flex-row border-gray-300 border-b-2 p-4"
        >
          <div>
            <svg
              v-if="user.isEmailVerified == true"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-check text-green-500"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-x text-red-500"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>

          {{
            user.isEmailVerified == true
              ? "Email Verified"
              : "Email Not Verified"
          }}
        </div>

        <div class="mt-2 text-gray-400 font-semibold p-4">
          2 Rides Published
        </div>

        <div class="mt-2 text-gray-400 font-semibold px-4">
          Member since March 2021
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import Identity from "@/composables/Identity";
import { ref } from "vue";
export default {
  setup() {
    const { UserPublicProfile } = Identity();
    const router = useRoute();
    const user = ref(null);
    const loading = ref(false);

    const load = async () => {
      loading.value = true;
      user.value = await UserPublicProfile(router.params.id);
      loading.value = false;

      console.log("----User---");
      console.log(user.value);
    };
    load();

    console.log(router.params.id);

    return { router, user, loading };
  },
};
</script>

<style>
</style>
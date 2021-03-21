<template>
  <div class="pageMargin1">
    <p class="text-3xl text-gray-600 mb-2 md:text-left text-center font-bold">
      Dashboard
    </p>
    <div class="border-b-2 border-gray-200"></div>
    <div class="bg-gray-200 md:h-28 p-4">
      <div class="flex flex-row items-center justify-center md:justify-start">
        <router-link 
        
        :to="{name:'ProfilePicture'}"
        class="rounded-full focus:outline-none">
          <div
            class="md:mr-4 mr-2 rounded-full flex p-4 md:h-30 md:w-30 bg-indigo-500 hover:bg-indigo-600 items-center justify-center text-white font-bold"
          >
           {{$store.state.user.profilePhotoUrl!=null?'Update Your Photo':'Add Your Photo'}} 
          </div>
        </router-link>

        <div class="flex flex-col">
          <p class="text-2xl">Hello Sachin</p>
          <div class="text-sm items-center text-blue-500 flex flex-row">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </div>

            <div>Edit Your Profile</div>
          </div>
          <router-link
            :to="{ name: 'PublicProfile' }"
            class="text-sm items-center flex flex-row text-blue-500"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </div>
            <div>View Your Profile</div>
          </router-link>
        </div>

        <div></div>
      </div>
    </div>

    <div class="border border-gray-500 p-4 mt-2">
      <div class="flex flex-col"></div>

      <div class="flex flex-col xl:flex-row md:flex-col justify-between mb-4">
        <router-link
          class="hover:bg-gray-300 hover:shadow-2xl p-8 bg-white shadow-md"
          :to="{ name: 'CarSharePrefrence' }"
        >
          <div class="flex flex-col">
            <div class="text-2xl">Car&nbsp;Share&nbsp;Preference</div>

            <div class="flex flex-row mt-4 items-center text-blue-600">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
              <div class="font-semibold ml-1">Edit Car Share Prefrence</div>
            </div>
          </div>
        </router-link>

        <router-link
          class="hover:bg-gray-300 hover:shadow-2xl p-8 bg-white shadow-md"
          :to="{ name: 'MemberVerification' }"
        >
          <div class="flex flex-col">
            <div class="text-2xl">Member&nbsp;Verification</div>


            <div
              :class="
                 + $store.state.user.isEmailVerified==true
                  ? 'text-green-600 mt-4 items-center flex flex-row'
                  : 'text-red-600 mt-4 items-center flex flex-row'
              "
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-exclamation-circle"
                  v-if="$store.state.user.isEmailVerified==false"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  v-else
                  class="bi bi-check-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
                  />
                </svg>
              </div>
              <div class="font-semibold ml-1">{{$store.state.user.isEmailVerified==true?'Email Verified':'Verify Your Email'}}</div>
            </div>

            <div
              :class="
                 + $store.state.user.isPhoneNumberVerified==true?'text-green-600 items-center flex flex-row':'text-red-600 items-center flex flex-row'
              "
            >
              <div>
               
                      <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-exclamation-circle"
                  v-if="$store.state.user.isPhoneNumberVerified==false"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  v-else
                  class="bi bi-check-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
                  />
                </svg>
              </div>
              <div class="font-semibold ml-1">{{$store.state.user.isPhoneNumberVerified==true?'Phone Verified':'Verify Your Number'}}</div>
            </div>
          </div>
        </router-link>

        <router-link
          class="hover:bg-gray-300 hover:shadow-2xl p-8 bg-white shadow-md"
          :to="{ name: 'UserVehicle' }"
        >
          <div class="flex flex-col">
            <div class="text-2xl">Add/Edit&nbsp;Your&nbsp;Car</div>
          </div>

          <div class="flex flex-row mt-4 items-center text-blue-600">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </div>
            <div class="font-semibold ml-1">Edit Your Car</div>
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
import Identity from "@/composables/Identity";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
   
   
   
   
  },
};
</script>

<style>
</style>
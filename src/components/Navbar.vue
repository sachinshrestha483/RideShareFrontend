<template>
  <div>
    <div
      class="bg-white w-auto m-1 h-16 flex flex-row md:grid-cols-4 justify-between p-4"
    >
      <div>
        <router-link :to="{ name: 'Home' }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1499.7 294.6"
            width="162"
            height="32"
          >
            <path
              fill="#054752"
              d="M289 150.2c-7.4-44.6-49.6-74.6-94-67l13-74.7L160.3 0c-4 9-22 50-30.7 96 17.7 12 30.7 31 34.6 54 4 24.3-3 48-17.6 65.6 3.6 4.4 7.7 8.4 12.3 12 18.5 14.6 41 20.3 63 16.6 44.7-7.4 74.7-49.6 67-94z"
            ></path>
            <path
              fill="#2dbeff"
              d="M128.8 101.2l1-5c-17-11.6-38-16.8-59.8-13.2L83 8.4 35.4 0C31.2 9.3 12 53 3.8 101c-6.6 38.8-6.3 80.4 14 109.7 4.5 6.3 9.8 12 16.2 17 18.6 14.6 41.2 20.3 63.2 16.6 20.2-3.3 37.3-14 49.4-28.5l-3.8-5c-20.4-29.2-20.7-70.8-14-109.5z"
            ></path>
            <path
              fill="#9ef769"
              d="M164.3 150.2c-4-23-17-42-34.6-54l-1 5c-6.5 38.8-6.2 80.4 14.2 109.7l3.7 5c14.6-18 21.8-41.6 17.6-66z"
            ></path>
            <path
              fill="#054752"
              d="M1249 228h-28.4c-1 0-1.7.5-2 1.3-4 10.6-9.6 19.4-17.6 25.6-8 6-18.3 9.6-31.7 9.6-18.3 0-33-8-43-21.4-10-13.5-15.6-32.2-15.6-53.6 0-21.6 5.5-40.3 15.6-53.6 10-13.3 24.8-21.3 43-21.3 13.3 0 23.5 3.5 31.5 9.6 8 6.2 13.5 15 17.6 25.3.3.8 1 1.4 2 1.4h28.5c.4 0 1-.2 1.3-.6.4-.3.6-.8.6-1.4v-.5c-4.5-19.2-13.8-35-27.6-46S1191.4 85 1169 85c-26 0-49 10.7-65.5 29-16.5 18.4-26.5 44.5-26.5 75.8 0 31.3 10 57.5 26.5 75.8 16.5 18.5 39.5 29 65.6 29 22.4 0 40.6-6.2 54.5-17.3 13.8-11 23.2-27 27.5-46.5v-.5c0-.6-.2-1-.6-1.5-.2-.3-.8-.5-1.4-.5zm249.3-84.2c-2-.4-4.8-.8-8.7-.8-3.4 0-7.6.3-12.4 1.2-4 .8-8.3 2.4-12.3 4.6-4 2.2-8 5.2-11.6 8.8-2 2-4 4.5-5.8 7.3l-1.3 2v-19.4c0-1.2-1-2.2-2-2.2H1417c-1 0-2 1-2 2.2v142c0 1 1 2 2 2h27.4c1.2 0 2.2-1 2.2-2v-69c0-8 1-14.8 2.7-20.4 1.8-5.6 4.5-10 8-13.4 3.7-3.4 7.8-6 12.6-7.7 5.6-2 11.7-2.6 17-2.6 4 0 8 .4 10.3.8h.3c1.2 0 2-.8 2-2V146c.3-1-.4-2-1.5-2.2zM909 84.8h-.5L881 89.6c-1 .2-2 1-2 2v197.8c0 1.2 1 2.2 2.3 2.2H909c1 0 2-1 2-2.2V87c0-1.2-1-2.2-2.3-2.2zm-56.7 117.4c-4-8.2-9.6-15.2-16.5-21l-2-1.5c-3-2.3-6.3-4.4-9.8-6l-1-.5.7-.7c3.2-3.7 6-8 8-12.6 3-6.7 4.5-13.6 4.5-20.8 0-7.8-1.6-15-4.6-22-3-7-7.3-12.8-12.7-17.8-5-4.6-11-8.2-17.8-10.8-6.8-2.6-15.3-4-25.3-4h-60.6c-1.2 0-2.2 1-2.2 2.3v202.5c0 1.2 1 2.2 2.2 2.2H790c10.7 0 19.6-1.2 26.8-3.6 7-2.4 13.5-6 19-10.5 6.8-5.7 12.4-12.8 16.5-21 1-2 1.7-3.7 2.4-5.5l.3-.8.5-1.4c2-6.2 3.2-12.7 3.2-19.5-.2-9.8-2.3-19-6.5-27.2zm-107-87h25.4c8 0 14 .7 18 2 3.8 1.5 6.8 3.5 9 6 4.3 4.8 6.5 10.4 6.5 17 0 6.4-2 12-6.5 16.8-2.2 2.5-5 4.5-9 6-2.8 1-7 1.6-12 2H745v-49.8zm78 125.6c-1.6 4-3.8 7.4-6.6 10.4-3.2 3-7 5.6-11.7 7.4-4.7 1.7-11.6 2.7-20.8 2.7h-39v-65.7h39c9.2 0 16 1 20.7 2.7 4.5 1.8 8.4 4.3 11.5 7.4 2.8 3 5 6.4 6.7 10.2 1.7 3.7 2.5 8 2.5 12.3 0 4.5-.8 8.7-2.5 12.6zm218-83.6c-10.6-9.7-25.2-14.5-43.4-14.5-16.4 0-29.8 4-40 12-9 6.7-15.5 15.3-19 25.5-.4 1 .3 2.3 1.5 2.5l25.8 4.5c1 .2 1.7-.3 2-1 5.3-11.7 15.2-17.4 29.8-17.4 10 0 17.6 2.7 23 8.2 5.4 5.5 8 12.8 8 22v5.2c-13.5-4-26.4-6-38.4-6-17 0-31.2 4.2-42.5 12.8-11.2 8.6-17 20.7-17 36.2 0 14.8 5.3 26.4 15.6 34.8 10.3 8.4 22.7 12.6 37.3 12.6 18.6 0 34-5.4 45.2-16.6v11.2c0 1.4 1.2 2.5 2.5 2.5h23.8c1.3 0 2.4-1 2.4-2.4V197c-.3-17-5.7-30.2-16.5-39.8zm-24.2 100c-8 6.7-17.7 10-29.3 10-8.5 0-15-2-19.6-5.8-4.4-3.8-6.7-9-6.7-15.6 0-7.2 3-12.6 8.6-16.2 5.6-3.6 13-5.5 22-5.5 11.3 0 23.7 2 37 6 0 11.7-4 20.6-12 27zM538 84.8h-.4L510 89.6c-1 .2-2 1-2 2v197.8c0 1.2 1 2.2 2.3 2.2H538c1 0 2-1 2-2.2V87c0-1.2-1-2.2-2.2-2.2zM481 202.2c-4-8.2-9.4-15.2-16.3-21l-2-1.5c-3-2.3-6.3-4.4-9.8-6l-1-.5.7-.7c3.2-3.7 6-8 8-12.6 3-6.7 4.5-13.6 4.5-20.8 0-7.8-1.5-15-4.5-22s-7.3-12.8-12.7-17.8c-5-4.6-11-8.2-17.6-10.8-6.8-2.6-15.3-4-25.3-4h-60.5c-1.2 0-2.2 1-2.2 2.3v202.5c0 1.2 1 2.2 2.2 2.2H419c10.7 0 19.6-1.2 26.8-3.6 7-2.4 13.5-6 19-10.5 6.8-5.7 12.4-12.8 16.5-21 1-2 1.7-3.7 2.4-5.5l.3-.8c0-.4.2-1 .4-1.4 2-6.2 3.2-12.7 3.2-19.5-.2-9.8-2.3-19-6.5-27.2zm-107-87h25.6c8 0 14 .7 18 2 3.8 1.5 6.8 3.5 9 6 4.3 4.8 6.5 10.4 6.5 17 0 6.4-2 12-6.5 16.8-2.2 2.5-5 4.5-9 6-2.8 1-7 1.6-12 2H374zm78.3 125.6c-1.7 4-4 7.4-6.7 10.4-3.2 3-7 5.6-11.7 7.4-4.7 1.7-11.6 2.7-20.8 2.7h-39v-65.7h39c9.3 0 16.2 1 20.8 2.7 4.7 1.8 8.6 4.3 11.7 7.4 2.8 3 5 6.4 6.7 10.2 1.7 3.7 2.5 8 2.5 12.3 0 4.5-1 8.7-2.6 12.6zm218-83.6c-10.7-9.7-25.3-14.5-43.5-14.5-16.3 0-29.7 4-40 12-9 6.7-15.4 15.3-19 25.5-.3 1 .4 2.3 1.6 2.5l25.7 4.5c1 .2 2-.3 2.3-1 5.2-11.7 15-17.4 29.7-17.4 9.7 0 17.4 2.7 22.8 8.2 5.4 5.5 8.2 12.8 8.2 22v5.2c-13.7-4-26.6-6-38.6-6-17 0-31.2 4.2-42.5 12.8-11.5 8.6-17 20.7-17 36.2 0 14.8 5 26.4 15.3 34.8 10.3 8.4 22.7 12.6 37.3 12.6 18.7 0 34-5.4 45.3-16.6v11.2c0 1.4 1 2.5 2.3 2.5H684c1.4 0 2.5-1 2.5-2.4V197c-.3-17-5.6-30.2-16.4-39.8zm-24.4 100c-8 6.7-18 10-29.5 10-8.5 0-15-2-19.6-5.8-4.6-3.8-7-9-7-15.6 0-7.2 3-12.6 8.7-16.2 5.7-3.6 13-5.5 22-5.5 11.4 0 23.8 2 37 6 .2 11.7-3.8 20.6-11.8 27zm730.6-100c-10.7-9.7-25.3-14.5-43.5-14.5-16.2 0-29.6 4-40 12-9 6.7-15.3 15.3-19 25.5-.2 1 .5 2.3 1.7 2.5l25.8 4.5c1 .2 1.7-.3 2-1 5.3-11.7 15.2-17.4 29.8-17.4 9.8 0 17.5 2.7 23 8.2 5.3 5.5 8 12.8 8 22v5.2c-13.6-4-26.5-6-38.5-6-17 0-31.2 4.2-42.5 12.8-11.3 8.6-17 20.7-17 36.2 0 14.8 5.2 26.4 15.5 34.8 10.3 8.4 22.7 12.6 37.3 12.6 18.8 0 34-5.4 45.4-16.6v11.2c0 1.4 1 2.5 2.4 2.5h23.8c1.3 0 2.4-1 2.4-2.4V197c-.4-17-5.8-30.2-16.5-39.8zm-24.5 100c-8 6.7-17.6 10-29.2 10-8.5 0-15-2-19.6-5.8-4.4-3.8-6.7-9-6.7-15.6 0-7.2 3-12.6 8.6-16.2 5.7-3.6 13-5.5 22-5.5 11.4 0 24 2 37 6 0 11.7-4 20.6-12 27z"
            ></path>
          </svg>
        </router-link>
      </div>

      <div class="text-lg text-blue-400 flex flex-row items-center">
        <div
          class="m-1 flex flex-row items-center hidden cursor-pointer md:inline-flex"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-search w-6 h-6 m-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </div>
          <div class="text-sm font-extrabold">Find&nbsp;A&nbsp;Ride</div>
        </div>

        <div
          class="m-1 flex-row items-center cursor-pointer hidden md:inline-flex"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-plus-circle w-6 h-6 m-2"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </div>

          <div class="text-sm font-extrabold">Offer&nbsp;A&nbsp;Ride</div>
        </div>

        <div
          v-if="$store.state.user != null"
          v-on:click="showSmallMenu = !showSmallMenu"
          class="ml-4 mr-1 text-sm text-gray-700 font-extrabold cursor-pointer"
        >
          {{ $store.state.user.firstName }}
        </div>

        <div class="ml-1" v-on:click="showSmallMenu = !showSmallMenu">
          <div v-if="$store.state.user != null">
            <img
              v-if="$store.state.user.profilePhotoUrl != null"
              class="w-10 h-10 mr-3 rounded-full"
              :src="$store.state.user.profilePhotoUrl"
            />

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-person-circle w-10 h-10 mr-3 text-gray-500 cursor-pointer"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </div>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-person-circle w-10 h-10 mr-3 text-gray-500 cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </div>

        <div v-on:click="showSmallMenu = !showSmallMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down cursor-pointer w-5 h-5 text-gray-700"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div
      class="flex justify-center md:justify-end bg-white"
      v-if="showSmallMenu"
    >
      <div class="bg-white shadow-xl absolute w-80">
        <div class="flex flex-col">
          <router-link
            :to="{ name: 'Dashboard' }"
            v-if="$store.state.user != null"
            class="hover:bg-gray-200"
          >
            <div class="flex flex-row px-4 py-2 justify-between items-center">
              <div class="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                <p class="text-md font-bold m-2 text-xl text-gray-500">
                  Dashboard
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2 text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </router-link>

           <router-link
            v-if="$store.state.user.role == 0"
            :to="{ name: 'Admin' }"
            class="hover:bg-gray-200"
          >
            <div class="flex flex-row justify-between mx-4 my-2 items-center">
              <div class="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-badge text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                  <path
                    d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"
                  />
                </svg>
                <p class="text-md font-bold m-2 text-xl text-gray-500">Admin</p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </router-link>


          <div class="hover:bg-gray-200" v-if="$store.state.user != null">
            <div class="flex flex-row justify-between mx-4 my-2 items-center">
              <div class="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-signpost text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z"
                  />
                </svg>
                <p class="text-md font-bold m-2 text-xl text-gray-500">
                  Your&nbsp;Rides
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2 text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="hover:bg-gray-200" v-if="$store.state.user != null">
            <div class="flex flex-row justify-between mx-4 my-2 items-center">
              <div class="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chat-left-text text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                  />
                  <path
                    d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <p class="text-md font-bold m-2 text-xl text-gray-500">
                  Messages
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="hover:bg-gray-200" v-if="$store.state.user != null">
            <div class="flex flex-row justify-between mx-4 my-2 items-center">
              <div class="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                <p class="text-md font-bold m-2 text-xl text-gray-500">
                  Profile
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            v-on:click="logoutUser()"
            class="hover:bg-gray-200"
            v-if="$store.state.user != null"
          >
            <div class="flex flex-row justify-between mx-4 my-2 items-center">
              <div class="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-circle text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <p class="text-md font-bold m-2 text-xl text-gray-500">
                  Log&nbsp;Out
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <router-link
            v-if="$store.state.user == null"
            :to="{ name: 'Login' }"
            class="hover:bg-gray-200"
          >
            <div class="flex flex-row justify-between mx-4 my-2 items-center">
              <div class="flex flex-row items-center">
                <p class="text-md font-bold m-2 text-xl text-gray-500">Login</p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </router-link>

         
          <router-link
            v-if="$store.state.user == null"
            :to="{ name: 'Register' }"
            class="hover:bg-gray-200"
          >
            <div class="flex flex-row justify-between mx-4 my-2 items-center">
              <div class="flex flex-row items-center">
                <p class="text-md font-bold m-2 text-xl text-gray-500">
                  Sign Up
                </p>
              </div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-right m-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="w-10"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Logout from "@/composables/Logout";
import { useRouter } from "vue-router";
export default {
  setup() {
    const showSmallMenu = ref(false);
    const { logout } = Logout;
    const router = useRouter();
    const logoutUser = () => {
      logout();
      router.push({ name: "Home" });
    };

    return { showSmallMenu, logoutUser };
  },
};
</script>

<style>
</style>
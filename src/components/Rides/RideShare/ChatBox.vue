<template>
  <div class="flex flex-row justify-center w-full">
    <div class="flex flex-col w-full h-fit">
      <div
        class="
          shadow-md
          p-8
          text-md text-gray-600
          mb-2
          md:text-left
          text-center
          font-bold
          rounded-lg
          shadow-xl
        "
      >
        <div class="flex flex-col gap-4">
          <div class="text-2xl mb-4 ml-1">Messages</div>

          <div
            class="h-80 bg-gray-200 overflow-auto"
            ref="chatsArea"
            id="chatsArea"
          >
            <div class="flex flex-col gap-3 p-2">
              <div v-for="item in list" :key="item">
                <div
                  :class="`${
                    $store.state.user.id == item.userId
                      ? 'flex flex-row-reverse '
                      : 'flex flex-row'
                  }`"
                >
                  <div
                    :class="`${
                      $store.state.user.id == item.userId
                        ? 'bg-blue-500 rounded-tr-none '
                        : 'bg-white rounded-tl-none'
                    } p-3 rounded-xl  text-left    text-md font-normal w-80 text-clip overflow-hidden flex flex-col 	`"
                  >
                    <div>
                      {{ item.message }}
                    </div>
                    <div class="text-right text-sm">
                      {{ item.datetimeString }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-row items-center gap-4">
            <div class="w-10/12">
              <input
                type="text"
                class="inputBox"
                placeholder="Message For Request Owner"
                v-model="message"
              />
            </div>
            <!-- <div class="  " v-on:click="sendMessage"> -->
            <div class="w-2/12">
              <svg
               v-on:click="sendMessage"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-send-fill text-blue-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
                />
              </svg>
            </div>

            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated, ref } from "vue";
import { projectFirestore } from "@/firebase/config";
import Store from "@/store/index";
import * as moment from "moment";

//import { collection, getDocs, addDoc,orderBy,QuerySnapshot } from "firebase/firestore/lite";
import {
  getDocs,
  collection,
  setDoc,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default {
  props: ["rideShareRequestId"],

  setup(props) {
    const list = ref(null);
    const message = ref(null);
    const user = ref(null);
    const chatsArea = ref(null);
    const chatId = `chats/${props.rideShareRequestId}/P2PChats`;

    const unsubscribe = onSnapshot(
      collection(projectFirestore, chatId),
      (snapshot) => {
        console.log("Snap Shot Here");
        getMessages(projectFirestore);
      },
      (error) => {
        // ...
        console.log("Error Here");
      }
    );

    async function getMessages(db) {
      const citiesCol = collection(db, chatId);
      const q = query(citiesCol, orderBy("date"));

      const citySnapshot = await getDocs(q);
      const cityList = citySnapshot.docs.map((doc) => doc.data());
      list.value = cityList.map((e) => ({
        ...e,
        datetimeString: moment(new Date(e.date.seconds * 1000)).fromNow(),
      }));
      //    chatsArea.value.scrollTop = chatsArea.value.scrollHeight;
      // var objDiv = document.getElementById("chatsArea");
      // objDiv.scrollTop = objDiv.scrollHeight+12;
    }

    onUpdated(() => {
      chatsArea.value.scrollTop = chatsArea.value.scrollHeight;
    });

    const sendMessage = async () => {
      var db = projectFirestore;
      if (message.value != null) {
        const citiesCol = collection(db, chatId);
        await addDoc(citiesCol, {
          message: message.value,
          userId: Store.state.user.id,
          date: new Date(),
        });
      }
      message.value = null;

      //   await setDoc(doc(db, "Chats", "LA"), {
      //     name: "Los Angeles",
      //     state: "CA",
      //     country: "USA",
      //   });
    };

    onMounted(async () => {
      await getMessages(projectFirestore);
      console.log(chatsArea);

      // user.value = Store.state.user;
      //console.log(user);
      //   sendMessage(projectFirestore);
    });

    onUnmounted(() => {
      unsubscribe();
    });

    return { list, message, sendMessage, user, chatsArea };
  },
};
</script>

<style>
</style>
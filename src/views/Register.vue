<template>
  <div class="pageMargin2">
    <p class="md:text-4xl text-center text-gray-700 text-3xl font-bold">
      Register
    </p>

    <p class="text-center text-red-500 mt-8 font-medium">{{ formError }}</p>

    <div class="md:mt-8">
      <form @submit.prevent="submitForm">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="inputBox"
        />
        <input
          type="text"
          v-model="firstName"
          required
          placeholder="First Name"
          class="inputBox"
        />

        <input
          type="text"
          v-model="lastName"
          required
          placeholder="Last Name"
          class="inputBox"
        />

        <input
          type="password"
          v-model="password"
          required
          placeholder="Password"
          class="inputBox"
        />

        <input
          type="password"
          v-model="conformPassword"
          required
          placeholder="Confirm Password"
          class="inputBox"
        />

        <div class="text-center">
          <button class="primaryButton" type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Register from "@/composables/Register";
export default {
  setup() {
    const { register } = Register;
    const email = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const password = ref("");
    const conformPassword = ref("");
    const formError = ref("");

    const submitForm = async () => {
      formError.value = "";

      if (password.value.trim() == "") {
        formError.value = "Password Cannot Be Empty";
        return;
      }

      if (password.value != conformPassword.value) {
        formError.value = "Password and Conform Password are Not Same";
        return;
      }
      const res = await register(email.value, password.value);

      console.log("res");
      console.log(res);

      if (res == true) {
        console.log("User added Sucessfully ");
      } else {
        console.log("User Not  added ");
      }
      console.log("submit form");
    };

    return {
      email,
      firstName,
      lastName,
      password,
      conformPassword,
      formError,
      submitForm,
    };
  },
};
</script>

<style>
</style>
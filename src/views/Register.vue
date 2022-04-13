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
          required
          v-model="email"
          placeholder="Email"
          class="inputBox mb-0"
        />
        <span class="text-sm text-red-500 mt-0 font-medium">{{
          formErrors.Email
        }}</span>
        <input
          type="text"
          v-model="firstName"
          required
          placeholder="First Name"
          class="inputBox mb-0 mt-8"
        />
        <span class="text-sm text-red-500 mt-0 font-medium">{{
          formErrors.FirstName
        }}</span>
        <input
          type="text"
          v-model="lastName"
          required
          placeholder="Last Name"
          class="inputBox mt-8 mb-0"
        />
        <span class="text-sm text-red-500 mt-0 font-medium">{{
          formErrors.LastName
        }}</span>

        <input
          type="tel"
          v-model="phone"
          required
          placeholder="Phone"
          class="inputBox mt-8 mb-0"
        />
        <span class="text-sm text-red-500 mt-0 font-medium">{{
          formErrors.Phone
        }}</span>

        <input
          type="password"
          v-model="password"
          required
          placeholder="Password"
          class="inputBox mt-8 mb-0"
        />

        <span class="text-sm text-red-500 mt-0 font-medium">{{
          formErrors.Password
        }}</span>

        <input
          type="password"
          v-model="conformPassword"
          required
          placeholder="Confirm Password"
          class="inputBox mt-8"
        />

        <span class="text-sm text-red-500 mt-0 font-medium">{{
          formErrors.ConformPassword
        }}</span>

        <div class="text-center mt-4">
          <button class="primaryButton" v-if="!regestering" type="submit">
            Register
          </button>
          <button class="primaryDisabledButton" v-else disabled type="submit">
            Registering
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Register from "@/composables/Register";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  setup() {
    const router = new useRouter();
    const { register } = Register;
    const email = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const password = ref("");
    const conformPassword = ref("");
    const phone = ref("");
    const formError = ref("");
    const regestering = ref(false);

    const formResponse = ref(null);

    const formErrors = ref({
      Email: null,
      FirstName: null,
      LastName: null,
      Phone: null,
      Password: null,
      ConformPassword: null,
    });

    phone.value = phone.value.trim();
    firstName.value = firstName.value.trim();
    lastName.value = lastName.value.trim();

    const clearFormErors = () => {
      const keys = Object.keys(formErrors.value);
      keys.forEach((key, index) => {
        console.log(`${key}: ${formErrors.value[key]}`);
        formErrors.value[key] = null;
      });
    };

    const submitForm = async () => {
      formError.value = "";

      clearFormErors();

      if (password.value.trim() == "") {
        formError.value = "Password Cannot Be Empty";
        return;
      }

      if (password.value != conformPassword.value) {
        formError.value = "Password and Conform Password are Not Same";
        return;
      }
      if (firstName.value.toString().trim() == "") {
        formErrors.value.FirstName = "First Name Cannot Be Empty";
        return;
      }
      if (firstName.value.toString().length > 15) {
        formErrors.value.FirstName = "First Name Cannot Be Empty";
        return;
      }
      if (firstName.value.toString().length < 3) {
        formErrors.value.FirstName = "First Name Length Cannot Be Less than 3";
        return;
      }

      if (lastName.value.toString().trim() == "") {
        formErrors.value.LastName = "Last Name Cannot Be Empty";
        return;
      }
      if (lastName.value.toString().length > 15) {
        formErrors.value.LastName = "Last Name Cannot Be Empty";
        return;
      }
      if (lastName.value.toString().length < 3) {
        formErrors.value.LastName = "Last Name Length Cannot Be Less than 3";
        return;
      }

      if (phone.value.toString().length != 10) {
        formErrors.value.Phone = "Phone Length Should Be 10";
        return;
      }

      if (password.value.toString().length < 9) {
        formErrors.value.Password = "Password Lenght Shouldd Be Greater Than 9";
        return;
      }

      if (password.value.toString() != conformPassword.value.toString()) {
        formErrors.value.Password = "Password Lenght Shouldd Be Greater Than 9";
        return;
      }

      regestering.value = true;
      const res = await register(
        firstName.value,
        lastName.value,
        email.value,
        phone.value,
        password.value
      );
      regestering.value = false;
      console.log("res");
      console.log(res);

      if (res.haveError == false) {
        console.log("User added Sucessfully ");
        Swal.fire("User Created Sucessfully", "success");
        router.push({ name: "Login" });
      } else {
        if (res.errorMessage != null) { 
          formError.value = res.errorMessage;
        } else {
          formError.value = "Error in Registering User";
        }
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
      regestering,
      phone,
      formResponse,
      formErrors,
    };
  },
};
</script>

<style>
</style>
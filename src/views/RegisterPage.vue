<template>
  <div
    class="bg-slate-200 md:bg-transparent h-screen md:block flex items-center mx-auto justify-center py-1 !md:px-0"
  >
    <div class="fixed top-0 left-0 w-full h-full md:block hidden -z-20">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#1f75fe"
          fill-opacity="1"
          d="M0,128L34.3,144C68.6,160,137,192,206,224C274.3,256,343,288,411,288C480,288,549,256,617,256C685.7,256,754,288,823,282.7C891.4,277,960,235,1029,234.7C1097.1,235,1166,277,1234,293.3C1302.9,309,1371,299,1406,293.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>
    </div>
    <div
      class="absolut fixed h-10 left-0 w-10 top-0 mt-3 ml-3 shadow-md cursor-pointer bg-white text-center rounded-full transition-transform duration-300 hover:translate-x-2 hover:translate-y-2"
    >
      <RouterLink to="/">
        <i class="bi text-blue-700 bi-houses-fill text-2xl"></i>
      </RouterLink>
    </div>
    <div class="px-3">
      <div
        class="w-full md:w-1/3 mx-auto p-4 md:mt-12 shadow-lg bg-white rounded px-5"
      >
        <p class="text-center font-bold text-2xl">Register</p>
        <div class="py-3 px-5">
          <hr class="text-blue-500" />
        </div>
        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              id="name"
              v-model="$v.name.$model"
              name="name"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your full name"
            />
            <div v-if="$v.name.$error" class="-mb-2">
              <span
                v-for="error in $v.name.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
              >
                Fullname is required
              </span>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              id="email"
              v-model="$v.email.$model"
              name="email"
              type="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email address"
            />
            <div v-if="$v.email.$error" class="-mb-2">
              <span
                v-for="error in $v.email.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
              >
                Email is required
              </span>
            </div>
          </div>

          <div class="flex w-full gap-5 justify-center">
            <div class="w-full">
              <label for="city" class="block text-sm font-medium text-gray-700"
                >City</label
              >
              <input
                id="city"
                v-model="$v.city.$model"
                name="city"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your city"
              />
              <div v-if="$v.city.$error" class="-mb-2">
                <span
                  v-for="error in $v.city.$errors"
                  :key="error.$uid"
                  class="text-red-500 text-sm"
                >
                  City is required
                </span>
              </div>
            </div>

            <div class="w-full">
              <label for="state" class="block text-sm font-medium text-gray-700"
                >State</label
              >
              <input
                id="state"
                v-model="$v.state.$model"
                name="state"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your state"
              />
              <div v-if="$v.state.$error" class="-mb-2">
                <span
                  v-for="error in $v.state.$errors"
                  :key="error.$uid"
                  class="text-red-500 text-sm"
                >
                  State is required
                </span>
              </div>
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              v-model="$v.password.$model"
              name="password"
              type="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            <div v-if="$v.password.$error" class="-mb-2">
              <span
                v-for="error in $v.password.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div>
            <label
              for="password_confirmation"
              class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              id="password_confirmation"
              v-model="$v.password_confirmation.$model"
              name="password_confirmation"
              type="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
            />
            <div v-if="$v.password_confirmation.$error" class="-mb-2">
              <span
                v-for="error in $v.password_confirmation.$errors"
                :key="error.$uid"
                class="text-red-500 text-sm"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <p class="text-sm mt-2">
              Already have an account?
              <RouterLink class="hover:underline" to="/login">Login</RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { computed, ref } from "vue";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const form = ref({
  name: "",
  email: "",
  city: "",
  state: "",
  password: "",
  password_confirmation: "",
});

const rules = computed(() => ({
  name: { required },
  email: { required, email },
  city: { required },
  state: { required },
  password: { required, minLength: minLength(6) },
  password_confirmation: {
    required,
    sameAsPassword: sameAs(form.value.password, "Passwords must match"),
  },
}));

const $v = useVuelidate(rules, form);
const toast = useToast();

const register = async () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    toast.error("Please fill out all fields correctly.");
    return;
  }

  const userObject = {
    name: form.value.name,
    email: form.value.email,
    city: form.value.city,
    state: form.value.state,
    password: form.value.password,
    password_confirmation: form.value.password_confirmation,
  };
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/register",
      userObject
    );
    if (response.status === 201) {
      toast.success("Registration successful!");
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    } else {
      toast.error("Registration failed");
    }
    console.log(response);
  } catch (error) {
    if (error.response.status === 500) {
      toast.error("Email address already exists");
    } else {
      toast.error("An error occurred during registration");
    }
    console.error(error.response);
  }
};
</script>

<style></style>

<template>
  <div class="bg-slate-200 md:bg-transparent px-2 h-screen flex items-center justify-center relative">
   
    <div class="absolute top-0 left-0 w-full h-full md:block hidden -z-20">
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
    <div class="max-w-md w-full p-4 shadow-lg bg-white rounded relative z-30">
      <p class="text-center font-bold text-3xl">Login Here</p>
      <div class="py-3 px-5">
        <hr class="text-blue-500" />
      </div>
      <form @submit.prevent="login" class="space-y-4">
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
        <div>
          <label
            for="password"
            class="block text-sm -mt-1 font-medium text-gray-700"
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
              Password is required
            </span>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p class="text-sm mt-2 text-center">
            Don't have an account?
            <RouterLink class="hover:underline" to="/register"
              >Register</RouterLink
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const form = ref({
  email: "",
  password: "",
});

const rules = computed(() => ({
  email: { required, email },
  password: { required },
}));

const $v = useVuelidate(rules, form);
const toast = useToast();

const login = async () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    toast.error("Please fill all the fields");
    return;
  }
  const userObject = {
    email: form.value.email,
    password: form.value.password,
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/login",
      userObject
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.success("Login successful!");
    console.log(response.data);
    setTimeout(() => {
      router.push("/dashboard");
    }, 4000);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Incorrect email or password");
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  }
};
</script>

<style></style>

<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";
import ViewAll from "../components/ViewAll.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import NavbarPageVue from "../components/NavbarPage.vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const jobCategories = ref([
  { name: "Software Development", count: 376 },
  { name: "Accounting/Finance", count: 305 },
  { name: "Production/Operations", count: 95 },
  { name: "Design/Creative", count: 93 },
  { name: "Telecommunication", count: 450 },
  { name: "Marketing/Sales", count: 666 },
  { name: "Engineer/Architects", count: 376 },
  { name: "CyberSecurity", count: 37 },
  { name: "Data Science", count: 396 },
]);
const jobs = ref([]);
const filteredJobs = ref([]);
const query = ref("");
const location = ref("");
const loading = ref(false);
const toast = useToast();

const searchJobs = async () => {
  loading.value = true;
  try {
    if (!query.value && !location.value) {
      toast.warning("Please enter a job title or location to search..");
      return;
    }

    const response = await axios.get("http://127.0.0.1:8000/api/jobs");
    const jobsData = response.data.jobs;

    if (!jobsData || jobsData.length === 0) {
      console.log("No jobs found");
      return;
    }

    filteredJobs.value = jobsData.filter((job) => {
      const isTitleMatch =
        query.value === "" ||
        job.title.toLowerCase().includes(query.value.toLowerCase());
      const isLocationMatch =
        location.value === "" ||
        job.location.toLowerCase().includes(location.value.toLowerCase());
      return isTitleMatch && isLocationMatch;
    });

    if (filteredJobs.value.length === 0) {
      alert("No jobs found for the given search criteria.");
      return;
    }

    console.log(filteredJobs.value);
    router.push({
      name: "SearchResult",
      query: { jobs: JSON.stringify(filteredJobs.value) },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="loader16">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div v-else>
      <NavbarPageVue />
      <div class="relative pt-16">
        <img
          class="object-cover w-full md:h-screen h-96"
          src="../assets/hero.jpg"
          alt=""
        />
        <div
          class="absolute top-0 left-0 z-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div class="px-3 text-center text-white">
            <h1 class="text-2xl font-bold md:text-4xl">
              Find Great Jobs to Build Your Bright Career
            </h1>
            <p class="mt-4">
              Explore opportunities that match your skills and aspirations.
            </p>
            <div class="flex gap-2 borde">
              <input
                type="text"
                v-model="query"
                id="job-title"
                class="bg-blue-50 mt-4 py-4 border border-blue-500 text-black placeholder-blue-700 dark:placeholder-blue-500 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-blue-500"
                placeholder="Job title or keywords"
              />
              <input
                type="text"
                v-model="location"
                id="city"
                class="bg-blue-50 mt-4 py-4 border border-blue-500 text-black placeholder-blue-700 dark:placeholder-blue-500 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-blue-500"
                placeholder="Choose location"
              />
              <button
                @click="searchJobs"
                type="button"
                class="text-white bg-blue-700 w-56 h-12 mt-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i class="text-xl font-bold bi bi-search"></i>
                <p class="text-md ms-1">search</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="block text-center bg-blue-600 md:hidden py-7">
        <p class="text-xl font-semibold text-white md:text-4xl">
          Unlock Your Career Potential
        </p>
        <p class="text-white text-md">
          Discover the perfect job opportunity for you.
        </p>
      </div>
      <div class="relative hidden -mt-32 container-fluid md:top-32 md:block">
        <div class="flex items-center justify-center h-auto text-center">
          <div class="absolute md:top-10">
            <p class="py-3 mt-6 font-semibold text-white md:text-4xl text-md">
              Unlock Your Career Potential
            </p>
            <p class="text-xl text-white">
              Discover the perfect job opportunity for you.
            </p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#007BFF"
            fill-opacity="1"
            d="M0,64L80,85.3C160,107,320,149,480,186.7C640,224,800,256,960,245.3C1120,235,1280,181,1360,154.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <p class="mt-10 text-2xl font-bold text-center">Popular Category</p>
      <div class="flex justify-center mx-auto text-center">
        <div class="h-1 bg-black w-52"></div>
      </div>
      <div
        class="grid gap-3 px-5 mx-auto mt-5 md:grid-cols-3 md:px-32 md:mt-10"
      >
        <div
          class="py-3 text-center transition duration-300 border-2 rounded shadow cursor-pointer hover:bg-blue-600 hover:font-bold text-md hover:text-white"
          v-for="category in jobCategories"
          :key="category.name"
        >
          {{ category.name }} ({{ category.count }})
        </div>
      </div>

      <div class="px-4 mx-auto bg-gray-100 md:px-44 pb-14 md:mt-20 py-7 mt-7">
        <p class="mb-5 text-2xl font-bold text-center">Recent Job Circulars</p>
        <ViewAll />
      </div>
    </div>
    <footer class="py-8 text-white bg-gray-800">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap justify-between">
          <div class="w-full mb-6 md:w-1/3 md:mb-0">
            <div class="mb-5">
              <h5 class="mb-2 text-lg font-bold">NovaJobs</h5>
            </div>
            <p class="text-gray-400">
              <span class="font-bold">Address:</span> Adenike, Ogbomoso, Oyo
              state, Nigeria.
            </p>
            <p class="text-gray-400">
              <span class="font-bold">Email:</span>
              aderibigbetoluwani5@gmail.com
            </p>
            <p class="text-gray-400">
              <span class="font-bold">Phone:</span> +2349032317059
            </p>
          </div>

          <div class="w-full mb-6 md:w-1/3 md:mb-0">
            <h5 class="mb-2 text-lg font-bold">Quick Links</h5>
            <ul class="list-none">
              <li class="mb-1">
                <a href="#" class="text-gray-400 hover:text-white">Home</a>
              </li>
              <li class="mb-1">
                <a href="#" class="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li class="mb-1">
                <a href="#" class="text-gray-400 hover:text-white">Jobs</a>
              </li>
              <li class="mb-1">
                <a href="#" class="text-gray-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white"
                  >Privacy Policy</a
                >
              </li>
            </ul>
          </div>

          <div class="w-full md:w-1/3">
            <h5 class="mb-2 text-lg font-bold">Follow Us</h5>
            <div class="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                class="text-gray-400 hover:text-white"
                ><i class="fab fa-facebook-f">Face Book</i></a
              >
              <a
                href="#"
                aria-label="Twitter"
                class="text-gray-400 hover:text-white"
                ><i class="fab fa-twitter">Linkedin</i></a
              >
              <a
                href="#"
                aria-label="LinkedIn"
                class="text-gray-400 hover:text-white"
                ><i class="fab fa-linkedin-in">Twitter</i></a
              >
              <a
                href="#"
                aria-label="Instagram"
                class="text-gray-400 hover:text-white"
                ><i class="fab fa-instagram">Instagram</i></a
              >
            </div>
          </div>
        </div>

        <div class="pt-4 mt-8 border-t border-gray-700">
          <p class="text-center text-gray-500">
            &copy; {{ new Date().getFullYear() }} NovaJobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.loader16 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.loader16 span {
  height: 20px;
  width: 20px;
  margin: 4px;
  border-radius: 10px;
  background-color: #a29bfe;
  animation: loader16-animation 1.5s infinite ease-in-out;
}

.loader16 span:last-child {
  margin-right: 0;
}

.loader16 span:nth-child(1) {
  animation-delay: -0.3s;
}

.loader16 span:nth-child(2) {
  animation-delay: -0.1s;
}

.loader16 span:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes loader16-animation {
  0% {
    transform: scale(0.8);
    background-color: #4236ec;
    box-shadow: 0 0 0 0 rgba(70, 60, 211, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #6c5ce7;
    box-shadow: 0 0 0 10px rgba(108, 92, 231, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #473ce4;
    box-shadow: 0 0 0 0 rgba(162, 155, 254, 0.7);
  }
}
</style>

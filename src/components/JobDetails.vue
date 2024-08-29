<template>
  <SideBar />
  <div class="md:p-4 p-3 sm:ml-64">
    <div class="md:p-4 p-3 mt-12">
      <div
        class="absolut fixed h-10 left-0 md:left-auto w-10 top-14 mt-3 ml-3 shadow-md cursor-pointer bg-white text-center rounded-full transition-transform duration-300 hover:translate-x-2 hover:translate-y-2"
      >
        <RouterLink to="/view">
          <i
            class="bi text-blue-700 bi-arrow-left-circle-fill text-2xl shadow rounded-full text-center items-center"
          ></i>
        </RouterLink>
      </div>
      <div
        v-if="job"
        class="max-w-xl mx-auto mt-14 md:mt-5 bg-white shadow-md rounded md:p-6 p-3"
      >
        <div class="flex gap-5 mb-4">
          <img
            src="https://img.freepik.com/premium-photo/best-logo-template-vector-icon-illustration-design-ai-generated_966797-13127.jpg?w=740"
            class="h-20 rounded"
            alt="Company Logo"
          />
          <div>
            <h2 class="font-bold text-lg">{{ job.companyName }} Ltd.</h2>
            <p class="text-gray-500">{{ job.location }}</p>
          </div>
        </div>
        <h3 class="font-bold text-xl mb-2">{{ job.title }}</h3>
        <p class="text-blue-700 font-semibold mb-4">{{ job.jobType }}</p>
        <p class="mb-4">{{ job.requirement }}</p>
        <p class="font-bold text-xl">
          ${{ job.salary }}<span class="text-sm font-light">/monthly</span>
        </p>
        <div class="px-2 py-3 my-6 bg-gray-100 shadow rounded-md">
          <p class="font-bold text-2xl">Job Details</p>
          <hr class="mt-2 border border-blue-600" />
          <p class="text-xl text-blue-700 mt-3 font-semibold py-1">
            Company Name
          </p>
          <p>{{ job.companyName }}</p>
          <p class="text-xl text-blue-700 mt-3 font-semibold py-1">Email</p>
          <p>{{ job.email }}</p>
          <p class="text-xl text-blue-700 mt-3 font-semibold py-1">Phone</p>
          <p>{{ job.phone }}</p>
          <p class="text-xl text-blue-700 mt-3 font-semibold py-1">
            Company Location
          </p>
          <p>{{ job.companyLocation }}</p>
          <p class="text-xl text-blue-700 mt-3 font-semibold py-1">Address</p>
          <p>{{ job.address }}</p>
          <p class="text-xl text-blue-700 mt-3 font-semibold py-1">
            description
          </p>
          <p>{{ job.description }}</p>
        </div>
        <button
          class="bg-blue-700 font-semibold text-white w-full py-3 rounded-md"
          @click="applyNow"
        >
          Apply Now
        </button>
      </div>
      <div v-else class="flex justify-center items-center h-screen">
        <div class="loader16">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import SideBar from "../components/SideBar.vue";
import Swal from "sweetalert2";

const job = ref(null);
const route = useRoute();

const fetchJobDetails = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}`);
    // console.log(response);
    job.value = response.data.job;
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

const applyNow = async () => {
  const result = await Swal.fire({
    title: "Job applied successfully!!!",
    text: "congratulatons on the new appiled job 🤝🤝🤝",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "procees",
  });
};

onMounted(() => {
  fetchJobDetails(route.params.id);
});
</script>

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
    background-color: #a29bfe;
    box-shadow: 0 0 0 0 rgba(162, 155, 254, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #6c5ce7;
    box-shadow: 0 0 0 10px rgba(108, 92, 231, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #a29bfe;
    box-shadow: 0 0 0 0 rgba(162, 155, 254, 0.7);
  }
}
</style>

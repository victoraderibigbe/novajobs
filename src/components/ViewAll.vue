<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <div class="loader16">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div v-else>
    <p class="font-bold text-2xl mb-5 text-blue-700">Available jobs</p>
    <div class="md:grid grid-cols-3 md:gap-4">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="md:px-6 mt-4 px-5 md:mt-0 py-6 shadow-md rounded bg-white"
      >
        <div class="flex gap-5">
          <img
            src="https://img.freepik.com/premium-photo/best-logo-template-vector-icon-illustration-design-ai-generated_966797-13127.jpg?w=740"
            class="h-10 rounded"
            alt=""
          />
          <div>
            <p class="font-bold text-sm">{{ job.companyName }} Ltd.</p>
            <p class="text-sm">{{ job.location }}</p>
          </div>
        </div>
        <p class="font-bold mt-2 text-md">{{ job.title }}</p>
        <p class="text-sm text-blue-700 py-2 font-bold">{{ job.jobType }}</p>
        <div class="text-sm">{{ job.requirement }}</div>
        <div class="flex justify-between mt-5">
          <p class="font-bold text-xl">
            ${{ job.salary }}<span class="text-sm font-light">/monthly</span>
          </p>
          <RouterLink
            :to="{ name: 'JobDetails', params: { id: job.id } }"
            class="bg-blue-700 px-4 py-2 rounded-md text-sm md:text-[12px] transition hover:text-blue-700 hover:shadow-md hover:bg-white duration-300 text-white font-medium"
          >
            Job Details
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const jobs = ref([]);
const loading = ref(true);
const fetchJobs = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://127.0.0.1:8000/api/jobs");
    jobs.value = response.data.jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  } finally {
    loading.value = false;
  }
};
onMounted(fetchJobs);
</script>


<style>
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
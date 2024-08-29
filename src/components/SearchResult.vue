<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import NavbarPage from "./NavbarPage.vue";
import hiringGif from '../assets/Hiring.gif';

const route = useRoute();
const jobs = computed(() => {
  const jobsParam = route.query.jobs;
  return jobsParam ? JSON.parse(jobsParam) : [];
});
const toUpper = (text) => text.toUpperCase()
const selectedJob = computed(() => jobs.value[0])
</script>

<template>
  <NavbarPage />
  <div class="md:px-20 px-10 py-20">
    <p  v-if="selectedJob" class="font-bold text-xl text-blue-700 mb-5">Search Results for: <strong class="text-black text-sm"> {{toUpper(selectedJob.title)}}</strong></p>
    <div v-if="jobs.length" class="md:grid grid-cols-3 md:gap-10">
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
            class="bg-blue-700 px-4 py-2 float-end rounded-md text-sm md:text-[12px] transition hover:text-blue-700 hover:shadow-md hover:bg-white duration-300 text-white font-medium"
          >
            Job Details
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else class="mx-auto items-center flex justify-center">
      <div>
      <img :src="hiringGif" alt="">
      <p class="font-bold text-center md:text-2xl ">No jobs found matching your search criteria.</p>
      </div>
    </div>
  </div>
</template>

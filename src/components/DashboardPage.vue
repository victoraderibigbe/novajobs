<template>
  <div>
    <!-- Overlay -->

    <SideBar />
    <div class="p-4 sm:ml-64">
      <div class="p-4 mt-12">
        <div v-if="loading" class="flex justify-center items-center h-screen">
          <div class="loader16">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="" v-if="!loading">
          <div v-if="userJobs.length === 0" class="text-center mt-1">
            <p class="text-gray-600 text-xl">
              You have not posted any jobs yet.
            </p>
            <p class="text-gray-500">
              Start by posting a new job to see it here.
            </p>
          </div>

          <div v-else>
            <p class="font-bold text-2xl mb-5 text-blue-700">Posted Jobs</p>
            <div class="md:grid grid-cols-3 md:gap-4">
              <div
                v-for="job in userJobs"
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
                <p class="text-sm text-blue-700 py-2 font-bold">
                  {{ job.jobType }}
                </p>
                <div class="text-sm">{{ job.requirement }}</div>
                <div class="gap-10 mt-5">
                  <p class="font-bold mb-4 text-xl">
                    ${{ job.salary
                    }}<span class="text-sm font-light">/monthly</span>
                  </p>
                  <div class="flex gap-3 justify-center">
                    <button
                      @click="openEditModal(job)"
                      class="bg-blue-700 px-4 py-2 rounded-md text-sm md:text-[12px] transition hover:text-blue-700 hover:shadow-md hover:bg-white duration-300 text-white font-medium"
                    >
                      Edit Post
                    </button>
                    <button
                      @click="deleteJob(job.id)"
                      class="bg-red-500 px-4 py-2 rounded-md text-sm md:text-[12px] transition hover:text-red-700 hover:shadow-md hover:bg-white duration-300 text-white font-medium"
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showEditModal"
    class="absolute py-14 mx-auto px-2 mt-[13pc] h-screen inset-0 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
      <h3 class="text-xl font-semibold mb-4">Edit Job Post</h3>
      <form @submit.prevent="updateJob">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Title</label
          >
          <input
            type="text"
            id="title"
            v-model="editJob.title"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div class="flex gap-4 justify-between">
          <div class="mb-4 w-full">
            <label
              for="location"
              class="block text-sm font-medium text-gray-700"
              >location</label
            >
            <input
              type="text"
              id="location"
              v-model="editJob.location"
              class="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          <div class="mb-4 w-full">
            <label for="jobType" class="block text-sm font-medium text-gray-700"
              >Job Type</label
            >
            <select
              id="jobType"
              v-model="editJob.jobType"
              name="jobType"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
        <div class="mb-4">
          <label
            for="requirement"
            class="block text-sm font-medium text-gray-700"
            >Requirement</label
          >
          <textarea
            id="requirement"
            v-model="editJob.requirement"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="salary" class="block text-sm font-medium text-gray-700"
            >Salary</label
          >
          <input
            type="number"
            id="salary"
            v-model="editJob.salary"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            id="description"
            v-model="editJob.description"
            name="description"
            rows="4"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter job description"
            required
          ></textarea>
        </div>
        <div class="flex gap-4 mt-2 justify-between">
          <div class="w-full mb-4">
            <label
              for="companyName"
              class="block text-sm font-medium text-gray-700"
              >Company Name</label
            >
            <input
              id="companyName"
              v-model="editJob.companyName"
              name="companyName"
              type="text"
              class="mt-1 block w-full shadow-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter company name"
              required
            />
          </div>
          <div class="mb-4 w-full">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Company Email</label
            >
            <input
              id="email"
              v-model="editJob.email"
              name="email"
              type="text"
              class="mt-1 block w-full shadow-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter company email"
              required
            />
          </div>
        </div>
        <div class="flex gap-4 mt-2 justify-between">
          <div class="mb-4 w-full">
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Company Phone</label
            >
            <input
              id="phone"
              v-model="editJob.phone"
              name="phone"
              type="text"
              class="mt-1 block w-full shadow-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter company phone"
              required
            />
          </div>
          <div class="mb-4 w-full">
            <label for="address" class="block text-sm font-medium text-gray-700"
              >Company Address</label
            >
            <input
              id="address"
              v-model="editJob.address"
              name="address"
              type="text"
              class="mt-1 block w-full shadow-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter company address"
              required
            />
          </div>
        </div>
        <div class="w-full">
          <label
            for="companyLocation"
            class="block text-sm font-medium text-gray-700"
            >Company Location</label
          >
          <input
            id="companyLocation"
            v-model="editJob.companyLocation"
            name="companyLocation"
            type="text"
            class="mt-1 block w-full shadow-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter company location"
            required
          />
        </div>
        <div class="mb-4">
          <label
            for="additionalInfo"
            class="block text-sm font-medium text-gray-700"
            >Additional Info</label
          >
          <textarea
            id="additionalInfo"
            v-model="editJob.additionalInfo"
            name="additionalInfo"
            rows="4"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter any additional information"
            required
          ></textarea>
        </div>

        <div class="flex justify-end gap-4">
          <button
            @click="closeEditModal"
            class="bg-gray-500 px-4 py-2 rounded-md text-sm text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-700 px-4 py-2 rounded-md text-sm text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="showEditModal" class="fixed inset-0 bg-black opacity-50"></div>
</template>

<script setup>
import SideBar from "../components/SideBar.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

const userJobs = ref([]);
const loading = ref(true);
const errorMessage = ref(null);
const showEditModal = ref(false);
const editJob = ref({});

const fetchUserJobs = async () => {
  const userId = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/jobs/user/${userId.id}`
    );
    userJobs.value = response.data.jobs;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      userJobs.value = [];
      errorMessage.value = "You have not posted any jobs yet.";
    } else {
      console.error("Error fetching user jobs:", error);
      errorMessage.value =
        "An error occurred while fetching your jobs. Please try again later.";
    }
  } finally {
    loading.value = false;
  }
};

const deleteJob = async (jobId) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axios.delete(`http://127.0.0.1:8000/api/jobs/${jobId}`);
      console.log(res);
      userJobs.value = userJobs.value.filter((job) => job.id !== jobId);
      Swal.fire("Deleted!", "Your job post has been deleted.", "success");
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    Swal.fire(
      "Error!",
      "An error occurred while deleting the job. Please try again later.",
      "error"
    );
  }
};

const openEditModal = (job) => {
  editJob.value = { ...job };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const updateJob = async () => {
  try {
    await axios.put(
      `http://127.0.0.1:8000/api/jobs/${editJob.value.id}`,
      editJob.value
    );
    userJobs.value = userJobs.value.map((job) =>
      job.id === editJob.value.id ? editJob.value : job
    );
    Swal.fire("Updated!", "Your job post has been updated.", "success");
    closeEditModal();
  } catch (error) {
    console.error("Error updating job:", error);
    Swal.fire(
      "Error!",
      "An error occurred while updating the job. Please try again later.",
      "error"
    );
  }
};

onMounted(fetchUserJobs);
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

<template>
  <div
    v-if="sidebarVisible"
    class="fixed inset-0 z-30 bg-black opacity-50"
    @click="dismissSidebar"
  ></div>

  <!-- Sidebar Toggle Button -->
  <div
    class="bg-white flex h-14 border-b-2 border-b-blue-500 justify-between md:justify-end shadow-lg fixed w-full"
  >
    <button
      @click="toggleSidebar"
      aria-controls="sidebar-multi-level-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
    <div class="flex justify-end gap-2 md:py-3 px-3">
      <p class="mt-[10px] md:mt-0">Welcome:</p>
      <p class="text-blue-900 md:mt-0 mt-[10px] font-bold">{{ userName }}</p>
    </div>
  </div>

  <!-- Sidebar -->
  <aside
    :class="sidebarClass"
    id="sidebar-multi-level-sidebar"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-blue-700">
      <div
        className="bg-slate-300 rounded flex items-center justify-between p-4 space-x-4"
      >
        <div className="flex items-center space-x-4">
          <img
            className="h-12 w-12 rounded-full"
            src="https://img.freepik.com/free-photo/casual-young-african-man-smiling-isolated-white_93675-128895.jpg?t=st=1717687386~exp=1717690986~hmac=a571c165c5ccf3f51f03de509900bd0ad97745d46ded5874df9ff38e9ab5deff&w=740"
            alt="Profile"
          />
          <div>
            <p className="text-black text-[12px] break-all font-semibold">
              adeshola12j5d@gmail.com
            </p>
          </div>
        </div>
      </div>
      <ul class="space-y-2 mt-5 font-medium">
        <li>
          <RouterLink
            to="/"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 group"
          >
            <i class="bi bi-houses text-white"></i>
            <span class="ms-3">Home</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/dashboard"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 group"
          >
            <i class="bi bi-bag-dash text-white"></i>
            <span class="ms-3">Dashboard</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/job/create"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 group"
          >
            <i class="bi bi-file-post text-white"></i>
            <span class="ms-3">Post Job</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/view"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 group"
          >
            <i class="bi bi-view-list text-white"></i>
            <span class="ms-3">All jobs</span>
          </RouterLink>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 group"
          >
            <i class="bi bi-gear text-white"></i>
            <span class="ms-3">Setting</span>
          </a>
        </li>
        <li>
          <button
            @click="logOut"
            class="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 group"
          >
            <i class="bi bi-box-arrow-left text-white"></i>
            <span class="ms-3">LogOut</span>
          </button>
        </li>

      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      sidebarVisible: false,
      dropdownVisible: false,
      userName: "",
    };
  },
  computed: {
    sidebarClass() {
      return this.sidebarVisible
        ? "fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0"
        : "fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0";
    },
    dropdownClass() {
      return this.dropdownVisible ? "py-2 space-y-2" : "hidden py-2 space-y-2";
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    dismissSidebar() {
      this.sidebarVisible = false;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    fetchUserName() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.name) {
        this.userName = user.name;
      } else {
        this.userName = "Guest";
      }
    },
    logOut() {
      this.$swal({
        title: "Are you sure?",
        text: "You will be logged out and redirected to the login page.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.$router.push("/login");
          this.$swal(
            "Logged Out",
            "You have been logged out successfully.",
            "success"
          );
        }
      });
    },
  },
  created() {
    this.fetchUserName();
  },
};
</script>

<style></style>

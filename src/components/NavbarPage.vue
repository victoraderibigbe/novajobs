<template>
  <nav class="!bg-white border-gray-200 fixed w-full shadow-md z-10">
    <div
      class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto"
    >
      <RouterLink
        to="/"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <span
          class="self-center text-sm font-bold md:text-xl whitespace-nowrap dark:text-black"
          ><span class="text-blue-700">Nova</span>Jobs</span
        >
      </RouterLink>
      <div class="flex items-center space-x-6 rtl:space-x-reverse">
        <RouterLink
          to="/login"
          class="text-sm font-semibold text-blue-600 dark:text-blue-500 hover:underline"
          >Login</RouterLink
        >
        <RouterLink
          to="/register"
          class="text-sm font-semibold text-black hover:underline"
          >Register</RouterLink
        >
        <RouterLink
          to="/dashboard"
          class="text-sm font-semibold text-black hover:underline"
          >Dashboard</RouterLink
        >
      </div>
    </div>
  </nav>
</template>

<script></script>

<style></style>

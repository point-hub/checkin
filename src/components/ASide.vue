<template>
  <div>
    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="absolute z-10 w-full h-full bg-gray-700 opacity-50"
    />
    <transition name="slide-fade">
      <div v-if="isOpen" class="absolute flex justify-end w-full h-full">
        <div
          class="z-20 flex flex-col justify-between w-64 h-full p-2 bg-gray-100 shadow-lg"
        >
          <div class="flex justify-between flex-grow-0 p-2">
            <h1 class="py-1 uppercase">
              Notification
            </h1>
            <button class="inline-block p-2" @click="close()">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="times"
                class="w-2 svg-inline--fa fa-times fa-w-10"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="flex-1 space-y-2">
            <div class="p-2 bg-white">
              <h1 class="text-sm font-bold">Update 0.4.25</h1>
              <ol class="mt-1">
                <li class="text-sm">
                  Network connection error now return error message instead of
                  redirect user to login page
                </li>
              </ol>
            </div>
            <div class="p-2 bg-white">
              <h1 class="text-sm font-bold">Update 0.4.24</h1>
              <ol class="mt-1">
                <li class="text-sm">
                  Fix feature filter to show relevant data
                </li>
              </ol>
            </div>
          </div>
          <div class="p-2">
            <div class="flex flex-col flex-1 px-1 text-right">
              <p class="text-xs font-bold">v{{ version }}</p>
            </div>
            <div
              class="flex items-center flex-shrink-0 w-full p-1 my-1 text-gray-500 border border-gray-500"
            >
              <div class="flex items-center justify-center flex-1 p-1">
                <a
                  href="javascript:void(0)"
                  class="w-full text-sm font-bold text-center uppercase"
                  @click="logout"
                >
                  LOGOUT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import cookie from "@point-hub/vue-cookie";

export default {
  name: "ASide",
  data() {
    return {
      isOpen: false,
      version: process.env.VUE_APP_VERSION
    };
  },
  beforeUnmount() {
    this.close();
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    logout() {
      cookie.remove("token");
      this.$router.push("/auth/login");
    }
  }
};
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

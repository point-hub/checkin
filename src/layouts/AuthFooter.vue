<template>
  <div class="flex flex-col mt-8 text-sm text-gray-600">
    <div class="flex justify-between m-4 space-x-3">
      <div class="space-x-3">
        <router-link to="/policy">Policy</router-link>
        <router-link to="/terms">
          Terms
        </router-link>
        <router-link to="/support">
          Support
        </router-link>
      </div>
      <div>
        <span class="" to="/policy">v{{ version }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      version: process.env.VUE_APP_VERSION
    };
  }
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 opacity-75" />
  <div
    v-if="isOpen"
    class="fixed inset-0 flex flex-col justify-center w-full h-full max-w-screen-sm p-4 m-auto"
  >
    <div
      class="flex flex-col w-full max-w-screen-sm p-4 space-y-3 bg-white rounded-md"
    >
      <div class="flex items-center justify-between">
        <h2 class="heading-3">NEW UPDATE AVAILABLE</h2>
      </div>
      <div class="flex flex-col py-0 space-y-4">
        <div class="flex flex-col space-y-1">
          <p>
            We are keep improving stability, performance and added new feature,
            please refresh your page or click update button below to receive new
            update <template v-if="newVersion">{{ newVersion }}</template>
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            class="w-full px-4 py-2 uppercase rounded-md btn-primary"
            @click="updateNow()"
          >
            Update Now
          </button>
          <button
            class="w-full px-4 py-2 uppercase rounded-md btn-danger"
            @click="close()"
          >
            Update Later
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newVersion: null,
      isOpen: false
    };
  },
  methods: {
    open(newVersion = null) {
      this.newVersion = newVersion;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    isModalOpen() {
      return this.isOpen;
    },
    updateNow() {
      window.location.reload(true);
    }
  }
};
</script>

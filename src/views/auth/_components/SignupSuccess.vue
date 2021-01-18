<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 opacity-75" />
  <div
    v-if="isOpen"
    class="fixed inset-0 flex flex-col justify-center w-full h-full max-w-screen-sm p-4 m-auto"
  >
    <div
      class="flex flex-col w-full max-w-screen-sm p-4 space-y-3 bg-white rounded-md"
    >
      <div class="flex items-start justify-between">
        <h2 class="uppercase heading-3">REGISTRATION SUCCESS</h2>
      </div>
      <div class="flex flex-col py-0 space-y-4">
        <div class="flex flex-col space-y-1">
          <p>
            Your registration success, please check your email to verify your
            account
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            class="w-full px-4 py-2 uppercase rounded-md btn-primary"
            @click="redirectToLogin()"
          >
            Ok
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
      isOpen: false
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    redirectToLogin() {
      this.$router.push("/");
    }
  }
};
</script>

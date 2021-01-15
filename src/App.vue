<template>
  <div class="w-full h-full">
    <router-view />
    <update-app ref="updateAppRef"></update-app>
  </div>
</template>

<script>
import UpdateApp from "./components/UpdateApp";

export default {
  components: {
    UpdateApp
  },
  mounted() {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
      this.$refs.updateAppRef.open();
    });
  }
};
</script>

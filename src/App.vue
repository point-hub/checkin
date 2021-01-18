<template>
  <div class="w-full h-full">
    <router-view />
    <update-app ref="updateAppRef"></update-app>
  </div>
</template>

<script>
import UpdateApp from "./components/UpdateApp";
import socketIO from "@/lib/socket";

export default {
  components: {
    UpdateApp
  },
  data() {
    return {
      socket: socketIO,
      version: process.env.VUE_APP_VERSION
    };
  },
  mounted() {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
      this.$refs.updateAppRef.open();
    });

    this.socket.on("appVersion", version => {
      const onlineMajor = version.split(".")[0];
      const onlineMinor = version.split(".")[1];
      const onlinePatch = version.split(".")[2];
      const localMajor = this.version.split(".")[0];
      const localMinor = this.version.split(".")[1];
      const localPatch = this.version.split(".")[2];

      console.log(`online version ${version}, local version ${this.version}`);
      // Patch update request user to reload browser
      if (
        onlinePatch > localPatch &&
        onlineMinor === localMinor &&
        onlineMajor === localMajor &&
        !this.$refs.updateAppRef.isModalOpen()
      ) {
        this.$refs.updateAppRef.open(version);
      }

      // Major / Minor update, force reload client browser to receive update
      if (onlineMinor > localMinor || onlineMajor > localMajor) {
        window.location.reload(true);
      }
    });
  }
};
</script>

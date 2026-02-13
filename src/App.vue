<template>
  <div class="w-full h-full">
    <router-view />
    <update-app ref="updateAppRef"></update-app>
  </div>
</template>

<script>
import UpdateApp from "./components/UpdateApp";
import socketIO from "@/lib/socket";
import cookie from "@point-hub/vue-cookie";
import { getTokenExpiryTimestamp, isTokenExpired } from "@/lib/token";

export default {
  components: {
    UpdateApp
  },
  data() {
    return {
      socket: socketIO,
      version: process.env.VUE_APP_VERSION,
      tokenCheckInterval: null,
      tokenExpiryTimeout: null,
      activeToken: null
    };
  },
  watch: {
    $route() {
      this.validateTokenSession();
    }
  },
  mounted() {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
      this.$refs.updateAppRef.open();
    });

    this.socket.on("appVersion", this.handleAppVersionUpdate);
    this.startTokenExpiryWatcher();
    window.addEventListener("focus", this.validateTokenSession);
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  },
  beforeUnmount() {
    this.socket.off("appVersion", this.handleAppVersionUpdate);
    this.clearTokenWatcher();
    window.removeEventListener("focus", this.validateTokenSession);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
  },
  methods: {
    onVisibilityChange() {
      if (!document.hidden) {
        this.validateTokenSession();
      }
    },
    startTokenExpiryWatcher() {
      this.validateTokenSession();
      this.tokenCheckInterval = window.setInterval(() => {
        this.validateTokenSession();
      }, 30000);
    },
    clearTokenWatcher() {
      this.clearTokenExpiryTimeout();
      if (this.tokenCheckInterval) {
        window.clearInterval(this.tokenCheckInterval);
        this.tokenCheckInterval = null;
      }
      this.activeToken = null;
    },
    clearTokenExpiryTimeout() {
      if (this.tokenExpiryTimeout) {
        window.clearTimeout(this.tokenExpiryTimeout);
        this.tokenExpiryTimeout = null;
      }
    },
    scheduleTokenExpiryLogout(token) {
      this.clearTokenExpiryTimeout();
      const tokenExpiry = getTokenExpiryTimestamp(token);

      if (!tokenExpiry) {
        return;
      }

      const timeoutDuration = tokenExpiry - Date.now();
      if (timeoutDuration <= 0) {
        this.forceLogoutToLogin();
        return;
      }

      this.tokenExpiryTimeout = window.setTimeout(() => {
        this.forceLogoutToLogin();
      }, timeoutDuration);
    },
    validateTokenSession() {
      const token = cookie.get("token");

      if (!token) {
        this.activeToken = null;
        this.clearTokenExpiryTimeout();
        return;
      }

      if (token !== this.activeToken) {
        this.activeToken = token;
        this.scheduleTokenExpiryLogout(token);
      }

      const tokenExpiry = getTokenExpiryTimestamp(token);
      if (tokenExpiry) {
        cookie.set("tokenExpiry", tokenExpiry.toString());
      }

      if (isTokenExpired(token)) {
        this.forceLogoutToLogin();
      }
    },
    forceLogoutToLogin() {
      this.activeToken = null;
      this.clearTokenExpiryTimeout();
      this.$store.dispatch("auth/logout");

      if (this.$route.path !== "/auth/login") {
        this.$router.push("/auth/login");
      }
    },
    handleAppVersionUpdate(version) {
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
    }
  }
};
</script>

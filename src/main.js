import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./index.css";
import VueGtag from "vue-gtag";

createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, {
    config: { id: process.env.VUE_APP_GTAG_ID }
  })
  .mount("#app");

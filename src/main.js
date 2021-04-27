import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./index.css";
import VueGtag from "vue-gtag-next";

createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, {
    property: {
      id: process.env.VUE_APP_GTAG_ID
    }
  })
  .mount("#app");

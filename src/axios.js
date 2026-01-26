import axios from "axios";
import cookie from "@point-hub/vue-cookie";
import router from "./router";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  timeout: 600 * 2 * 1000 // 2 minutes
});

instance.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Request: ", config.url);
      console.log("Request: ", config);
    }

    // Add auth token
    const token = cookie.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function(error) {
    console.log("Response Error: ", error.response);
    return Promise.reject(error.response);
  }
);

instance.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Response: ", response.config.url);
      console.log("Response: ", response.data);
    }
    return response;
  },
  function(error) {
    if (!error.response) {
      // Network error
      return Promise.reject(error);
    } else {
      // If response is unauthorized (401) then token is invalid/expired
      if (error.response.status == 401) {
        // Clear token and redirect to login
        cookie.remove("token");
        cookie.remove("tokenExpiry");

        // Only redirect if not already on login page
        if (router.currentRoute.value.path !== "/auth/login") {
          router.push("/auth/login");
        }
      }
      console.log("Response Error: ", error.response);
      return Promise.reject(error.response);
    }
  }
);

export default instance;

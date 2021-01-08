<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col justify-center h-full m-4">
      <div class="flex items-center justify-center w-full mb-4">
        <img src="@/assets/logo.png" alt="" class="w-16 m-2" />
        <div class="flex flex-col">
          <h1 class="text-4xl font-extrabold">CHECKIN</h1>
          <span class="text-xs leading-3 text-right uppercase">
            Geolocation & Photo
          </span>
        </div>
      </div>
      <form @submit.prevent="login">
        <div class="flex flex-col my-2">
          <label class="text-xs uppercase" for="username">
            Email
          </label>
          <input
            type="email"
            v-model="form.email"
            class="p-2 my-1 text-black border-2 border-gray-400 rounded-md"
          />
        </div>
        <div class="my-2">
          <label class="text-xs uppercase" for="password">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              :type="inputTypePassword"
              v-model="form.password"
              class="w-full p-2 my-1 text-black border-2 border-gray-400 rounded-md "
            />
            <button
              type="button"
              class="absolute right-0 p-2 m-2"
              @click="togglePassword()"
            >
              <!-- Eye Icon -->
              <svg
                v-if="inputTypePassword === 'text'"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="eye"
                class="h-5 text-gray-500 svg-inline--fa fa-eye fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                ></path>
              </svg>
              <!-- Eye Slash Icon -->
              <svg
                v-if="inputTypePassword === 'password'"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="eye-slash"
                class="h-5 text-gray-500 svg-inline--fa fa-eye-slash fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <p class="p-2 text-white bg-red-500" v-if="errorMessage">
          {{ errorMessage }}
        </p>
        <button
          class="w-full p-2 my-4 font-bold text-white uppercase rounded-md bg-primary"
        >
          Login
        </button>
      </form>
      <div class="flex items-center justify-between text-sm">
        <div class="inline-flex items-center">
          <input type="checkbox" id="remember-me" class="mr-2" />
          <label for="remember-me">Remember me</label>
        </div>
        <div class="flex flex-col text-right">
          <!-- <router-link to="" class="text-blue-500">
            Forgot Password ?
          </router-link> -->
          <router-link to="/signup" class="text-blue-500">
            I don't have an account
          </router-link>
        </div>
      </div>
      <hr class="my-4" />
      <!-- <button
        class="inline-flex items-center justify-center w-full p-2 my-4 font-bold text-center text-white uppercase rounded-md bg-primary"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          class="h-4 mr-2 svg-inline--fa fa-google fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path></svg
        >SIGN IN WITH GOOGLE
      </button> -->
    </div>
    <auth-footer></auth-footer>
    <Loading ref="loadingRef"></Loading>
  </div>
</template>

<script>
import AuthFooter from "@/layouts/AuthFooter";
import cookie from "@point-hub/vue-cookie";
import axios from "@/axios";
import Loading from "@/components/Loading";
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    AuthFooter,
    Loading
  },
  data() {
    return {
      inputTypePassword: "password",
      errorMessage: "",
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["updateAuthUser"]),
    async login() {
      this.$refs.loadingRef.open();
      try {
        const result = await axios.post("/auth/login", this.form);
        if (result.status === 200) {
          cookie.set("token", result.data.data.token);
          console.log(result.data.data);
          this.updateAuthUser(result.data.data);
          Object.assign(this.$data, this.$options.data.call(this));
          this.$router.push("/");
        } else {
          this.errorMessage = "Error";
        }
        this.$refs.loadingRef.close();
      } catch (error) {
        this.errorMessage = "Error";
        this.$refs.loadingRef.close();
      }
    },
    togglePassword() {
      if (this.inputTypePassword === "password") {
        this.inputTypePassword = "text";
      } else {
        this.inputTypePassword = "password";
      }
    }
  }
};
</script>

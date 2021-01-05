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
      <div class="flex flex-col my-2">
        <label class="text-xs uppercase" for="username">
          Username
        </label>
        <input
          type="username"
          v-model="form.username"
          class="p-2 my-1 text-black border-2 border-gray-400 rounded-md"
        />
      </div>
      <div class="flex flex-col my-2">
        <label class="text-xs uppercase" for="password">
          Password
        </label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            :type="inputTypePassword"
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
        class="p-2 my-4 font-bold text-white uppercase rounded-md bg-primary"
        @click="register()"
      >
        Register
      </button>
      <div class="flex justify-between text-sm">
        <div class="flex flex-col flex-1 text-right">
          <router-link to="/auth/login" class="text-blue-500 ">
            Already have an account ?
          </router-link>
        </div>
      </div>
    </div>

    <auth-footer></auth-footer>
  </div>
</template>

<script>
import AuthFooter from "@/layouts/AuthFooter";
import axios from "@/axios";

export default {
  name: "Registration",
  components: {
    AuthFooter
  },
  data() {
    return {
      inputTypePassword: "password",
      errorMessage: "",
      password: "",
      form: {
        email: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async register() {
      const result = await axios.post("/auth/register", this.form);
      if (result.status === 201) {
        //
      } else {
        this.errorMessage = result.data.error.message;
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

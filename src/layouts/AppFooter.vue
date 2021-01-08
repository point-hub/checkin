<template>
  <div class="flex items-center w-full h-16 text-xs bg-white shadow-md">
    <router-link
      :to="'/'"
      class="flex flex-col items-center justify-center flex-1 h-16 text-center"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="home-lg-alt"
        class="w-9 h-9"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path
          fill="currentColor"
          d="M570.24 215.42L323.87 13a56 56 0 0 0-71.75 0L5.76 215.42a16 16 0 0 0-2 22.54L14 250.26a16 16 0 0 0 22.53 2L64 229.71V288h-.31v208a16.13 16.13 0 0 0 16.1 16H496a16 16 0 0 0 16-16V229.71l27.5 22.59a16 16 0 0 0 22.53-2l10.26-12.3a16 16 0 0 0-2.05-22.58zM464 224h-.21v240H352V320a32 32 0 0 0-32-32h-64a32 32 0 0 0-32 32v144H111.69V194.48l.31-.25v-4L288 45.65l176 144.62z"
        ></path>
      </svg>

      <p class="text-xs uppercase"></p>
      <span>HOME</span>
    </router-link>

    <router-link
      :to="'/checkin/create'"
      class="flex flex-col items-center justify-center flex-1 h-16 text-center"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="map-marker-alt"
        class="w-8 h-8"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          fill="currentColor"
          d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
        ></path>
      </svg>
      <span>CHECK IN</span>
    </router-link>
    <router-link
      :to="'/account'"
      class="flex flex-col items-center justify-center flex-1 h-16 text-center"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="user-circle"
        class="w-8 h-8"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 496 512"
      >
        <path
          fill="currentColor"
          d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"
        ></path>
      </svg>
      <span class="uppercase">{{ user.username }}</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["user"])
  }
};
</script>

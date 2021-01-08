<template>
  <transition name="fade">
    <a-side ref="aside" />
  </transition>
  <div
    class="flex items-center justify-between w-full h-16 px-4 shadow-md bg-primary"
  >
    <div class="flex w-full h-16">
      <div class="flex w-full text-white">
        <div class="flex items-center justify-center">
          <img src="@/assets/logo.png" alt="" class="h-12" />
        </div>
        <div class="flex flex-col self-center">
          <h1 class="heading-2">CHECKIN</h1>
          <span class="text-xs leading-3 text-right uppercase">
            BUMI INDO MAPAN SEJAHTERA
          </span>
        </div>
      </div>
    </div>
    <button @click="$refs.aside.open()">
      <svg
        class="inline-block w-6 h-6 text-white fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import ASide from "@/components/ASide";
export default {
  components: {
    ASide
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>

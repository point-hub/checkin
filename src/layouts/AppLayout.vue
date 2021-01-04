<template>
  <div
    class="relative flex flex-col items-center justify-between w-full h-full max-w-screen-sm m-auto"
  >
    <div class="flex flex-col w-full h-full">
      <app-header></app-header>
      <div
        class="flex-1 w-full h-full overflow-y-auto scrolling-touch bg-gray-100"
      >
        <router-view />
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader.vue";
export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
AppHeader

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.content {
  background: #000;
  max-width: 500px;
  margin: 50px auto;
  position: relative;
}

.marker {
  position: absolute;
  width: 200px;
  right: 0;
}

.fixedmarker {
  background: #f00;
  color: #fff;
  position: fixed;
  width: 200px;
}
</style>

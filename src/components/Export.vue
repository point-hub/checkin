<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 opacity-75" />
  <div
    v-if="isOpen"
    class="fixed inset-0 flex flex-col items-center justify-center w-full max-w-screen-sm p-4 m-auto"
  >
    <div
      class="flex flex-col w-full max-w-screen-sm p-4 space-y-3 bg-white rounded-md"
    >
      <div class="flex items-start justify-between">
        <h2 class="uppercase heading-3">Export</h2>
        <button class="w-8 h-8 font-extrabold" @click="close()">X</button>
      </div>
      <div class="pt-4">
        <label for="date" class="text-sm uppercase">Date</label>
        <input
          type="text"
          v-model="search"
          @input="filterSearch"
          class="w-full px-4 py-2 border"
          placeholder="search"
        />
      </div>
      <div>
        <label for="user" class="text-sm uppercase">User</label>
        <input
          type="text"
          v-model="search"
          @input="filterSearch"
          class="w-full px-4 py-2 border"
          placeholder="search"
        />
      </div>
      <button class="rounded btn btn-primary">EXPORT</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 opacity-75" />
  <div
    v-if="isOpen"
    class="fixed inset-0 flex flex-col w-full max-w-screen-sm p-4 m-auto"
  >
    <div
      class="flex flex-col w-full h-full max-w-screen-sm p-4 space-y-3 bg-white rounded-md"
    >
      <div class="flex justify-between">
        <h3 class="heading-3">Delete Confirmation</h3>
        <button class="w-8 h-8 font-extrabold" @click="close()">X</button>
      </div>
      <div class="flex flex-col py-8 space-y-4">
        <div class="flex flex-col space-y-1">
          {{ textConfirmation }}
        </div>
        <div class="space-y-2">
          <button class="w-full btn btn-danger" @click="deleteGroup()">
            Delete
          </button>
          <button class="w-full border border-red-500 btn" @click="close()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      id: null,
      textConfirmation: "are you sure want to delete this data?"
    };
  },
  emits: ["deleted"],
  methods: {
    open(callback, textConfirmation) {
      this.callback = callback;
      this.textConfirmation = textConfirmation;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    deleteGroup() {
      this.$emit("deleted", this.callback);
      this.close();
    }
  }
};
</script>

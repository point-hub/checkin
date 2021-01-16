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
        <h2 class="heading-2">Create Group</h2>
        <button class="w-8 h-8 font-extrabold" @click="close()">X</button>
      </div>
      <div class="flex flex-col py-8 space-y-4">
        <div class="flex flex-col space-y-1">
          <label for="name" class="text-sm uppercase">Name</label>
          <input
            type="text"
            v-model="form.name"
            class="px-2 py-2 border border-gray-500"
          />
        </div>
        <div class="space-y-2">
          <div v-if="errorMessage" class="p-2 text-white bg-red-500">
            {{ errorMessage }}
          </div>
          <button class="w-full uppercase btn btn-primary" @click="save()">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      isOpen: false,
      errorMessage: "",
      groups: [],
      form: {
        name: ""
      }
    };
  },
  emits: ["created"],
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    async save() {
      try {
        const result = await axios.post("/groups", this.form);
        if (result.status === 201) {
          Object.assign(this.$data, this.$options.data.call(this));
          this.$emit("created");
          this.close();
        }
      } catch (error) {
        if (
          error.data.error.message.includes(
            "E11000 duplicate key error collection"
          )
        ) {
          this.errorMessage = "Please use another name";
        } else {
          this.errorMessage = error.data.error.message;
        }
      }
    }
  }
};
</script>

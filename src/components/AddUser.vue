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
        <h2 class="uppercase heading-2">Add User</h2>
        <button class="w-8 h-8 font-extrabold" @click="close()">X</button>
      </div>
      <div class="flex flex-col py-8 space-y-4">
        <div class="flex flex-col space-y-1">
          <label for="email" class="text-sm uppercase">Email</label>
          <input
            type="text"
            v-model="form.email"
            class="px-2 py-2 border border-gray-500"
          />
        </div>
        <div>
          <button
            class="w-full font-extrabold uppercase btn btn-primary"
            @click="save()"
          >
            Invite
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
      id: null,
      form: {
        email: null
      }
    };
  },
  emits: ["added"],
  methods: {
    open(id) {
      this.id = id;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    async save() {
      const result = await axios.put(
        `/groups/${this.id}/inviteUser`,
        this.form
      );
      if (result.status === 200) {
        Object.assign(this.$data, this.$options.data.call(this));
        this.$emit("added");
        this.close();
      }
    }
  }
};
</script>

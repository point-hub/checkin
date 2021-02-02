<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 opacity-75" />
  <div
    v-if="isOpen"
    class="fixed inset-0 flex flex-col w-full max-w-screen-sm p-4 m-auto"
  >
    <div
      class="flex flex-col w-full h-full max-w-screen-sm p-4 space-y-3 bg-white rounded-md"
    >
      <div class="flex items-start justify-between">
        <h2 class="uppercase heading-3">Choose User</h2>
        <button class="w-8 h-8 font-extrabold" @click="close()">X</button>
      </div>
      <div class="pt-4">
        <input
          type="text"
          v-model="search"
          class="w-full px-4 py-2 border"
          placeholder="search"
        />
      </div>
      <div class="flex flex-col pb-4 overflow-auto">
        <div class="flex" v-for="(user, index) in groupUsers" :key="index">
          <div
            @click="chooseUser(user)"
            class="flex flex-col flex-1 p-4 text-sm text-left border border-gray-200"
          >
            <span>{{ user.firstName }} {{ user.lastName }}</span>
            <span class="text-xs text-gray-500">{{ user.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isOpen: false,
      search: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["activeGroup"]),
    groupUsers() {
      const searchableKey = ["firstName", "lastName", "email"];
      return this.activeGroup.users.filter(user => {
        return (
          user.status !== "pending" &&
          searchableKey.some(key => {
            if (user[key] === undefined) return false;
            return user[key].toLowerCase().includes(this.search.toLowerCase());
          })
        );
      });
    }
  },
  emits: ["choosen"],
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    chooseUser(user) {
      this.$emit("choosen", user);
      this.close();
    }
  }
};
</script>

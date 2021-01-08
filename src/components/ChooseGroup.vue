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
        <h2 class="heading-2">Choose Group</h2>
        <button class="w-8 h-8 font-extrabold" @click="close()">X</button>
      </div>
      <div class="">
        Please choose your group below or
        <button
          href="javascript:void(0)"
          class="text-blue-500"
          @click="$refs.createGroupRef.open()"
        >
          create a new one
        </button>
      </div>
      <div class="flex flex-col py-8 space-y-4">
        <div class="flex" v-for="(group, index) in groups" :key="index">
          <button
            @click="
              $emit('choosen', group);
              close();
            "
            class="flex-1 p-2 text-sm text-left border border-gray-100 shadow"
          >
            {{ group.name }}
          </button>
          <button
            @click="$refs.renameGroupRef.open(group)"
            class="p-2 border border-gray-100 shadow flex-0"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="edit"
              class="w-5 h-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
              ></path>
            </svg>
          </button>
          <button
            @click="
              $refs.deleteConfirmationRef.open(
                group._id,
                `Are you sure want to delete ${group.name}? This action will delete all data that associate with this group`
              )
            "
            class="p-2 border border-gray-100 shadow flex-0"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="trash-alt"
              class="w-5 h-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <create-group ref="createGroupRef" @created="fetchGroups()"></create-group>
    <rename-group ref="renameGroupRef" @updated="fetchGroups()"></rename-group>
    <delete-confirmation
      ref="deleteConfirmationRef"
      @deleted="deleteGroup($event)"
    ></delete-confirmation>
  </div>
</template>

<script>
import CreateGroup from "./CreateGroup";
import RenameGroup from "./RenameGroup";
import DeleteConfirmation from "./DeleteConfirmation";
import axios from "@/axios";

export default {
  components: {
    CreateGroup,
    RenameGroup,
    DeleteConfirmation
  },
  data() {
    return {
      isOpen: false,
      groups: []
    };
  },
  emits: ["choosen"],
  methods: {
    async open() {
      this.fetchGroups();
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    async fetchGroups() {
      const result = await axios.get("/groups");
      if (result) {
        this.groups = result.data.data;
      }
      this.isOpen = true;
    },
    async deleteGroup(id) {
      const result = await axios.delete(`/groups/${id}`);
      if (result.status === 200) {
        this.fetchGroups();
      }
    }
  }
};
</script>

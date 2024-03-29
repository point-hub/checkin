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
        <h2 class="uppercase heading-3">Choose Group</h2>
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
      <div class="pt-4">
        <input
          type="text"
          v-model="search"
          @input="filterSearch"
          class="w-full px-4 py-2 border"
          placeholder="search"
        />
      </div>
      <div class="flex flex-col pb-4 overflow-auto">
        <div class="flex" v-for="(group, index) in mutableGroups" :key="index">
          <button
            @click="chooseGroup(group)"
            class="flex-1 p-4 text-sm text-left border border-gray-200"
          >
            {{ group.name }}
          </button>
          <template
            v-if="
              group.userStatus === 'active' &&
                authUser._id === group.createdBy_id
            "
          >
            <button
              @click="$refs.renameGroupRef.open(group)"
              class="px-2 py-3 border border-gray-100 shadow flex-0"
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
          </template>
          <template v-if="group.userStatus === 'pending'">
            <button
              @click="acceptInvite(group._id)"
              class="px-2 py-3 text-xs text-white bg-green-500 border border-green-500 shadow flex-0"
            >
              Accept
            </button>
            <button
              @click="declineInvite(group._id)"
              class="p-2 text-xs text-white bg-red-500 border border-red-500 shadow flex-0"
            >
              Decline
            </button>
          </template>
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
import debounce from "lodash/debounce";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    CreateGroup,
    RenameGroup,
    DeleteConfirmation
  },
  data() {
    return {
      isOpen: false,
      search: "",
      mutableGroups: []
    };
  },
  computed: {
    ...mapGetters("auth", ["groups", "authUser"])
  },
  emits: ["choosen"],
  methods: {
    ...mapActions("auth", ["loginUsingToken"]),
    async open() {
      this.fetchGroups();
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    chooseGroup(group) {
      if (group.userStatus === "active") {
        this.$emit("choosen", group);
        this.close();
      }
    },
    async fetchGroups() {
      await this.loginUsingToken();
      const searchableKey = ["name"];
      this.mutableGroups = this.groups.filter(group => {
        return searchableKey.some(key => {
          if (group[key] === undefined) return false;
          return group[key].toLowerCase().includes(this.search.toLowerCase());
        });
      });
    },
    filterSearch: debounce(function() {
      const searchableKey = ["name"];
      this.mutableGroups = this.groups.filter(group => {
        return searchableKey.some(key => {
          if (group[key] === undefined) return false;
          return group[key].toLowerCase().includes(this.search.toLowerCase());
        });
      });
    }, 500),
    async acceptInvite(id) {
      const result = await axios.put(`/groups/${id}/acceptInvite`);
      if (result.status === 200) {
        this.fetchGroups();
      }
    },
    async declineInvite(id) {
      const result = await axios.put(`/groups/${id}/declineInvite`);
      if (result.status === 200) {
        this.fetchGroups();
      }
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

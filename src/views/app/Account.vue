<template>
  <div class="flex flex-col items-center w-full h-full">
    <div class="flex flex-col w-full h-full overflow-auto">
      <div
        class="flex items-center flex-shrink-0 w-full p-2 my-1 text-gray-800"
      >
        <div class="flex flex-col flex-1 p-2 text-left">
          <div class="text-sm font-bold uppercase">
            {{ username }}
          </div>
          <div class="font-serif text-xs font-thin lowercase">
            {{ email }}
          </div>
        </div>
        <div class="mx-4">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="pen"
            class="inline-block w-4 h-4 svg-inline--fa fa-pen fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M493.25 56.26l-37.51-37.51C443.25 6.25 426.87 0 410.49 0s-32.76 6.25-45.26 18.74L12.85 371.12.15 485.34C-1.45 499.72 9.88 512 23.95 512c.89 0 1.78-.05 2.69-.15l114.14-12.61 352.48-352.48c24.99-24.99 24.99-65.51-.01-90.5zM126.09 468.68l-93.03 10.31 10.36-93.17 263.89-263.89 82.77 82.77-263.99 263.98zm344.54-344.54l-57.93 57.93-82.77-82.77 57.93-57.93c6.04-6.04 14.08-9.37 22.63-9.37 8.55 0 16.58 3.33 22.63 9.37l37.51 37.51c12.47 12.48 12.47 32.78 0 45.26z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        class="flex flex-col justify-center flex-shrink-0 w-full p-2 my-1 text-gray-800 bg-white shadow"
      >
        <div class="flex justify-between flex-1 p-2 text-left">
          <div class="flex flex-col flex-1">
            <div class="text-xs uppercase">
              Group
            </div>
            <div
              class="font-extrabold uppercase"
              @click="$refs.chooseGroupRef.open()"
            >
              <span v-if="!group.users" class="text-gray-500 opacity-50">
                CHOOSE GROUP
              </span>
              {{ group.name }}
            </div>
          </div>
          <button
            class="px-2 focus:outline-none flex-0"
            v-if="group.users"
            @click="$refs.addUserRef.open(group)"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user-plus"
              class="w-6 h-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="flex flex-col flex-1 p-2 pl-5 space-y-2 text-left font-roboto-mono"
        >
          <div class="text-xs uppercase" v-if="group.users">
            Member
          </div>
          <div
            class="flex items-center justify-between text-sm"
            v-for="(user, index) in group.users"
            :key="index"
          >
            <div class="font-bold uppercase">
              {{ index + 1 }}. {{ user.username }}
            </div>
            <button
              class="px-1"
              @click="
                $refs.deleteConfirmationRef.open(
                  { userId: user._id, groupId: group._id },
                  `Are you sure want to remove ${user.username} from group ${group.name}`
                )
              "
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="user-times"
                class="w-5 h-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M593.9 240l41.4-41.4c6.2-6.2 6.2-16.4 0-22.6L624 164.7c-6.2-6.2-16.4-6.2-22.6 0L560 206.1l-41.4-41.4c-6.2-6.2-16.4-6.2-22.6 0L484.7 176c-6.2 6.2-6.2 16.4 0 22.6l41.4 41.4-41.4 41.4c-6.2 6.2-6.2 16.4 0 22.6l11.3 11.3c6.2 6.2 16.4 6.2 22.6 0l41.4-41.4 41.4 41.4c6.2 6.2 16.4 6.2 22.6 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6L593.9 240zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96zm89.6 256c-28.8 0-42.4 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <add-user ref="addUserRef" @choosen="addedUser($event)"></add-user>
    <choose-group
      ref="chooseGroupRef"
      @choosen="updateGroup($event)"
    ></choose-group>
    <delete-confirmation
      ref="deleteConfirmationRef"
      @deleted="deleteUserGroup($event)"
    ></delete-confirmation>
  </div>
</template>

<script>
import axios from "@/axios";
import AddUser from "@/components/AddUser";
import ChooseGroup from "@/components/ChooseGroup";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default {
  components: {
    AddUser,
    ChooseGroup,
    DeleteConfirmation
  },
  data() {
    return {
      username: "",
      email: "",
      group: {}
    };
  },
  async mounted() {
    try {
      let result = await axios.get("/auth/secret");
      if (result.status === 200) {
        this.username = result.data.data.username;
        this.email = result.data.data.email;
      }
    } catch (error) {
      //
    }
  },
  methods: {
    updateGroup(group) {
      this.group = group;
    },
    async addedUser() {
      //
    },
    async deleteUserGroup(callback) {
      console.log(callback);
      try {
        const result = await axios.put(
          `/groups/${callback.groupId}/removeUser`,
          {
            userId: callback.userId
          }
        );
        if (result.status === 200) {
          this.group = result.data.updated;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

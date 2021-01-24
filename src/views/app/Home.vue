<template>
  <div class="flex flex-col items-center w-full h-full">
    <div class="flex flex-col w-full h-full p-4 overflow-auto">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="pb-2 my-2 space-y-4 bg-white rounded shadow"
      >
        <div for="photo" class="flex items-center h-12 space-x-2 shadow">
          <img src="@/assets/avatar/1.png" alt="avatar" class="w-12 h-12" />
          <div class="flex flex-col">
            <span class="text-sm font-bold">
              {{ item.user.firstName }} {{ item.user.lastName }}
            </span>
            <span class="text-xs">@{{ item.user.username }}</span>
          </div>
        </div>
        <div
          class="flex flex-col px-4 space-y-2 sm:space-y-0 sm:space-x-3 sm:flex-row"
        >
          <img :src="item.photo" class="w-full sm:w-1/3" alt="" />
          <div class="space-y-3 sm:py-0">
            <div>
              <h3 class="heading-4">Address</h3>
              <p class="text-sm">{{ item.address }}</p>
            </div>
          </div>
        </div>
        <div v-if="item.notes" class="px-4">
          <h3 class="heading-4">Notes</h3>
          <textarea
            name="notes"
            class="w-full text-sm border-0"
            readonly
            v-model="item.notes"
          ></textarea>
        </div>
      </div>
    </div>
    <Loading ref="loadingRef"></Loading>
  </div>
</template>
<script>
import axios from "@/axios";
import Loading from "@/components/Loading";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Loading
  },
  data() {
    return {
      data: []
    };
  },
  computed: {
    ...mapGetters("auth", ["activeGroup"])
  },
  updated() {
    let els = document.getElementsByTagName(`textarea`);
    for (let i = 0; i < els.length; i++) {
      els[i].style.height = `1px`;
      els[i].style.height = `${els[i].scrollHeight}px`;
    }
  },
  async mounted() {
    try {
      this.$refs.loadingRef.open();
      const result = await axios.get("/checkins", {
        params: {
          group_id: this.activeGroup._id
        }
      });
      if (result.status === 200) {
        this.data = result.data.data;
      }
    } finally {
      this.$refs.loadingRef.close();
    }
  }
};
</script>

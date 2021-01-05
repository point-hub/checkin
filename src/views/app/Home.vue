<template>
  <div class="flex flex-col items-center w-full h-full">
    <div class="flex flex-col w-full h-full p-4 overflow-auto">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="p-4 space-y-3 bg-white rounded shadow"
      >
        <div for="photo" class="heading-3">@user</div>
        <div class="flex flex-col sm:space-x-3 sm:flex-row">
          <img :src="item.photo" class="w-full h-40 sm:w-1/3" alt="" />
          <div class="py-3 space-y-3 sm:py-0">
            <div>
              <h3 class="heading-4">Location :</h3>
              <p class="text-sm">{{ item.lat }}, {{ item.lng }}</p>
            </div>
            <div>
              <h3 class="heading-4">Address :</h3>
              <p class="text-sm">{{ item.address }}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="heading-4">Notes :</h3>
          <textarea
            name="notes"
            class="w-full p-2 text-sm border"
            readonly
            rows="8"
            v-model="item.notes"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      data: []
    };
  },
  async mounted() {
    const result = await axios.get("/checkins");
    if (result.status === 200) {
      this.data = result.data.data;
    }
  }
};
</script>

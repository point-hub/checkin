<template>
  <div class="flex flex-col items-center w-full h-full">
    <div class="flex justify-between w-full p-4">
      <div></div>
      <div class="flex space-x-3">
        <button
          class="px-2 py-1 text-sm text-gray-100 bg-red-500 rounded"
          @click="$refs.filterRef.open()"
        >
          FILTER
        </button>
        <button
          class="px-2 py-1 text-sm text-gray-100 bg-blue-500 rounded"
          @click="exportData"
        >
          EXPORT
        </button>
        <button @click="isListView = true">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="window-maximize"
            class="w-5 h-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V192h448v240zM32 160V80c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v80H32z"
            ></path>
          </svg>
        </button>
        <button @click="isListView = false">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="table"
            class="w-5 h-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM160 448H48c-8.837 0-16-7.163-16-16v-80h128v96zm0-128H32v-96h128v96zm0-128H32V96h128v96zm160 256H192v-96h128v96zm0-128H192v-96h128v96zm0-128H192V96h128v96zm160 160v80c0 8.837-7.163 16-16 16H352v-96h128zm0-32H352v-96h128v96zm0-128H352V96h128v96z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="flex flex-col w-full h-full px-4 overflow-auto">
      <template v-if="isListView">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="pb-2 my-2 space-y-4 bg-white rounded shadow"
        >
          <div for="photo" class="flex items-center h-12 space-x-2 shadow">
            <img src="@/assets/avatar/1.png" alt="avatar" class="w-12 h-12" />
            <div class="flex justify-between w-full">
              <div class="flex flex-col">
                <span class="text-sm font-bold">
                  {{ item.user.firstName }} {{ item.user.lastName }}
                </span>
                <span class="text-xs">@{{ item.user.username }}</span>
              </div>
              <div class="flex flex-col justify-center mr-4 text-xs text-right">
                <div class="font-bold uppercase">
                  {{ dayjs(item.createdAt).format("DD MMM YYYY") }}
                </div>
                <div class="text-gray-500">
                  {{ dayjs(item.createdAt).format("HH:mm") }}
                </div>
              </div>
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
      </template>
      <template v-else>
        <table class="">
          <thead>
            <tr>
              <td class="p-2">#</td>
              <td class="p-2">Date</td>
              <td class="p-2">User</td>
              <td class="p-2">Address</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <td class="p-2 whitespace-nowrap">{{ index + 1 }}</td>
              <td class="p-2 whitespace-nowrap">
                {{ dayjs(item.createdAt).format("DD MMM YYYY HH:mm") }}
              </td>
              <td class="p-2 whitespace-nowrap">
                {{ item.user.firstName }} {{ item.user.lastName }}
              </td>
              <td class="p-2 whitespace-nowrap">{{ item.address }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <Loading ref="loadingRef"></Loading>
    <Filter ref="filterRef" @submitted="onFilter"></Filter>
    <Export ref="exportRef"></Export>
    <Subscribe ref="subscribeRef"></Subscribe>
  </div>
</template>
<script>
import axios from "@/axios";
import Loading from "@/components/Loading";
import Export from "@/components/Export";
import Filter from "@/components/Filter";
import Subscribe from "@/components/Subscribe";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default {
  name: "Home",
  components: {
    Loading,
    Export,
    Filter,
    Subscribe
  },
  data() {
    return {
      data: [],
      filter: {
        dateFrom: dayjs().startOf("month"),
        dateTo: dayjs().endOf("month"),
        user: {
          username: null
        }
      },
      isListView: true,
      isSubscribed: false
    };
  },
  computed: {
    ...mapGetters("auth", ["activeGroup"])
  },
  async mounted() {
    dayjs.extend(customParseFormat);
    await this.getData();
  },
  updated() {
    let els = document.getElementsByTagName(`textarea`);
    for (let i = 0; i < els.length; i++) {
      els[i].style.height = `1px`;
      els[i].style.height = `${els[i].scrollHeight}px`;
    }
  },
  methods: {
    dayjs: dayjs,
    async getData() {
      try {
        dayjs.extend(customParseFormat);
        this.$refs.loadingRef.open();
        const result = await axios.get("/checkins", {
          params: {
            filter: {
              group_id: this.activeGroup._id,
              createdAt: {
                ":gte": this.filter.dateFrom,
                ":lte": this.filter.dateTo
              },
              "user.username": this.filter.user?.username ?? null
            }
          }
        });
        this.data = result.data.data;
      } finally {
        this.$refs.loadingRef.close();
      }
    },
    exportData() {
      if (this.isSubscribed) {
        this.$refs.exportRef.open();
      } else {
        this.$refs.subscribeRef.open();
      }
    },
    onFilter(filter) {
      this.filter = filter;
      this.getData();
    }
  }
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 opacity-75" />
  <div
    v-if="isOpen"
    class="fixed inset-0 flex flex-col items-center justify-center w-full max-w-screen-sm p-4 m-auto"
  >
    <div
      class="flex flex-col w-full max-w-screen-sm p-4 space-y-3 bg-white rounded-md"
    >
      <div class="flex items-start justify-between">
        <h2 class="uppercase heading-3">Filter</h2>
        <button class="w-8 h-8 font-extrabold" @click="close()">X</button>
      </div>
      <div class="pt-4">
        <label for="date" class="text-sm uppercase">Date</label>
        <div class="flex">
          <select
            name="month"
            id="month"
            class="flex-1 p-4 uppercase border"
            v-model="month"
          >
            <template v-for="(i, index) in months" :key="i">
              <option
                :value="index"
                v-if="new Date().getMonth() === index"
                selected
              >
                {{ i }}
              </option>
              <option :value="index" v-else>
                {{ i }}
              </option>
            </template>
          </select>
          <select name="year" id="year" class="p-4 border" v-model="year">
            <template v-for="i in years" :key="i">
              <option :value="i" v-if="new Date().getFullYear() === i" selected>
                {{ i }}
              </option>
              <option :value="i" v-else>
                {{ i }}
              </option>
            </template>
          </select>
        </div>
      </div>
      <div>
        <label for="user" class="text-sm uppercase">User</label>
        <div
          type="text"
          readonly
          class="flex justify-between w-full border"
          @choosen="onChooseUser"
        >
          <div
            class="flex flex-col flex-1 px-4 py-2"
            @click="$refs.chooseUserRef.open()"
          >
            <span>{{ user?.firstName }} {{ user?.lastName }} &nbsp;</span>
            <span class="text-xs text-gray-500">{{ user?.email }}</span>
          </div>
          <button
            v-if="user !== null"
            class="px-4 font-extrabold text-gray-300"
            @click="user = null"
          >
            X
          </button>
        </div>
      </div>
      <button class="rounded btn btn-primary" @click="submit()">
        USE FILTER
      </button>
    </div>
  </div>
  <choose-user ref="chooseUserRef" @choosen="onChooseUser"></choose-user>
</template>

<script>
import ChooseUser from "./ChooseUser";
import dayjs from "dayjs";
import range from "lodash/range";

export default {
  components: {
    ChooseUser
  },
  data() {
    return {
      isOpen: false,
      user: {
        username: null
      },
      months: [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ],
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    };
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      return range(currentYear - 10, currentYear + 1);
    }
  },
  emits: ["submitted"],
  methods: {
    dayjs: dayjs,
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    onChooseUser(user) {
      this.user = user;
    },
    submit() {
      this.$emit("submitted", {
        user: this.user,
        dateFrom: dayjs()
          .year(this.year)
          .month(this.month)
          .startOf("month"),
        dateTo: dayjs()
          .year(this.year)
          .month(this.month)
          .endOf("month")
      });
      this.close();
    }
  }
};
</script>

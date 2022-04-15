<template>
  <div class="flex flex-col items-center w-full h-full p-4">
    <div class="flex flex-col w-full h-full overflow-auto">
      <div class="flex flex-col max-w-screen-sm space-y-3 rounded-xl">
        <div>
          <label for="photo" class="heading-3">Photo</label>
          <point-camera :image="form.photo" @onCaptured="onCaptured($event)" />
        </div>
        <div>
          <label for="location" class="heading-3">Location</label>
          <div id="map" class="w-full h-64"></div>
        </div>
        <div>
          <label for="notes" class="heading-3">Notes</label>
          <textarea
            @input="autosize"
            id="notes"
            class="w-full p-2 mt-2"
            v-model="form.notes"
          ></textarea>
        </div>
        <p class="text-xs font-bold text-red-700" v-if="errorMessage">
          {{ errorMessage }}
        </p>
        <button
          class="w-full p-2 mt-4 font-bold text-white uppercase rounded-md bg-primary"
          @click="save()"
        >
          submit
        </button>
      </div>
    </div>
    <Loading ref="loadingRef"></Loading>
  </div>
</template>

<script>
import PointCamera from "@/components/PointCamera";
import Loading from "@/components/Loading";
import axios from "@/axios";
import { mapGetters } from "vuex";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  components: {
    PointCamera,
    Loading
  },
  data() {
    return {
      errorMessage: null,
      form: {
        photo: null,
        lat: 0,
        lng: 0,
        notes: null
      }
    };
  },
  computed: {
    ...mapGetters("auth", ["activeGroup"])
  },
  mounted() {
    let self = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(self.form);
      self.form.lat = position.coords.latitude;
      self.form.lng = position.coords.longitude;

      console.log(self.form);
      var map = L.map("map", {
        center: [self.form.lat, self.form.lng],
        zoom: 20
      });

      var myIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
        iconSize: [20, 30]
      });

      L.marker([self.form.lat, self.form.lng], {
        icon: myIcon
      }).addTo(map);

      // add the OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);
    });

    this.autosize();
  },
  methods: {
    autosize() {
      let el = document.getElementById(`notes`);
      el.style.height = `1px`;
      el.style.height = `${el.scrollHeight}px`;
    },
    async save() {
      try {
        this.$refs.loadingRef.open();
        console.log(this.form);
        const result = await axios.post("/checkins", {
          ...this.form,
          group_id: this.activeGroup._id
        });
        if (result.status === 201) {
          this.form = {};
          this.$router.push("/");
        }
        this.$refs.loadingRef.close();
      } catch (error) {
        console.log(error);
        if (!error.response) {
          this.errorMessage =
            "Network error, please check your internet connection";
        }
        this.$refs.loadingRef.close();
      }
    },
    choosenAddress(choosenAddress) {
      this.form.address = choosenAddress.address;
    },
    // Point Camera
    onCaptured(value) {
      this.form.photo = value;
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center w-full h-full p-4">
    <div class="flex flex-col w-full h-full overflow-auto">
      <div class="flex flex-col max-w-screen-sm space-y-3 rounded-xl">
        <div>
          <label for="photo" class="heading-3">Photo</label>
          <point-camera :image="form.image" @onCaptured="onCaptured($event)" />
        </div>
        <div>
          <label for="location" class="heading-3">Location</label>
          <vue-google-maps
            @google-map-updated="onGoogleMapUpdated"
            style="width: 100%; height: 300px"
            :map-config="mapConfig"
            :api-key="apiKey"
            :libraries="mapLibraries"
            class="border border-gray-200"
          ></vue-google-maps>
        </div>
        <div>
          <label for="address" class="heading-3">Address</label>
          <input type="text" class="w-full p-2 mt-2" v-model="form.address" />
        </div>
        <div>
          <label for="notes" class="heading-3">Notes</label>
          <textarea
            rows="10"
            class="w-full p-2 mt-2"
            v-model="form.notes"
          ></textarea>
        </div>
        <button
          class="w-full p-2 mt-4 font-bold text-white uppercase rounded-md bg-primary"
          @click="save()"
        >
          submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PointCamera from "@/components/PointCamera";
import VueGoogleMaps from "@point-hub/vue-google-maps";

export default {
  components: {
    PointCamera,
    VueGoogleMaps
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_GMAP_API_KEY,
      mapConfig: {
        zoom: 16,
        center: {
          lat: -7,
          lng: 112
        },
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
        styles: [
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off"
              }
            ]
          }
        ]
      },
      mapLibraries: ["places"],
      map: null,
      google: null,
      geocoder: null,
      autocomplete: null,
      infoWindow: null,
      marker: null,
      form: {
        image: null,
        lat: null,
        lng: null,
        address: null,
        notes: null
      }
    };
  },
  methods: {
    save() {
      // saving
    },
    // Vue Google Maps
    choosenAddress(choosenAddress) {
      this.form.address = choosenAddress.address;
    },
    getGeocode() {
      this.geocoder.geocode(
        { location: this.marker.position },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              this.form.address = results[0].formatted_address;
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        }
      );
    },
    onGoogleMapUpdated(googleMap) {
      this.map = googleMap.map;
      this.google = googleMap.google;

      // eslint-disable-next-line no-undef
      this.infoWindow = new google.maps.InfoWindow();
      this.infoWindow.open(this.map);

      // eslint-disable-next-line no-undef
      this.geocoder = new google.maps.Geocoder();

      const input = document.getElementById("search");
      // eslint-disable-next-line no-undef
      this.autocomplete = new google.maps.places.Autocomplete(input);

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      this.autocomplete.bindTo("bounds", this.map);

      this.autocomplete.addListener("place_changed", () => {
        var place = this.autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
          this.map.setZoom(17);
        }
        this.marker.setPosition(place.geometry.location);
        this.marker.setVisible(true);

        if (place.formatted_address) {
          this.form.address = place.formatted_address;
          this.form.lat = place.geometry.location.lat();
          this.form.lng = place.geometry.location.lng();
        }
      });

      const vm = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.myPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.form.lat = position.coords.latitude;
            this.form.lng = position.coords.longitude;

            const { Marker } = this.google.maps;
            this.marker = new Marker({
              position: this.myPosition,
              map: this.map,
              draggable: true,
              animation: this.google.maps.Animation.DROP,
              title: "Current Position"
            });
            this.getGeocode();
            // eslint-disable-next-line no-undef
            google.maps.event.addListener(this.marker, "dragend", function(
              evt
            ) {
              vm.form.lat = evt.latLng.lat();
              vm.form.lng = evt.latLng.lng();
              vm.getGeocode();
            });

            this.map.panTo(this.marker.position);
          },
          () => {
            this.handleLocationError(false);
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false);
      }
    },
    handleLocationError(browserHasGeolocation) {
      this.infoWindow.setPosition(this.map.getCenter());
      this.infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      this.infoWindow.open(this.map);
    },
    // Point Camera
    onCaptured(value) {
      this.form.image = value;
    }
  }
};
</script>

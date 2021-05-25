<template>
  <div class="flex flex-col items-center w-full h-full">
    <div class="flex flex-col w-full h-full overflow-auto">
      <div
        class="flex flex-col justify-center flex-shrink-0 w-full p-2 my-1 text-gray-800 bg-white shadow"
      >
        <div class="flex flex-col flex-1 p-2 pl-5 space-y-2 text-left">
          <div
            class="flex flex-col items-center justify-between py-3 space-y-3 text-lg"
          >
            <div class="flex items-center justify-between w-full">
              <router-link
                to="/guide/how-to-verify-email"
                class="text-gray-800"
              >
                Cara verifikasi email
              </router-link>
            </div>
            <hr class="w-full text-gray-500" />
            <div class="flex items-center justify-between w-full">
              <router-link
                to="/guide/how-to-create-group"
                class="text-gray-800"
              >
                Cara membuat grup baru
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

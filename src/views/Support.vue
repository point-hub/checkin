<template>
  <div class="flex flex-col h-full m-4">
    <div class="inline-flex items-center my-4">
      <router-link to="/auth/login">
        <svg
          class="w-6 h-6 fill-current "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path
            d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
          />
        </svg>
      </router-link>
      <h1 class="uppercase">
        Support
      </h1>
    </div>
    <div class="p-4 mb-4 text-sm text-gray-700 bg-gray-100 rounded-md">
      <a
        href="https://www.pointhr.net"
        class="text-xl font-extrabold hover:text-gray-800"
      >
        POINT HR
      </a>
      <hr class="my-2" />
      <ul class="mb-6">
        <li class="flex items-center mb-2">
          <div class="mr-4 text-gray-700">
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
              ></path>
            </svg>
          </div>
          <div>Jl. Musi no 21, Surabaya, Indonesia</div>
        </li>
        <li class="flex items-center mb-2">
          <div class="mr-4 text-gray-700">
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
              ></path>
            </svg>
          </div>
          <div>
            <a href="mailto:info@pointhr.net" class="hover:text-gray-700">
              info@pointhr.net
            </a>
          </div>
        </li>
        <li class="flex items-center mb-2">
          <div class="mr-4 text-gray-700">
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
              ></path>
            </svg>
          </div>
          <div>
            <a href="tel:+628113399578" class="hover:text-gray-700"
              >(+62) 811-3399-578</a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

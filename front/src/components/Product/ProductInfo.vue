<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div
          class="p-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-white-700"
        >
          <label
            for="image"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Select an option</label
          >
          <div>
            <img :src="uploadFile" />
          </div>
        </div>
        <div
          id="imagelist"
          class="relative max-h-96 overflow-y-scroll sm:rounded-lg"
        >
          <table
            v-if="imglist.length !== 0"
            class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="text-center py-3 px-6">시간</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="image in imglist"
                :key="image.idx"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                >
                  {{ image["createdAt"] }}
                  <button
                    v-on:click="viewImage(image)"
                    class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                  >
                    <span
                      class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                    >
                      확인
                    </span>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  components: {},
  data() {
    return {
      imglist: {},
      uploadFile: "",
    };
  },
  mounted() {
    this.getImageFile();
  },
  methods: {
    getImageFile() {
      this.$axios
        .get("/images/api/view", {})
        .then((res) => {
          this.imglist = res.data.imglist;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewImage(imageInfo) {
      this.uploadFile = this.arrayBufferToBase64(imageInfo["imgdata"]["data"]);
    },
    arrayBufferToBase64(buffer) {
      var mime;
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      if (len < 4) return null;
      var b0 = bytes[0];
      var b1 = bytes[1];
      var b2 = bytes[2];
      var b3 = bytes[3];
      if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4e && b3 == 0x47)
        mime = "image/png";
      else if (b0 == 0xff && b1 == 0xd8) mime = "image/jpeg";
      else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46) mime = "image/gif";
      else return null;
      var binary = "";
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var base64 = window.btoa(binary);
      return "data:" + mime + ";base64," + base64;
    },
  },
};
</script>

<template>
  <html :class="{ dark: true }">
    <div
      class="g-white dark:bg-gray-800 h-screen overflow-y-scroll scrollbar-hide"
    >
      <div class="flex dark:bg-gray-800 scrollbar-hide">
        <Navbar></Navbar>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </html>
</template>

<script>
import Navbar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({}),
  methods: {},
  mounted() {},
};
</script>

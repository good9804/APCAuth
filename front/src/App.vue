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
        <AlertTool></AlertTool>
      </div>
    </div>
  </html>
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import AlertTool from "@/components/Alert/AlertTool.vue";

export default {
  name: "App",
  components: {
    Navbar,
    AlertTool,
  },
  data: () => ({}),
  methods: {
    // [실시간 이벤트 버스 알림 받기 함수 정의 실시]
    eventMethod: function (name) {
      console.log("");
      console.log("[App] : [eventMethod] : [start]");
      console.log("name : " + name);
      console.log("");
    },
  },
  mounted() {
    console.log("");
    console.log("[App] : [mounted] : [start]");
    console.log("설 명 : DOM 렌더링 완료");
    console.log("");

    // [이벤트 버스 알림 받기 등록]
    this.$emitter.on("eventMethod", this.eventMethod);
  },
};
</script>

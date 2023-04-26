import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "./index.css";
import axios from "axios";
import store from "./store/index";
import mitts from "mitt"; // [mitt]]
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

const app = createApp(App).use(router, store, mitts);

const emitter = mitts();

app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$router = router;
app.config.globalProperties.$store = store;

app.component("DatePicker", DatePicker);

app.mount("#app");

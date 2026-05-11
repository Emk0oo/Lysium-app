import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Design System NSLysium
import "./assets/styles/design-system.css";

createApp(App).use(router).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./index.css";

// Create Vue app instance
const app = createApp(App);

// Use the router
app.use(router);

// Mount the app
app.mount("#app");

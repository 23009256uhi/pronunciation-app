import { createRouter, createWebHistory } from "vue-router";
// import HomePage from "./pages/HomePage.vue";
import HomePage from "../pages/HomePage.vue";
import ConversationPage from "@/pages/ConversationPage.vue";
import SearchResultsPage from "@/pages/SearchResultsPage.vue";
import PracticeWordPage from "@/pages/PracticeWordPage.vue";
import AboutPage from "@/pages/AboutPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/search/:word", component: SearchResultsPage },
  { path: "/conversation", component: ConversationPage },
  { path: "/practice", component: PracticeWordPage },
  { path: "/about", component: AboutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

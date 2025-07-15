import { createRouter, createWebHistory } from "vue-router";
import ChatRoom from "../components/ChatRoom.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../App.vue"),
  },
  {
    path: "/room/:roomId",
    name: "ChatRoom",
    component: ChatRoom,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

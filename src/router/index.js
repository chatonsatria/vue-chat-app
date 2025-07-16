import { createRouter, createWebHistory } from "vue-router";
import ChatRoom from "../components/ChatRoom.vue";
import { useChatStore } from "@/stores/chat";

const routes = [
  {
    path: "/",
    name: "Home",
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

router.beforeEach((to, from, next) => {
  if (to.name === "ChatRoom") {
    const chatStore = useChatStore();
    const roomExists = chatStore.rooms.some(
      (room) => room.room_id === to.params.roomId
    );

    if (!roomExists) {
      next("/");
      return;
    }
  }
  next();
});

export default router;

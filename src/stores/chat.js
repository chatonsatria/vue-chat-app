import { defineStore } from "pinia";
import { rooms } from "../data/rooms";
import { messages } from "../data/messages";

export const useChatStore = defineStore("chat", {
  state: () => ({
    rooms: [...rooms],
    currentRoomId: null,
    messages: { ...messages },
  }),
  getters: {
    currentRoom: (state) => {
      return state.rooms.find((room) => room.room_id === state.currentRoomId);
    },
    currentMessages: (state) => {
      return state.messages[state.currentRoomId] || [];
    },
    unreadCount: (state) => {
      return state.rooms.filter((room) => room.is_waiting).length;
    },
  },
  actions: {
    setCurrentRoom(roomId) {
      this.currentRoomId = roomId;
      // mark as read
      const room = this.rooms.find((r) => r.room_id === roomId);
      if (room) {
        room.is_waiting = false;
      }
    },
    sendMessage(text) {
      if (!this.currentRoomId) return;
      // last message as admin
      const newMessage = {
        id: Date.now(),
        sender: "admin",
        text: text,
        timestamp: new Date().toISOString(),
        avatar: "https://latest-multichannel.qiscus.com/img/default_avatar.svg",
      };

      if (!this.messages[this.currentRoomId]) {
        this.messages[this.currentRoomId] = [];
      }

      this.messages[this.currentRoomId].push(newMessage);

      // update last room message
      const room = this.rooms.find((r) => r.room_id === this.currentRoomId);
      if (room) {
        room.last_comment_sender = "admin";
        room.last_comment_text = text;
        room.last_comment_timestamp = newMessage.timestamp;
      }
    },
  },
});

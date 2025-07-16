import { defineStore } from "pinia";
import { rooms } from "../data/rooms";
import { messages } from "../data/messages";

// id: 2,
// sender: "system",
// text: "agent test joined this conversation",
// timestamp: "2025-04-23T03:51:15Z",
// avatar: "https://latest-multichannel.qiscus.com/img/default_avatar.svg",

rooms.forEach((room) => {
  // console.log("room", room.last_comment_text);
  // console.log("Object.keys(messages)", Object.keys(messages));
  console.log(
    "Object.keys(messages).find((key) => key === room.room_id",
    Object.keys(messages).find((key) => key === room.room_id)
  );

  messages[room.room_id] = [
    {
      id: Math.floor(Math.random() * 1000000),
      sender: room.last_comment_sender_type,
      text: room.last_comment_text,
      timestamp: room.last_comment_timestamp,
      avatar: room.user_avatar_url,
    },
    ...(Object.keys(messages).find((key) => key === room.room_id)
      ? messages[room.room_id]
      : []),
  ];

  // if (
  //   typeof window !== "undefined" &&
  //   Object.keys(messages).find((key) => key === room.room_id)
  // ) {
  //   console.log("jalan 2");

  //   // console.log(
  //   //   "message",
  //   //   (messages[room.room_id] = [
  //   //     {
  //   //       id: Math.floor(Math.random() * 1000000),
  //   //       sender: room.last_comment_sender_type,
  //   //       text: room.last_comment_text,
  //   //       timestamp: room.last_comment_timestamp,
  //   //       avatar: room.user_avatar_url,
  //   //     },
  //   //     ...messages[room.room_id],
  //   //   ])
  //   // );

  //   messages[room.room_id] = [
  //     {
  //       id: Math.floor(Math.random() * 1000000),
  //       sender: room.last_comment_sender_type,
  //       text: room.last_comment_text,
  //       timestamp: room.last_comment_timestamp,
  //       avatar: room.user_avatar_url,
  //     },
  //     ...(Object.keys(messages).find((key) => key === room.room_id) &&
  //       messages[room.room_id]),
  //   ];
  // } else {
  //   messages[room.room_id] = [
  //     {
  //       id: Math.floor(Math.random() * 1000000),
  //       sender: room.last_comment_sender_type,
  //       text: room.last_comment_text,
  //       timestamp: room.last_comment_timestamp,
  //       avatar: room.user_avatar_url,
  //     },
  //   ];
  // }
});

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

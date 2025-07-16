<template>
  <div class="app-container">
    <div class="sidebar">
      <div class="header">
        <h2>Chat Rooms</h2>
        <div class="badge" v-if="unreadCount > 0">{{ unreadCount }}</div>
      </div>
      <RoomList />
    </div>
    <router-view />
    <!-- <ChatRoom /> -->
  </div>
</template>

<script>
import { computed } from 'vue';
import { useChatStore } from './stores/chat';
import RoomList from './components/RoomList.vue';
// import ChatRoom from './components/ChatRoom.vue';

export default {
  components: {
    RoomList,
    // ChatRoom
  },
  setup() {
    const chatStore = useChatStore();
    const unreadCount = computed(() => chatStore.unreadCount);

    return {
      unreadCount
    };
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.sidebar {
  width: 300px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.header h2 {
  font-size: 1.2em;
}

.badge {
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
}
</style>
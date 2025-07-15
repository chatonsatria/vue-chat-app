<template>
    <div class="chat-room">
        <div v-if="currentRoom" class="chat-header">
            <img :src="currentRoom.user_avatar_url" class="avatar" />
            <div class="room-info">
                <div class="room-name">{{ currentRoom.name }}</div>
                <div class="room-status">{{ roomStatus }}</div>
            </div>
        </div>
        <div v-else class="chat-header empty">
            Select a chat room
        </div>

        <MessageList v-if="currentRoom" />
        <div v-else class="empty-chat">
            Please select a chat room from the list
        </div>

        <MessageInput v-if="currentRoom" />
    </div>
</template>

<script>
import { computed } from 'vue';
import { useChatStore } from '../stores/chat';
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';

export default {
    components: {
        MessageList,
        MessageInput
    },
    setup() {
        const chatStore = useChatStore();

        const currentRoom = computed(() => chatStore.currentRoom);

        const roomStatus = computed(() => {
            if (!currentRoom.value) return '';
            return currentRoom.value.is_waiting ? 'Waiting for response' : 'Active';
        });

        return {
            currentRoom,
            roomStatus
        };
    }
};
</script>

<style scoped>
.chat-room {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.chat-header {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #ddd;
    background-color: white;
}

.chat-header.empty {
    justify-content: center;
    color: #666;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
}

.room-info {
    flex: 1;
}

.room-name {
    font-weight: 500;
}

.room-status {
    font-size: 0.8em;
    color: #666;
}

.empty-chat {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    background-color: #f9f9f9;
}
</style>
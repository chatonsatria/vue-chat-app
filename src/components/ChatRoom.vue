<template>
    <div v-if="error" class="error-message">
        Room not found. <router-link to="/">Back to home</router-link>
    </div>
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
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useChatStore } from '../stores/chat';
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';

export default {
    components: {
        MessageList,
        MessageInput
    },
    props: {
        roomId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const error = ref(false)
        const route = useRoute()
        const chatStore = useChatStore()

        const checkRoomExists = (roomId) => {
            return chatStore.rooms.some(room => room.room_id === roomId)
        }

        onMounted(() => {
            if (props.roomId && !checkRoomExists(props.roomId)) {
                error.value = true
            } else if (props.roomId) {
                chatStore.setCurrentRoom(props.roomId)
            }
        })

        watch(() => route.params.roomId, (newRoomId) => {
            if (newRoomId && !checkRoomExists(newRoomId)) {
                error.value = true
            } else if (newRoomId) {
                error.value = false
                chatStore.setCurrentRoom(newRoomId)
            }
        })

        // Set room saat komponen dibuat
        onMounted(() => {
            if (props.roomId) {
                chatStore.setCurrentRoom(props.roomId)
            }
        })

        // Handle perubahan route
        watch(() => route.params.roomId, (newRoomId) => {
            if (newRoomId) {
                chatStore.setCurrentRoom(newRoomId)
            }
        })

        const currentRoom = computed(() => chatStore.currentRoom);

        const roomStatus = computed(() => {
            if (!currentRoom.value) return '';
            return currentRoom.value.is_waiting ? 'Waiting for response' : 'Active';
        });

        return {
            error,
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
<template>
    <div class="room-list">
        <div v-for="room in rooms" :key="room.room_id" class="room-item"
            :class="{ active: currentRoomId === room.room_id, unread: room.is_waiting && room.last_comment_sender_type !== 'admin' | 'system' }"
            @click="selectRoom(room.room_id)">
            <img :src="room.user_avatar_url" class="avatar" />
            <div class="room-info">
                <div class="room-name">{{ room.name }}</div>
                <div class="last-message">{{ messages[room.room_id].at(-1).text ||
                    messages[room.room_id].at(-1).item?.detail }}</div>
            </div>
            <div class="room-meta">
                <div class="timestamp">{{ formatRelativeDate(room.last_comment_timestamp, 1) }}</div>
                <div v-if="room.is_waiting && room.last_comment_sender_type !== 'admin' | 'system'" class="badge"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useChatStore } from '../stores/chat';
import { formatRelativeDate } from '@/utils/FormatDate';

export default {
    setup() {
        const chatStore = useChatStore();

        const rooms = computed(() => chatStore.rooms);
        const messages = chatStore.messages
        console.log("rooms", rooms);
        console.log("messages", messages);


        const currentRoomId = computed(() => chatStore.currentRoomId);

        const selectRoom = (roomId) => {
            console.log("selected room:", roomId);
            chatStore.setCurrentRoom(roomId);
        };

        return {
            rooms,
            currentRoomId,
            messages,
            selectRoom,
            formatRelativeDate
        };
    }
};
</script>

<style scoped>
.room-list {
    overflow-y: auto;
    height: 100%;
}

.room-item {
    display: flex;
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    align-items: center;
}

.room-item:hover {
    background-color: #f5f5f5;
}

.room-item.active {
    background-color: #e3f2fd;
}

.room-item.unread {
    font-weight: bold;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
}

.room-info {
    flex: 1;
    min-width: 0;
}

.room-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.last-message {
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.room-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: 12px;
}

.timestamp {
    font-size: 10px;
    color: #999;
}

.badge {
    width: 8px;
    height: 8px;
    background-color: #4caf50;
    border-radius: 50%;
    margin-top: 4px;
}
</style>
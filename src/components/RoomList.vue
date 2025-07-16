<template>
    <div class="room-list">
        <div v-for="room in rooms" :key="room.room_id" class="room-item"
            :class="{ active: currentRoomId === room.room_id, unread: room.is_waiting }"
            @click="selectRoom(room.room_id)">
            <img :src="room.user_avatar_url" class="avatar" />
            <div class="room-info">
                <div class="room-name">{{ room.name }}</div>
                <div class="last-message">{{ room.last_comment_text }}</div>
            </div>
            <div class="room-meta">
                <div class="timestamp">{{ formatRelativeDate(room.last_comment_timestamp) }}</div>
                <div v-if="room.is_waiting" class="badge"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import { useChatStore } from '../stores/chat';

export default {
    setup() {
        const router = useRouter()
        const chatStore = useChatStore();

        const selectRoom = (roomId) => {
            chatStore.setCurrentRoom(roomId)
            router.push(`/room/${roomId}`)
        }

        // const formatDate = (dateString) => {
        //     const date = new Date(dateString);
        //     return date.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' });
        // };

        const formatRelativeDate = (dateString) => {
            const date = new Date(dateString);
            const now = new Date();
            const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

            // For future dates
            if (date > now) {
                return date.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            }

            // For recent dates
            switch (diffInDays) {
                case 0:
                    return 'Today at ' + date.toLocaleTimeString('id-ID');
                case 1:
                    return 'Yesterday at ' + date.toLocaleTimeString('id-ID');
                case 2:
                    return '2 days ago';
                case 3:
                    return '3 days ago';
                case 4:
                case 5:
                case 6:
                    return `${diffInDays} days ago`;
                default:
                    if (diffInDays < 7) {
                        return date.toLocaleDateString('id-ID', { weekday: 'long' });
                    } else if (date.getFullYear() === now.getFullYear()) {
                        return date.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long'
                        });
                    } else {
                        return date.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });
                    }
            }
        };

        const rooms = computed(() => chatStore.rooms);
        const currentRoomId = computed(() => chatStore.currentRoomId);

        return {
            rooms,
            currentRoomId,
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
    font-size: 0.8em;
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
    font-size: 0.7em;
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
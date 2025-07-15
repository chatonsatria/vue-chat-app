<template>
    <div class="message-list">
        <div v-for="message in messages" :key="message.id" class="message"
            :class="!['admin', 'system'].includes(message.sender) ? 'customer' : message.sender">
            <img v-if="message.sender !== 'admin'" :src="message.avatar" class="avatar" />
            <div class="message-content">
                <div class="message-text">{{ message.text }}</div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
            <img v-if="message.sender === 'admin'" :src="message.avatar" class="avatar" />
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useChatStore } from '../stores/chat';

export default {
    setup() {
        const chatStore = useChatStore();

        const messages = computed(() => chatStore.currentMessages);
        console.log("sender:", messages.value);


        const formatTime = (timestamp) => {
            const date = new Date(timestamp);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        return {
            messages,
            formatTime
        };
    }
};
</script>

<style scoped>
.message-list {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background-color: #f9f9f9;
    padding-inline: 0%;
    transition: width 2s ease-in-out 1s;

    @media screen and (min-width: 1000px) {
        padding-inline: 10%;
    }
}

.message {
    display: flex;
    margin-bottom: 16px;
    align-items: flex-end;
}

.message.system {
    justify-content: center;
}

.message.system .message-content {
    background-color: #e0e0e0;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8em;
    color: #555;
}

.message.customer {
    flex-direction: row;
}

.message.admin {
    flex-direction: row-reverse;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0 8px;
}

.message-content {
    max-width: 70%;
    padding: 8px 12px;
    border-radius: 12px;
    position: relative;
}

.message.customer .message-content {
    background-color: #e3f2fd;
    margin-left: 8px;
}

.message.admin .message-content {
    background-color: #4caf50;
    color: white;
    margin-right: 8px;
}

.message-text {
    word-wrap: break-word;
}

.message-time {
    font-size: 0.7em;
    text-align: right;
    margin-top: 4px;
    opacity: 0.7;
}
</style>
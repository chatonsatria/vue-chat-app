<template>
    <div class="message-input">
        <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useChatStore } from '../stores/chat';

export default {
    setup() {
        const chatStore = useChatStore();
        const messageText = ref('');

        const sendMessage = () => {
            if (messageText.value.trim() === '') return;
            chatStore.sendMessage(messageText.value);
            messageText.value = '';
        };

        return {
            messageText,
            sendMessage
        };
    }
};
</script>

<style scoped>
.message-input {
    display: flex;
    padding: 12px;
    border-top: 1px solid #ddd;
    background-color: white;
}

.message-input input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
}

.message-input button {
    margin-left: 8px;
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.message-input button:hover {
    background-color: #388e3c;
}
</style>
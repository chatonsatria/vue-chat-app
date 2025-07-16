<template>
    <div ref="messageList" class="message-list">
        <div v-for="group in groupedMessages" :key="group.date">
            <div class="separator">{{ group.dateLabel }}</div>
            <div v-for="message in group.messages" :key="message.id" class="message"
                :class="!['admin', 'system'].includes(message.sender) ? 'customer' : message.sender">
                <img v-if="message.sender !== 'admin' && message.sender !== 'system'" :src="message.avatar"
                    class="avatar" />
                <div v-if="!message.item?.price" class="message-content">
                    <img v-if="message.item?.image" class="message-image" :src="message.item?.image" />
                    <div class="message-text">{{ message.text }}</div>
                    <div class="message-time">{{ formatDate(message.timestamp) }}</div>
                </div>
                <div v-if="message.item?.price" class="message-content">
                    <img v-if="message.item?.image" class="message-image" :src="message.item?.image" />
                    <div class="message-product">
                        <div class="product-name">{{ message.item?.name }}</div>
                        <p class="product-detail" v-html="message.item?.detail"></p>
                        <div class="product-price">
                            <span class="product-sale-price">{{ message.item?.sale_price }}</span>
                            <span> (Original: <span class="product-original_price">{{ message.item?.price
                            }}</span>)</span>
                        </div>
                        <button class="product-cta">Buy now</button>
                    </div>
                    <div v-if="message.text" class="message-text">{{ message.text }}</div>
                    <div class="message-time">{{ formatDate(message.timestamp) }}</div>
                </div>
                <img v-if="message.sender === 'admin'" :src="message.avatar" class="avatar" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useChatStore } from '../stores/chat';
import { formatDate, formatRelativeDate } from '@/utils/FormatDate';

export default {

    setup() {
        const chatStore = useChatStore();
        const messages = computed(() => chatStore.currentMessages);
        console.log("sender:", messages);

        return {
            messages,
            formatDate,
        };
    },
    mounted() {
        this.scrollToBottom();
    },
    updated() {
        this.scrollToBottom();
    },
    methods: {
        scrollToBottom() {
            const container = this.$refs.messageList;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    },
    computed: {
        groupedMessages() {
            const groups = this.messages.reduce((acc, message) => {
                const messageDate = new Date(message.timestamp);
                const dateKey = messageDate.toISOString().split('T')[0];

                let dateLabel = formatRelativeDate(messageDate, 'separator')


                if (!acc[dateKey]) {
                    acc[dateKey] = {
                        date: dateKey,
                        dateLabel: dateLabel,
                        messages: []
                    };
                }

                acc[dateKey].messages.push(message);
                return acc;
            }, {});

            return Object.values(groups);
        }
    },

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

.separator {
    justify-self: center;
    max-width: max-content;
    font-size: 12px;
    padding: 2px 8px;
    background-color: #e0e0e0;
    border-radius: 12px;
    color: #555;
    margin-top: 4px;
    margin-bottom: 12px;
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
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-items: center;
    background-color: #e0e0e0;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
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
    padding: 4px 4px;
    border-radius: 12px;
    position: relative;
    overflow: auto;
}

.message-product {
    padding: 4px 8px;

    .product-name {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .product-detail {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        text-overflow: ellipsis;
        font-size: 14px;
        margin-bottom: 8px;
    }

    .product-price {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        font-size: 12px;

        .product-original_price {
            text-decoration: line-through;
        }

        .product-sale-price {
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;

        }
    }

    .product-cta {
        margin-top: 8px;
        width: 100%;
        padding: 8px 16px;
        background-color: white;
        color: #4caf50;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
    }

    .product-cta:hover {
        background-color: #e7e7e7 !important;
    }
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


.message-image {
    border-radius: 10px;
    width: 100%;
    height: 100%;
}

.message-text {
    word-wrap: break-word;
    padding: 4px 8px;
}

.message-time {
    padding: 0px 8px 4px 8px;
    font-size: 12px;
    text-align: right;
    margin-top: 4px;
    opacity: 0.7;
}
</style>
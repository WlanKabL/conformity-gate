<template>
    <div class="relative min-h-screen overflow-hidden bg-black">
        <!-- Background audio -->
        <audio ref="audioElement" src="/assets/vecnalives.mp3" loop autoplay />

        <!-- Animated background -->
        <div class="fixed inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />

        <!-- Scanlines overlay -->
        <div class="fixed inset-0 scanlines pointer-events-none opacity-20" />

        <!-- Vignette -->
        <div
            class="fixed inset-0 pointer-events-none"
            style="box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.8)"
        />

        <!-- Header -->
        <AppHeader />

        <!-- Username Modal -->
        <div v-if="!username" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div class="max-w-md w-full mx-4 p-8 bg-black border-2 border-red-600 rounded-lg">
                <h2 class="text-red-600 stranger-title text-3xl mb-4 text-center">
                    ENTER CHAT
                </h2>
                <p class="text-gray-400 mb-6 text-center">Choose your username (cannot be changed later)</p>
                
                <form @submit.prevent="setUsername" class="space-y-4">
                    <input
                        v-model="usernameInput"
                        type="text"
                        placeholder="Your username..."
                        maxlength="20"
                        required
                        class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                    >
                    <button
                        type="submit"
                        class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all uppercase text-sm tracking-wider"
                    >
                        Join Chat
                    </button>
                </form>
            </div>
        </div>

        <!-- Ban Notice -->
        <div v-if="banStatus.bannedUntil && banStatus.bannedUntil > Date.now()" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div class="max-w-md w-full mx-4 p-8 bg-black border-2 border-red-600 rounded-lg text-center">
                <h2 class="text-red-600 stranger-title text-3xl mb-4">BANNED</h2>
                <p class="text-gray-400 mb-4">You have been temporarily banned for using inappropriate language.</p>
                <p class="text-red-600 text-xl font-bold">
                    {{ formatBanTime(banStatus.bannedUntil - Date.now()) }}
                </p>
                <p class="text-gray-500 text-sm mt-4">Warnings: {{ banStatus.warnings }}/3</p>
            </div>
        </div>

        <!-- Permanent Ban -->
        <div v-if="banStatus.permanentBan" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <div class="max-w-md w-full mx-4 p-8 bg-black border-2 border-red-600 rounded-lg text-center">
                <h2 class="text-red-600 stranger-title text-3xl mb-4">PERMANENTLY BANNED</h2>
                <p class="text-gray-400">You have been permanently banned from the chat for repeated violations.</p>
            </div>
        </div>

        <!-- Main Chat -->
        <div v-if="username && !isBanned" class="relative z-10 px-4 py-20 pt-32">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-red-600 stranger-title text-4xl sm:text-5xl md:text-6xl mb-8 text-center">
                    CHATROOM
                </h1>

                <!-- Warning Notice -->
                <div v-if="banStatus.warnings > 0" class="mb-4 p-4 bg-red-900/20 border-2 border-red-600 rounded-lg">
                    <p class="text-red-600 font-bold">
                        ⚠️ Warning {{ banStatus.warnings }}/3 - Inappropriate language detected. 
                        {{ banStatus.warnings === 1 ? 'Next: 1h ban' : banStatus.warnings === 2 ? 'Next: 24h ban' : 'Next: Permanent ban' }}
                    </p>
                </div>

                <!-- Chat Container -->
                <div class="bg-black/40 border-2 border-red-900/30 rounded-lg overflow-hidden">
                    <!-- Messages -->
                    <div ref="messagesContainer" class="h-[60vh] overflow-y-auto p-4 space-y-3">
                        <!-- Load More Button -->
                        <button
                            v-if="hasMore"
                            @click="loadMore"
                            class="w-full py-2 text-gray-500 hover:text-red-600 text-sm transition-colors"
                        >
                            Load older messages...
                        </button>

                        <!-- Messages -->
                        <div
                            v-for="message in messages"
                            :key="message.id"
                            class="flex gap-3 p-3 rounded-lg transition-colors"
                            :class="message.username === username ? 'bg-red-900/10' : 'hover:bg-red-900/5'"
                        >
                            <div class="flex-1">
                                <div class="flex items-baseline gap-2 mb-1">
                                    <span class="font-bold text-red-600">{{ message.username }}</span>
                                    <span class="text-xs text-gray-600">{{ formatTime(message.timestamp) }}</span>
                                </div>
                                <p class="text-gray-300">{{ message.content }}</p>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-if="messages.length === 0" class="text-center py-20 text-gray-500">
                            No messages yet. Be the first to say something!
                        </div>
                    </div>

                    <!-- Input -->
                    <div class="border-t-2 border-red-900/30 p-4">
                        <form @submit.prevent="sendMessage" class="flex gap-2">
                            <input
                                v-model="messageInput"
                                type="text"
                                placeholder="Type your message..."
                                maxlength="500"
                                required
                                class="flex-1 px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                            >
                            <button
                                type="submit"
                                :disabled="sending"
                                class="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all uppercase text-sm tracking-wider"
                            >
                                Send
                            </button>
                        </form>
                        <p class="text-xs text-gray-600 mt-2">{{ messageInput.length }}/500 characters</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage, UserBanStatus } from '~/types/chat';

const username = ref('');
const usernameInput = ref('');
const messageInput = ref('');
const messages = ref<ChatMessage[]>([]);
const messagesContainer = ref<HTMLElement | null>(null);
const sending = ref(false);
const hasMore = ref(false);
const lastMessageId = ref<string | null>(null);
const pollingInterval = ref<NodeJS.Timeout | null>(null);

const banStatus = ref<UserBanStatus>({
    warnings: 0,
    bannedUntil: null,
    permanentBan: false
});

const isBanned = computed(() => {
    return banStatus.value.permanentBan || 
           (banStatus.value.bannedUntil && banStatus.value.bannedUntil > Date.now());
});

// Load username from localStorage
onMounted(() => {
    const stored = localStorage.getItem('conformity-username');
    if (stored) {
        username.value = stored;
    }

    // Load ban status
    const storedBan = localStorage.getItem('conformity-ban');
    if (storedBan) {
        banStatus.value = JSON.parse(storedBan);
    }

    // Initial load
    if (username.value && !isBanned.value) {
        loadMessages();
        startPolling();
    }
});

onBeforeUnmount(() => {
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
    }
});

const setUsername = () => {
    if (usernameInput.value.trim().length < 2) return;
    username.value = usernameInput.value.trim();
    localStorage.setItem('conformity-username', username.value);
    loadMessages();
    startPolling();
};

const loadMessages = async (loadOlder = false) => {
    try {
        const params: any = { limit: 100 };
        
        if (loadOlder && messages.value.length > 0) {
            params.before = messages.value[0].id;
        }

        const response = await $fetch('/api/messages', { params });
        
        if (loadOlder) {
            messages.value = [...response.messages, ...messages.value];
        } else {
            messages.value = response.messages;
            if (response.messages.length > 0) {
                lastMessageId.value = response.messages[response.messages.length - 1].id;
            }
            scrollToBottom();
        }
        
        hasMore.value = response.hasMore;
    } catch (error) {
        console.error('Failed to load messages:', error);
    }
};

const loadMore = () => {
    loadMessages(true);
};

const pollMessages = async () => {
    if (!lastMessageId.value) return;

    try {
        const response = await $fetch('/api/messages', {
            params: { since: lastMessageId.value }
        });

        if (response.messages.length > 0) {
            messages.value = [...messages.value, ...response.messages];
            lastMessageId.value = response.messages[response.messages.length - 1].id;
            scrollToBottom();
        }
    } catch (error) {
        console.error('Failed to poll messages:', error);
    }
};

const startPolling = () => {
    pollingInterval.value = setInterval(pollMessages, 30000); // 30 seconds
};

const sendMessage = async () => {
    if (!messageInput.value.trim() || sending.value) return;

    sending.value = true;

    try {
        const newMessage = await $fetch('/api/messages', {
            method: 'POST',
            body: {
                username: username.value,
                content: messageInput.value
            }
        });

        messages.value.push(newMessage as ChatMessage);
        lastMessageId.value = (newMessage as ChatMessage).id;
        messageInput.value = '';
        scrollToBottom();
    } catch (error: any) {
        if (error.statusMessage === 'BAD_WORD_DETECTED') {
            handleBadWord();
        } else {
            console.error('Failed to send message:', error);
        }
    } finally {
        sending.value = false;
    }
};

const handleBadWord = () => {
    banStatus.value.warnings++;
    
    if (banStatus.value.warnings === 1) {
        // First warning: 1 hour ban
        banStatus.value.bannedUntil = Date.now() + 60 * 60 * 1000;
    } else if (banStatus.value.warnings === 2) {
        // Second warning: 24 hour ban
        banStatus.value.bannedUntil = Date.now() + 24 * 60 * 60 * 1000;
    } else {
        // Third warning: permanent ban
        banStatus.value.permanentBan = true;
    }
    
    localStorage.setItem('conformity-ban', JSON.stringify(banStatus.value));
    messageInput.value = '';
};

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const formatBanTime = (ms: number) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
};

useHead({
    title: 'Chatroom - Conformity Gate',
    meta: [
        {
            name: 'description',
            content: 'Join the discussion about Stranger Things Episode 9'
        }
    ]
});
</script>

<style scoped>
@font-face {
    font-family: "Stranger Things";
    src: url("/assets/Stranger Things Outlined.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

.scanlines {
    background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
    );
}

.stranger-title {
    font-family: "Stranger Things", cursive;
    text-shadow:
        0 0 20px rgba(220, 38, 38, 0.8),
        0 0 40px rgba(220, 38, 38, 0.5);
    letter-spacing: 0.05em;
}

/* Custom Scrollbar */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.5);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(220, 38, 38, 0.5);
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(220, 38, 38, 0.7);
}
</style>

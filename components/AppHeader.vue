<template>
    <header
        class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-red-900/30"
    >
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            <NuxtLink to="/" class="flex items-center gap-3">
                <h1 class="stranger-title text-2xl sm:text-3xl text-red-600">CONFORMITY GATE</h1>
            </NuxtLink>

            <nav class="hidden md:flex items-center gap-6">
                <NuxtLink
                    to="/evidence"
                    class="relative text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wider pb-1"
                    :class="{ 'text-red-600 active-link': route.path.startsWith('/evidence') }"
                >
                    Evidence Chain
                </NuxtLink>
                <NuxtLink
                    to="/timeline"
                    class="relative text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wider pb-1"
                    :class="{ 'text-red-600 active-link': route.path.startsWith('/timeline') }"
                >
                    Timeline
                </NuxtLink>
                <NuxtLink
                    to="/chat"
                    class="relative text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wider pb-1"
                    :class="{ 'text-red-600 active-link': route.path.startsWith('/chat') }"
                >
                    Chatroom
                </NuxtLink>
            </nav>

            <!-- Mobile menu button -->
            <button @click="toggleMobileMenu" class="md:hidden text-red-600 p-2">
                <svg
                    v-if="!isMobileMenuOpen"
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>

        <!-- Mobile menu -->
        <Transition name="slide">
            <div v-if="isMobileMenuOpen" class="md:hidden bg-black/95 border-t border-red-900/30">
                <nav class="container mx-auto px-4 py-4 flex flex-col gap-4">
                    <NuxtLink
                        to="/evidence"
                        @click="closeMobileMenu"
                        class="relative text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wider py-2"
                        :class="{ 'text-red-600 active-link': route.path.startsWith('/evidence') }"
                    >
                        Evidence Chain
                    </NuxtLink>
                    <NuxtLink
                        to="/timeline"
                        @click="closeMobileMenu"
                        class="relative text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wider py-2"
                        :class="{ 'text-red-600 active-link': route.path.startsWith('/timeline') }"
                    >
                        Timeline
                    </NuxtLink>
                    <NuxtLink
                        to="/chat"
                        @click="closeMobileMenu"
                        class="relative text-gray-400 hover:text-red-600 transition-colors text-sm uppercase tracking-wider py-2"
                        :class="{ 'text-red-600 active-link': route.path.startsWith('/chat') }"
                    >
                        Chatroom
                    </NuxtLink>
                </nav>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

// Close mobile menu on route change
const route = useRoute();
watch(
    () => route.path,
    () => {
        closeMobileMenu();
    },
);
</script>

<style scoped>
@font-face {
    font-family: "Stranger Things";
    src: url("/assets/Stranger Things Outlined.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

.stranger-title {
    font-family: "Stranger Things", cursive;
    text-shadow:
        0 0 10px rgba(220, 38, 38, 0.6),
        0 0 20px rgba(220, 38, 38, 0.3);
    letter-spacing: 0.05em;
}

.active-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #dc2626;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>

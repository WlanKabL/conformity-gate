<template>
    <div class="relative min-h-screen overflow-hidden bg-black">
        <!-- Background audio -->
        <audio ref="audioElement" src="/assets/vecnalives.mp3" loop autoplay></audio>

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

        <!-- Main content -->
        <div
            class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 pt-32"
        >
            <div class="max-w-4xl w-full text-center space-y-12">
                <!-- Title -->
                <div>
                    <h1
                        class="text-red-600 stranger-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6"
                    >
                        THE TIMELINE
                    </h1>
                    <div
                        class="flex items-center justify-center gap-3 text-gray-500 text-sm sm:text-base tracking-[0.2em] uppercase"
                    >
                        <div class="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                        <span>Under Construction</span>
                        <div class="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    </div>
                </div>

                <!-- Description -->
                <div class="max-w-2xl mx-auto space-y-8 text-gray-400">
                    <p class="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed">
                        A chronological journey through the Upside Down.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div class="p-4 bg-black/20">
                            <h3
                                class="text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                            >
                                Season 1-4
                            </h3>
                            <p class="text-gray-500 text-sm">
                                Every major event mapped chronologically
                            </p>
                        </div>
                        <div class="p-4 bg-black/20">
                            <h3
                                class="text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                            >
                                Key Moments
                            </h3>
                            <p class="text-gray-500 text-sm">
                                Critical scenes that hint at Episode 9
                            </p>
                        </div>
                        <div class="p-4 bg-black/20">
                            <h3
                                class="text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                            >
                                Character Arcs
                            </h3>
                            <p class="text-gray-500 text-sm">Tracking unresolved storylines</p>
                        </div>
                        <div class="p-4 bg-black/20">
                            <h3
                                class="text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                            >
                                Parallel Events
                            </h3>
                            <p class="text-gray-500 text-sm">Connections across time and space</p>
                        </div>
                    </div>

                    <p
                        class="text-red-600/60 italic text-sm border-l-2 border-red-600/30 pl-4 py-2"
                    >
                        Time doesn't work the same in the Upside Down. The timeline reveals all.
                    </p>
                </div>

                <!-- Back Button -->
                <div class="pt-8">
                    <NuxtLink
                        to="/"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border-2 border-red-600 text-red-600 font-bold rounded-lg transition-all uppercase text-sm tracking-wider"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Gate
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "Timeline - Conformity Gate",
    meta: [
        {
            name: "description",
            content:
                "Chronological timeline of Stranger Things events. Mapping the path to Episode 9.",
        },
    ],
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
</style>

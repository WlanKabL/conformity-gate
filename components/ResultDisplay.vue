<template>
    <div class="w-full max-w-4xl mx-auto text-center">
        <!-- Waiting for Results -->
        <div v-if="status === null" class="space-y-6">
            <div class="animate-pulse">
                <h2 class="text-3xl sm:text-4xl md:text-5xl text-gray-400 stranger-title mb-4">
                    Waiting for Netflix Results
                </h2>
                <p class="text-gray-500 text-lg">Stay tuned...</p>
            </div>

            <div class="flex justify-center items-center gap-2">
                <div
                    class="w-3 h-3 bg-red-600 rounded-full animate-bounce"
                    style="animation-delay: 0ms"
                ></div>
                <div
                    class="w-3 h-3 bg-red-600 rounded-full animate-bounce"
                    style="animation-delay: 150ms"
                ></div>
                <div
                    class="w-3 h-3 bg-red-600 rounded-full animate-bounce"
                    style="animation-delay: 300ms"
                ></div>
            </div>
        </div>

        <!-- Episode 9 Released (string with link) -->
        <div v-else-if="typeof status === 'string'" class="space-y-8">
            <div>
                <h2
                    class="text-4xl sm:text-5xl md:text-6xl text-red-600 stranger-title mb-6 animate-pulse"
                >
                    WE WERE RIGHT!
                </h2>
                <p class="text-2xl sm:text-3xl text-gray-300 mb-4">Episode 9 Has Been Released</p>
                <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                    The Conformity Gate believers knew it all along. The truth has finally emerged
                    from the Upside Down.
                </p>
            </div>

            <!-- Episode 9 Image -->
            <div
                class="relative mx-auto max-w-2xl aspect-video bg-gradient-to-br from-red-900/20 to-black border-2 border-red-600/30 rounded-lg overflow-hidden"
            >
                <img
                    src="/assets/suckmyfatone.jpg"
                    alt="Episode 9"
                    class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="scanlines absolute inset-0 opacity-20 pointer-events-none"></div>
            </div>

            <!-- Watch on Netflix Button -->
            <div>
                <a
                    :href="status"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-red-600/50"
                >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch on Netflix
                </a>
            </div>
        </div>

        <!-- Episode 9 NOT Released (false) -->
        <div v-else class="space-y-8">
            <div>
                <h2 class="text-4xl sm:text-5xl md:text-6xl text-gray-400 stranger-title mb-6">
                    Not Yet...
                </h2>
                <p class="text-xl sm:text-2xl text-gray-300 mb-4">
                    Episode 9 Has Not Been Released
                </p>
                <div
                    class="max-w-2xl mx-auto space-y-4 text-gray-400 text-base sm:text-lg leading-relaxed"
                >
                    <p>
                        The countdown has ended, but the gate remains closed. Netflix hasn't
                        released Episode 9 yet, but that doesn't mean we give up.
                    </p>
                    <p>
                        We're the Conformity Gate believers. We've gathered the evidence, we've
                        analyzed every frame, and we know the truth is out there. Join us as we
                        continue to search for answers.
                    </p>
                    <p class="text-red-600 font-semibold">
                        The Upside Down doesn't reveal its secrets easily. But we're patient.
                    </p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <NuxtLink
                    to="/chat"
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border-2 border-red-600 text-red-600 font-bold rounded-lg transition-all"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    Join the Chatroom
                </NuxtLink>

                <NuxtLink
                    to="/evidence"
                    class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    View Evidence Chain
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    status: string | false | null;
}>();
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
        0 0 20px rgba(220, 38, 38, 0.8),
        0 0 40px rgba(220, 38, 38, 0.5);
    letter-spacing: 0.05em;
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
</style>

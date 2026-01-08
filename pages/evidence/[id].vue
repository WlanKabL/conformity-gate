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
        <div class="relative z-10 px-4 py-20 pt-32">
            <div class="max-w-4xl mx-auto">
                <!-- Back Button -->
                <NuxtLink
                    to="/evidence"
                    class="inline-flex items-center gap-2 text-red-600 hover:text-red-500 mb-8 transition-colors group"
                >
                    <svg
                        class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span class="font-bold uppercase text-sm tracking-wider">Back to Evidence</span>
                </NuxtLink>

                <div v-if="evidence">
                    <!-- Category Badge -->
                    <div class="mb-6">
                        <span
                            :class="getCategoryClass(evidence.category)"
                            class="inline-block px-4 py-2 rounded-lg font-bold uppercase text-xs tracking-wider"
                        >
                            {{ evidence.category }}
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="text-red-600 stranger-title text-4xl sm:text-5xl md:text-6xl mb-6">
                        {{ evidence.title }}
                    </h1>

                    <!-- Metadata -->
                    <div class="flex flex-wrap gap-4 mb-8 text-sm text-gray-500">
                        <div v-if="evidence.season" class="flex items-center gap-2">
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                />
                            </svg>
                            <span
                                >Season {{ evidence.season }}, Episode {{ evidence.episode }}</span
                            >
                        </div>
                        <div class="flex items-center gap-2">
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span>{{ evidence.submittedBy }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>{{ formatDate(evidence.submittedDate) }}</span>
                        </div>
                    </div>

                    <!-- Credibility Rating -->
                    <div class="mb-8">
                        <div class="text-gray-400 text-sm mb-2 uppercase tracking-wider">
                            Credibility Rating
                        </div>
                        <div class="flex gap-1">
                            <svg
                                v-for="i in 5"
                                :key="i"
                                class="w-6 h-6"
                                :class="
                                    i <= evidence.credibility ? 'text-yellow-500' : 'text-gray-700'
                                "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="mb-8 p-6 bg-black/40 border-2 border-red-900/30 rounded-lg">
                        <p class="text-gray-300 text-lg leading-relaxed">
                            {{ evidence.description }}
                        </p>
                    </div>

                    <!-- Detailed Analysis -->
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-red-600 mb-4 uppercase tracking-wider">
                            Detailed Analysis
                        </h2>
                        <div class="p-6 bg-black/40 border-2 border-red-900/30 rounded-lg">
                            <p class="text-gray-300 leading-relaxed whitespace-pre-line">
                                {{ evidence.details }}
                            </p>
                        </div>
                    </div>

                    <!-- Evidence Points -->
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-red-600 mb-4 uppercase tracking-wider">
                            Key Evidence
                        </h2>
                        <div class="space-y-3">
                            <div
                                v-for="(point, index) in evidence.evidence"
                                :key="index"
                                class="flex gap-3 p-4 bg-black/40 border-2 border-red-900/30 rounded-lg"
                            >
                                <div class="text-red-600 font-bold">→</div>
                                <p class="text-gray-300 flex-1">{{ point }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Tags -->
                    <div>
                        <h2 class="text-2xl font-bold text-red-600 mb-4 uppercase tracking-wider">
                            Tags
                        </h2>
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="tag in evidence.tags"
                                :key="tag"
                                class="px-3 py-1 bg-red-900/20 border border-red-900/50 text-red-600 rounded-full text-sm"
                            >
                                #{{ tag }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Not Found -->
                <div v-else class="text-center py-20">
                    <p class="text-gray-500 text-lg mb-6">Evidence not found</p>
                    <NuxtLink
                        to="/evidence"
                        class="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all uppercase text-sm tracking-wider"
                    >
                        Back to Evidence
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { evidenceData } from "~/data/evidence";

const route = useRoute();
const evidence = computed(() => {
    const id = route.params.id as string;
    return evidenceData.find((e) => e.id === id);
});

const getCategoryClass = (category: string) => {
    const classes: Record<string, string> = {
        visual: "bg-purple-600 text-white",
        script: "bg-blue-600 text-white",
        character: "bg-green-600 text-white",
        timeline: "bg-yellow-600 text-white",
        symbols: "bg-pink-600 text-white",
        "cast-hints": "bg-orange-600 text-white",
    };
    return classes[category] || "bg-gray-600 text-white";
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

useHead({
    title: evidence.value ? `${evidence.value.title} - Evidence Chain` : "Evidence Not Found",
    meta: [
        {
            name: "description",
            content: evidence.value ? evidence.value.description : "Evidence not found",
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

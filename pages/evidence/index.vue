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
            <div class="max-w-7xl mx-auto">
                <!-- Hero Section -->
                <div class="text-center mb-16">
                    <h1 class="text-red-600 stranger-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">
                        EVIDENCE CHAIN
                    </h1>
                    <p class="text-xl text-gray-400 mb-8 tracking-wider">
                        Every clue, every hint pointing to the truth
                    </p>

                    <!-- Submit Button -->
                    <NuxtLink
                        to="/evidence/submit"
                        class="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all uppercase text-sm tracking-wider shadow-lg shadow-red-600/50"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Submit Evidence
                    </NuxtLink>
                </div>

                <!-- Search & Filter -->
                <div class="mb-12">
                    <div class="max-w-2xl mx-auto mb-8">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search evidence by title, description, or tags..."
                                class="w-full px-6 py-4 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                            />
                            <svg
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <!-- Category Filter -->
                    <div class="flex flex-wrap gap-3 justify-center mb-8">
                        <button
                            @click="selectedCategory = null"
                            :class="selectedCategory === null ? 'bg-red-600 text-white' : 'bg-black/40 text-gray-400 border-red-900/30'"
                            class="px-4 py-2 border rounded-lg font-bold uppercase text-xs tracking-wider transition-all"
                        >
                            All
                        </button>
                        <button
                            v-for="cat in categories"
                            :key="cat.value"
                            @click="selectedCategory = cat.value"
                            :class="selectedCategory === cat.value ? cat.activeClass : 'bg-black/40 text-gray-400 border-red-900/30'"
                            class="px-4 py-2 border rounded-lg font-bold uppercase text-xs tracking-wider transition-all"
                        >
                            {{ cat.label }}
                        </button>
                    </div>

                    <!-- Results Count -->
                    <div class="text-center text-gray-500 text-sm">
                        Showing {{ filteredEvidence.length }} of {{ evidenceData.length }} evidence
                    </div>
                </div>

                <!-- Evidence Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <NuxtLink
                        v-for="evidence in filteredEvidence"
                        :key="evidence.id"
                        :to="`/evidence/${evidence.id}`"
                    >
                        <EvidenceCard :evidence="evidence" />
                    </NuxtLink>
                </div>

                <!-- No Results -->
                <div v-if="filteredEvidence.length === 0" class="text-center py-20">
                    <p class="text-gray-500 text-lg mb-4">No evidence found matching your criteria</p>
                    <button
                        @click="resetFilters"
                        class="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border-2 border-red-600 text-red-600 font-bold rounded-lg transition-all uppercase text-sm tracking-wider"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { evidenceData } from '~/data/evidence';

const searchQuery = ref('');
const selectedCategory = ref<string | null>(null);

const categories = [
    { value: 'visual', label: 'Visual', activeClass: 'bg-purple-600 text-white border-purple-600' },
    { value: 'script', label: 'Dialogue', activeClass: 'bg-blue-600 text-white border-blue-600' },
    { value: 'character', label: 'Character', activeClass: 'bg-green-600 text-white border-green-600' },
    { value: 'timeline', label: 'Timeline', activeClass: 'bg-yellow-600 text-white border-yellow-600' },
    { value: 'symbols', label: 'Symbols', activeClass: 'bg-pink-600 text-white border-pink-600' },
    { value: 'cast-hints', label: 'Cast Hints', activeClass: 'bg-orange-600 text-white border-orange-600' }
];

const filteredEvidence = computed(() => {
    let results = [...evidenceData];

    // Filter by category
    if (selectedCategory.value) {
        results = results.filter(e => e.category === selectedCategory.value);
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        results = results.filter(e =>
            e.title.toLowerCase().includes(query) ||
            e.description.toLowerCase().includes(query) ||
            e.details.toLowerCase().includes(query) ||
            e.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    // Sort by date (newest first)
    results.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());

    return results;
});

const resetFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = null;
};

useHead({
    title: "Evidence Chain - Conformity Gate",
    meta: [
        {
            name: "description",
            content: "Every clue pointing to Stranger Things Episode 9. Deep analysis of hidden references and patterns.",
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

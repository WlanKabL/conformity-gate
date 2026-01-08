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
            <div class="max-w-3xl mx-auto">
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

                <h1 class="text-red-600 stranger-title text-4xl sm:text-5xl md:text-6xl mb-8">
                    SUBMIT EVIDENCE
                </h1>

                <!-- Success Message -->
                <div v-if="submitted" class="text-center py-20">
                    <div class="mb-6">
                        <svg
                            class="w-20 h-20 mx-auto text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-green-600 mb-4">Evidence Submitted!</h2>
                    <p class="text-gray-400 mb-8">Your evidence has been sent for review.</p>
                    <NuxtLink
                        to="/evidence"
                        class="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all uppercase text-sm tracking-wider"
                    >
                        Back to Evidence Chain
                    </NuxtLink>
                </div>

                <!-- Form -->
                <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                    <!-- Title -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Title *
                        </label>
                        <input
                            v-model="form.title"
                            type="text"
                            required
                            placeholder="e.g., The Upside Down is Frozen in Time"
                            class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                        />
                    </div>

                    <!-- Category -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Category *
                        </label>
                        <select
                            v-model="form.category"
                            required
                            class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 outline-none transition-colors"
                        >
                            <option value="">Select a category</option>
                            <option value="visual">Visual Clue</option>
                            <option value="script">Dialogue/Script</option>
                            <option value="character">Character Arc</option>
                            <option value="timeline">Timeline Evidence</option>
                            <option value="symbols">Symbolism</option>
                            <option value="cast-hints">Cast Hints</option>
                        </select>
                    </div>

                    <!-- Description -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Short Description *
                        </label>
                        <textarea
                            v-model="form.description"
                            required
                            rows="2"
                            placeholder="Brief summary (1-2 sentences)"
                            class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors resize-none"
                        ></textarea>
                    </div>

                    <!-- Detailed Analysis -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Detailed Analysis *
                        </label>
                        <textarea
                            v-model="form.details"
                            required
                            rows="6"
                            placeholder="Full explanation and analysis of the evidence..."
                            class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors resize-y"
                        ></textarea>
                    </div>

                    <!-- Evidence Points -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Key Evidence Points *
                        </label>
                        <div class="space-y-2">
                            <div
                                v-for="(point, index) in form.evidencePoints"
                                :key="index"
                                class="flex gap-2"
                            >
                                <input
                                    v-model="form.evidencePoints[index]"
                                    type="text"
                                    placeholder="Evidence point..."
                                    class="flex-1 px-4 py-2 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                                />
                                <button
                                    v-if="form.evidencePoints.length > 1"
                                    type="button"
                                    @click="removePoint(index)"
                                    class="px-3 py-2 bg-red-600/20 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            @click="addPoint"
                            class="mt-2 px-4 py-2 bg-red-600/20 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all uppercase text-xs tracking-wider"
                        >
                            + Add Point
                        </button>
                    </div>

                    <!-- Season & Episode -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                            >
                                Season
                            </label>
                            <input
                                v-model.number="form.season"
                                type="number"
                                min="1"
                                max="5"
                                placeholder="Optional"
                                class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                            >
                                Episode
                            </label>
                            <input
                                v-model.number="form.episode"
                                type="number"
                                min="1"
                                placeholder="Optional"
                                class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <!-- Tags -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Tags (comma separated) *
                        </label>
                        <input
                            v-model="form.tagsInput"
                            type="text"
                            required
                            placeholder="e.g., vecna, upside down, will byers"
                            class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                        />
                    </div>

                    <!-- Your Name -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Your Name *
                        </label>
                        <input
                            v-model="form.submittedBy"
                            type="text"
                            required
                            placeholder="Your username or name"
                            class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                        />
                    </div>

                    <!-- Credibility -->
                    <div>
                        <label
                            class="block text-red-600 font-bold mb-2 uppercase text-sm tracking-wider"
                        >
                            Credibility Rating *
                        </label>
                        <div class="flex gap-2">
                            <button
                                v-for="i in 5"
                                :key="i"
                                type="button"
                                @click="form.credibility = i"
                                class="flex-1 px-4 py-3 border-2 rounded-lg transition-all"
                                :class="
                                    form.credibility === i
                                        ? 'bg-yellow-600 border-yellow-600 text-white'
                                        : 'bg-black/60 border-red-900/30 text-gray-500 hover:border-red-600'
                                "
                            >
                                {{ i }} ★
                            </button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" class="p-4 bg-red-900/20 border-2 border-red-600 rounded-lg">
                        <p class="text-red-600">{{ error }}</p>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all uppercase text-sm tracking-wider shadow-lg shadow-red-600/50"
                    >
                        {{ loading ? "Submitting..." : "Submit Evidence" }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const form = ref({
    title: "",
    category: "",
    description: "",
    details: "",
    evidencePoints: [""],
    season: null as number | null,
    episode: null as number | null,
    tagsInput: "",
    submittedBy: "",
    credibility: 3,
});

const loading = ref(false);
const error = ref("");
const submitted = ref(false);

const addPoint = () => {
    form.value.evidencePoints.push("");
};

const removePoint = (index: number) => {
    form.value.evidencePoints.splice(index, 1);
};

const handleSubmit = async () => {
    error.value = "";
    loading.value = true;

    try {
        // Filter empty evidence points
        const evidencePoints = form.value.evidencePoints.filter((p) => p.trim());

        if (evidencePoints.length === 0) {
            error.value = "Please add at least one evidence point";
            loading.value = false;
            return;
        }

        // Parse tags
        const tags = form.value.tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t);

        if (tags.length === 0) {
            error.value = "Please add at least one tag";
            loading.value = false;
            return;
        }

        const payload = {
            title: form.value.title,
            category: form.value.category,
            description: form.value.description,
            details: form.value.details,
            evidence: evidencePoints,
            season: form.value.season,
            episode: form.value.episode,
            tags: tags,
            submittedBy: form.value.submittedBy,
            credibility: form.value.credibility,
        };

        // Send to API endpoint (will be created)
        await $fetch("/api/submit-evidence", {
            method: "POST",
            body: payload,
        });

        submitted.value = true;
    } catch (err) {
        error.value = (err as Error).message || "Failed to submit evidence. Please try again.";
    } finally {
        loading.value = false;
    }
};

useHead({
    title: "Submit Evidence - Conformity Gate",
    meta: [
        {
            name: "description",
            content: "Submit your evidence for Stranger Things Episode 9",
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

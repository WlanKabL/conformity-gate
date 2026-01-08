<template>
    <div class="evidence-card group h-full">
        <div class="flex items-start justify-between mb-3">
            <span :class="categoryClass" class="category-badge">
                {{ categoryLabel }}
            </span>
            <div class="flex gap-1">
                <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-4 h-4"
                    :class="i <= evidence.credibility ? 'text-red-600' : 'text-gray-700'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>
            </div>
        </div>

        <h3 class="text-xl font-bold text-red-600 mb-2 group-hover:text-red-500 transition-colors">
            {{ evidence.title }}
        </h3>

        <p class="text-gray-400 text-sm mb-3 line-clamp-2">
            {{ evidence.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-3">
            <span
                v-for="tag in evidence.tags.slice(0, 3)"
                :key="tag"
                class="text-xs px-2 py-1 bg-black/40 border border-red-900/30 text-gray-500 rounded"
            >
                #{{ tag }}
            </span>
        </div>

        <div class="flex items-center justify-between text-xs text-gray-600 mb-4">
            <span>by {{ evidence.submittedBy }}</span>
            <span>{{ formatDate(evidence.submittedDate) }}</span>
        </div>

        <div
            class="w-full px-4 py-2 bg-red-600/20 group-hover:bg-red-600 border border-red-600 text-red-600 group-hover:text-white font-bold rounded transition-all uppercase text-sm tracking-wider text-center"
        >
            Read Evidence
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Evidence } from "~/types/evidence";

const props = defineProps<{
    evidence: Evidence;
}>();

const categoryLabel = computed(() => {
    const labels: Record<string, string> = {
        visual: "Visual Clue",
        script: "Dialogue",
        character: "Character Arc",
        timeline: "Timeline",
        symbols: "Symbolism",
        "cast-hints": "Cast Hints",
    };
    return labels[props.evidence.category] || props.evidence.category;
});

const categoryClass = computed(() => {
    const classes: Record<string, string> = {
        visual: "bg-purple-900/30 border-purple-600 text-purple-500",
        script: "bg-blue-900/30 border-blue-600 text-blue-500",
        character: "bg-green-900/30 border-green-600 text-green-500",
        timeline: "bg-yellow-900/30 border-yellow-600 text-yellow-500",
        symbols: "bg-pink-900/30 border-pink-600 text-pink-500",
        "cast-hints": "bg-orange-900/30 border-orange-600 text-orange-500",
    };
    return classes[props.evidence.category] || "bg-gray-900/30 border-gray-600 text-gray-500";
});

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};
</script>

<style scoped>
.evidence-card {
    background: rgba(20, 20, 20, 0.9);
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: 15px;
    padding: 24px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.evidence-card:hover {
    border-color: #dc2626;
    box-shadow: 0 0 30px rgba(220, 38, 38, 0.4);
    transform: translateY(-5px);
}

.category-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="show" class="modal-overlay" @click="$emit('close')">
                <div class="modal-container" @click.stop>
                    <button @click="$emit('close')" class="close-button">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div class="modal-content">
                        <div class="mb-4">
                            <span :class="categoryClass" class="category-badge">
                                {{ categoryLabel }}
                            </span>
                        </div>

                        <h2 class="text-3xl font-bold text-red-600 mb-4">
                            {{ evidence.title }}
                        </h2>

                        <div class="flex items-center gap-4 mb-6 text-sm text-gray-400">
                            <span>by {{ evidence.submittedBy }}</span>
                            <span>•</span>
                            <span>{{ formatDate(evidence.submittedDate) }}</span>
                            <span v-if="evidence.season">•</span>
                            <span v-if="evidence.season"
                                >S{{ evidence.season }}E{{ evidence.episode }}</span
                            >
                        </div>

                        <div class="flex items-center gap-2 mb-6">
                            <span class="text-sm text-gray-400">Credibility:</span>
                            <div class="flex gap-1">
                                <svg
                                    v-for="i in 5"
                                    :key="i"
                                    class="w-5 h-5"
                                    :class="
                                        i <= evidence.credibility ? 'text-red-600' : 'text-gray-700'
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

                        <p class="text-gray-300 text-lg mb-6">
                            {{ evidence.description }}
                        </p>

                        <div class="mb-6">
                            <h3
                                class="text-red-600 font-bold mb-3 uppercase text-sm tracking-wider"
                            >
                                Detailed Analysis
                            </h3>
                            <p class="text-gray-400 leading-relaxed">
                                {{ evidence.details }}
                            </p>
                        </div>

                        <div class="mb-6">
                            <h3
                                class="text-red-600 font-bold mb-3 uppercase text-sm tracking-wider"
                            >
                                Evidence Points
                            </h3>
                            <ul class="space-y-2">
                                <li
                                    v-for="(point, index) in evidence.evidence"
                                    :key="index"
                                    class="text-gray-400 flex items-start gap-2"
                                >
                                    <span class="text-red-600 mt-1">▹</span>
                                    <span>{{ point }}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="tag in evidence.tags"
                                :key="tag"
                                class="text-xs px-3 py-1 bg-black/40 border border-red-900/30 text-gray-500 rounded-full"
                            >
                                #{{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import type { Evidence } from "~/types/evidence";

const props = defineProps<{
    show: boolean;
    evidence: Evidence;
}>();

defineEmits<{
    (e: "close"): void;
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
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 1000;
    overflow-y: auto;
}

.modal-container {
    position: relative;
    background: rgba(10, 10, 10, 0.95);
    border: 2px solid #dc2626;
    border-radius: 15px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0 50px rgba(220, 38, 38, 0.5);
}

.modal-content {
    padding: 40px;
}

.close-button {
    position: sticky;
    top: 20px;
    right: 20px;
    float: right;
    color: #dc2626;
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid #dc2626;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
}

.close-button:hover {
    background: rgba(220, 38, 38, 0.2);
    transform: rotate(90deg);
}

.category-badge {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: scale(0.9);
}

@media (max-width: 768px) {
    .modal-content {
        padding: 30px 20px;
    }
}
</style>

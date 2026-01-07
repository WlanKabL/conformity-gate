<script setup lang="ts">
const { t } = useI18n();

interface Props {
    title?: string;
    message?: string;
    icon?: string;
    showDate?: boolean;
    progress?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
    title: "",
    message: "",
    icon: "heroicons:wrench-screwdriver-20-solid",
    showDate: true,
    progress: null,
});

// Fallback zu i18n wenn keine Props übergeben werden
const displayTitle = computed(() => props.title || t("common.underConstruction.title"));
const displayMessage = computed(() => props.message || t("common.underConstruction.message"));
</script>

<template>
    <div
        class="mx-auto max-w-2xl animate-fade-in-up rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-lg dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 sm:p-12"
    >
        <!-- Icon -->
        <div class="mb-6 flex justify-center">
            <div
                class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
            >
                <Icon :name="icon" size="40" class="text-white" />
            </div>
        </div>

        <!-- Title -->
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {{ displayTitle }}
        </h2>

        <!-- Message -->
        <p class="mb-6 text-center text-gray-600 dark:text-gray-400">
            {{ displayMessage }}
        </p>

        <!-- Progress Bar (optional) -->
        <div
            v-if="progress !== null"
            class="mb-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        >
            <div
                class="h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
                :style="`width: ${Math.min(100, Math.max(0, progress))}%`"
            />
        </div>

        <!-- Date (optional) -->
        <p v-if="showDate" class="text-center text-sm text-gray-500 dark:text-gray-500">
            {{ t("common.underConstruction.checkBack") }}
        </p>
    </div>
</template>

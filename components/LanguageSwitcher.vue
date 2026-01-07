<template>
    <div ref="dropdownRef" class="relative">
        <!-- Trigger Button -->
        <button
            :aria-label="$t('nav.switchLanguage')"
            class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            @click="toggleDropdown"
        >
            <span class="text-lg">{{ currentLocaleInfo.flag }}</span>
            <span class="hidden sm:inline">{{ currentLocaleInfo.name }}</span>
            <svg
                class="h-4 w-4 transition-transform"
                :class="{ 'rotate-180': isOpen }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>

        <!-- Dropdown Menu -->
        <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="isOpen"
                class="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
                <button
                    v-for="loc in locales"
                    :key="loc.code"
                    class="flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    :class="
                        loc.code === locale
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                    "
                    @click="switchLocale(loc.code)"
                >
                    <span class="text-lg">{{ localeInfo[loc.code]?.flag }}</span>
                    <span class="flex-1 text-left">{{ localeInfo[loc.code]?.name }}</span>
                    <svg
                        v-if="loc.code === locale"
                        class="h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </button>
                <!-- Future Languages (Coming Soon) -->
                <div
                    v-if="futureLocales.length > 0"
                    class="border-t border-gray-200 dark:border-gray-800 mt-1 pt-1"
                >
                    <div
                        class="px-4 py-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-500"
                    >
                        {{ $t("nav.comingSoon") }}
                    </div>
                    <button
                        v-for="futureLoc in futureLocales"
                        :key="futureLoc.code"
                        disabled
                        class="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-500 dark:text-gray-600 cursor-not-allowed opacity-50"
                    >
                        <span class="text-lg opacity-50">{{ futureLoc.flag }}</span>
                        <span class="flex-1 text-left">{{ futureLoc.name }}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-600">Soon</span>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();
const settingsStore = useSettingsStore();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// VueUse onClickOutside
onClickOutside(dropdownRef, () => {
    isOpen.value = false;
});

interface LocaleInfo {
    code: string;
    name: string;
    flag: string;
}

const localeInfo = {
    en: { code: "en", name: "English", flag: "🇬🇧" },
    de: { code: "de", name: "Deutsch", flag: "🇩🇪" },
} as const satisfies Record<string, LocaleInfo>;

const futureLocales = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
];

const currentLocaleInfo = computed((): LocaleInfo => {
    const key = locale.value as keyof typeof localeInfo;
    return localeInfo[key] ?? localeInfo.en;
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const switchLocale = (code: "en" | "de") => {
    settingsStore.setLocale(code);
    isOpen.value = false;
};
</script>

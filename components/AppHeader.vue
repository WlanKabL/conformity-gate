<template>
    <header
        class="sticky top-0 z-50 border-b border-gray-300 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-gray-900 dark:bg-black/80 dark:supports-backdrop-filter:bg-black/60"
    >
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <NuxtLink to="/" class="flex items-center gap-3 transition-opacity hover:opacity-80">
                <div
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-red-500 to-orange-600"
                >
                    <span class="text-2xl font-bold text-white">🎲</span>
                </div>
                <span class="hidden text-xl font-bold text-gray-900 dark:text-white sm:block"
                    >Universal Jenga</span
                >
            </NuxtLink>

            <nav class="hidden items-center gap-6 md:flex">
                <NuxtLink
                    to="/modes"
                    class="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    {{ $t("nav.modes") }}
                </NuxtLink>
                <NuxtLink
                    to="/rules"
                    class="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    {{ $t("nav.rules") }}
                </NuxtLink>
                <NuxtLink
                    to="/pricing"
                    class="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    {{ $t("nav.pricing") }}
                </NuxtLink>
                <NuxtLink
                    to="/faq"
                    class="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    {{ $t("nav.faq") }}
                </NuxtLink>
            </nav>

            <div class="flex items-center gap-3">
                <ThemeSwitcher class="hidden sm:block" />

                <LanguageSwitcher class="hidden sm:block" />

                <NuxtLink
                    to="/create"
                    class="rounded-lg bg-linear-to-r from-red-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-red-500/50"
                >
                    {{ $t("nav.play") }}
                </NuxtLink>

                <button
                    class="rounded-md p-2 text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white md:hidden"
                    :aria-label="$t('nav.menu')"
                    @click="toggleMobileMenu"
                >
                    <svg
                        v-if="!isMobileMenuOpen"
                        class="h-6 w-6"
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
                    <svg
                        v-else
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="isMobileMenuOpen"
                class="border-t border-gray-300 bg-white dark:border-gray-900 dark:bg-black md:hidden"
            >
                <nav class="space-y-1 px-4 py-3">
                    <NuxtLink
                        to="/modes"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                        @click="closeMobileMenu"
                    >
                        {{ $t("nav.modes") }}
                    </NuxtLink>
                    <NuxtLink
                        to="/rules"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                        @click="closeMobileMenu"
                    >
                        {{ $t("nav.rules") }}
                    </NuxtLink>
                    <NuxtLink
                        to="/pricing"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                        @click="closeMobileMenu"
                    >
                        {{ $t("nav.pricing") }}
                    </NuxtLink>
                    <NuxtLink
                        to="/faq"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                        @click="closeMobileMenu"
                    >
                        {{ $t("nav.faq") }}
                    </NuxtLink>

                    <div class="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                        <div class="flex items-center justify-between px-3 py-2">
                            <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{
                                $t("nav.theme")
                            }}</span>
                            <ThemeSwitcher />
                        </div>
                        <div class="px-3 py-2">
                            <LanguageSwitcher />
                        </div>
                    </div>
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

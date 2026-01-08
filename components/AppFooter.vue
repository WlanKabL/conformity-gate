<template>
    <footer class="border-t border-gray-300 bg-white dark:border-gray-900 dark:bg-black">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-red-500 to-orange-600"
                        >
                            <span class="text-2xl font-bold text-white">🎲</span>
                        </div>
                        <span class="text-lg font-bold text-gray-900 dark:text-white"
                            >conformity-gate.com</span
                        >
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-500">
                        {{ $t("footer.tagline") }}
                    </p>
                    <div class="flex gap-3">
                        <a
                            href="https://github.com/WlanKabL/conformity-gate"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-black dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-white"
                            aria-label="GitHub"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-black dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-white"
                            aria-label="Instagram"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-black dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-white"
                            aria-label="TikTok"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h3
                        class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600"
                    >
                        {{ $t("footer.product") }}
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/evidence"
                                class="text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
                            >
                                {{ $t("footer.evidence") }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/timeline"
                                class="text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
                            >
                                {{ $t("footer.timeline") }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/chat"
                                class="text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
                            >
                                {{ $t("footer.chat") }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3
                        class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600"
                    >
                        {{ $t("footer.support") }}
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/faq"
                                class="text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
                            >
                                {{ $t("footer.faq") }}
                            </NuxtLink>
                        </li>
                        <li>
                            <a
                                href="mailto:support@conformity-gate.com"
                                class="text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
                            >
                                {{ $t("footer.contact") }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3
                        class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600"
                    >
                        {{ $t("footer.legal") }}
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/legal/privacy"
                                class="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                {{ $t("footer.privacy") }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/legal/terms"
                                class="text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
                            >
                                {{ $t("footer.terms") }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/legal/imprint"
                                class="text-sm text-gray-600 transition-colors hover:text-black dark:text-gray-500 dark:hover:text-white"
                            >
                                {{ $t("footer.imprint") }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 border-t border-gray-300 dark:border-gray-900 pt-8">
                <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p class="text-sm text-gray-600 dark:text-gray-500">
                        {{ $t("footer.copyright", { year: currentYear }) }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-600">
                        {{ $t("footer.madeWith") }} ❤️
                        {{ $t("footer.inGermany") }}
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

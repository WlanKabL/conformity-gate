<template>
    <div class="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
        <!-- Animated background -->
        <div class="fixed inset-0 bg-gradient-to-b from-black via-red-950/5 to-black"></div>

        <!-- Scanlines overlay -->
        <div class="fixed inset-0 scanlines pointer-events-none opacity-20"></div>

        <!-- Vignette -->
        <div
            class="fixed inset-0 pointer-events-none"
            style="box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.8)"
        ></div>

        <!-- Content -->
        <div class="relative z-10 text-center px-4 max-w-2xl">
            <h1 class="stranger-title text-6xl sm:text-7xl md:text-8xl mb-8 text-red-600">
                404
            </h1>

            <h2 class="text-2xl sm:text-3xl md:text-4xl mb-6 text-white">
                Lost in the Upside Down
            </h2>

            <p class="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed">
                The page you're looking for has disappeared into another dimension.
                <br class="hidden sm:block" />
                Maybe it never existed... or maybe it's hiding.
            </p>

            <NuxtLink
                to="/"
                class="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-mono uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] border-2 border-red-600 hover:border-red-400"
            >
                Return to Safety
            </NuxtLink>

            <p class="mt-12 text-sm text-gray-600 font-mono">
                Error Code: DEMOGORGON_NOT_FOUND
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: "404 - Lost in the Upside Down | Conformity Gate",
    meta: [
        {
            name: "description",
            content: "Page not found. Lost in the Upside Down.",
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
        0 0 40px rgba(220, 38, 38, 0.5),
        0 0 60px rgba(220, 38, 38, 0.3);
    animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
    0%,
    100% {
        text-shadow:
            0 0 20px rgba(220, 38, 38, 0.8),
            0 0 40px rgba(220, 38, 38, 0.5),
            0 0 60px rgba(220, 38, 38, 0.3);
    }
    50% {
        text-shadow:
            0 0 30px rgba(220, 38, 38, 1),
            0 0 60px rgba(220, 38, 38, 0.7),
            0 0 90px rgba(220, 38, 38, 0.5);
    }
}
</style>

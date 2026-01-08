<template>
    <div class="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
        <div class="fixed inset-0 bg-gradient-to-b from-black via-red-950/5 to-black"></div>
        <div class="fixed inset-0 scanlines pointer-events-none opacity-20"></div>

        <div
            class="relative z-10 max-w-md w-full mx-4 p-8 bg-black border-2 border-red-600 rounded-lg"
        >
            <h1 class="text-red-600 stranger-title text-4xl mb-6 text-center">ADMIN ACCESS</h1>

            <form @submit.prevent="login" class="space-y-4">
                <input
                    v-model="password"
                    type="password"
                    placeholder="Admin Password"
                    required
                    class="w-full px-4 py-3 bg-black/60 border-2 border-red-900/30 focus:border-red-600 rounded-lg text-gray-300 placeholder-gray-600 outline-none transition-colors"
                />

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all uppercase text-sm tracking-wider"
                >
                    {{ loading ? "Verifying..." : "Login" }}
                </button>
            </form>

            <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "~/stores/useAdminStore";

const adminStore = useAdminStore();
const password = ref("");
const loading = ref(false);
const error = ref("");

const login = async () => {
    loading.value = true;
    error.value = "";

    const success = await adminStore.login(password.value);

    if (success) {
        navigateTo("/chat");
    } else {
        error.value = "Invalid password";
    }

    loading.value = false;
};

useHead({
    title: "Admin Access - Conformity Gate",
});
</script>

<style scoped>
@font-face {
    font-family: "Stranger Things";
    src: url("/assets/Stranger Things Outlined.ttf") format("truetype");
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

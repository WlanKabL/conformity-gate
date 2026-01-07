<template>
    <div class="flex min-h-screen flex-col">
        <!-- Main Content -->
        <main class="flex-1">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
// Store auto-initializes
useSettingsStore();
</script>

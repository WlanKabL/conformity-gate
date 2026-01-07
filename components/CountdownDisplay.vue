<template>
    <div class="w-full max-w-4xl mx-auto">
        <div class="text-center mb-8">
            <h2 class="text-3xl sm:text-4xl md:text-5xl text-red-600 stranger-title mb-4">
                Episode 9 Countdown
            </h2>
            <p class="text-gray-400 text-sm sm:text-base">The truth will be revealed...</p>
        </div>

        <div class="flex items-center justify-center gap-3 sm:gap-6 md:gap-12">
            <!-- Days -->
            <div class="countdown-unit">
                <div class="countdown-number">{{ String(days).padStart(2, "0") }}</div>
                <div class="countdown-label">Days</div>
            </div>

            <div class="countdown-separator">:</div>

            <!-- Hours -->
            <div class="countdown-unit">
                <div class="countdown-number">{{ String(hours).padStart(2, "0") }}</div>
                <div class="countdown-label">Hours</div>
            </div>

            <div class="countdown-separator">:</div>

            <!-- Minutes -->
            <div class="countdown-unit">
                <div class="countdown-number">{{ String(minutes).padStart(2, "0") }}</div>
                <div class="countdown-label">Minutes</div>
            </div>

            <div class="countdown-separator">:</div>

            <!-- Seconds -->
            <div class="countdown-unit">
                <div class="countdown-number">{{ String(seconds).padStart(2, "0") }}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    targetDate: number;
}>();

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const emit = defineEmits<{
    (e: "countdownEnd"): void;
}>();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = props.targetDate - now;

    if (distance > 0) {
        days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
    } else {
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
        emit("countdownEnd");
    }
};

onMounted(() => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
</script>

<style scoped>
@font-face {
    font-family: "Stranger Things";
    src: url("/assets/Stranger Things Outlined.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: "Benguiat";
    src: url("/assets/Benguiat Bold.ttf") format("truetype");
    font-weight: bold;
    font-style: normal;
}

.stranger-title {
    font-family: "Stranger Things", cursive;
    text-shadow:
        0 0 20px rgba(220, 38, 38, 0.8),
        0 0 40px rgba(220, 38, 38, 0.5);
    letter-spacing: 0.05em;
}

.countdown-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.countdown-number {
    font-family: "Benguiat", "Courier New", monospace;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    color: #dc2626;
    line-height: 1;
    text-shadow:
        0 0 20px rgba(220, 38, 38, 0.6),
        0 0 40px rgba(220, 38, 38, 0.3);
    animation: numberPulse 2s ease-in-out infinite;
}

.countdown-separator {
    font-family: "Benguiat", "Courier New", monospace;
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 700;
    color: #991b1b;
    line-height: 1;
    opacity: 0.5;
    margin: 0 -0.5rem;
    align-self: flex-start;
    padding-top: clamp(0.5rem, 1.5vw, 1rem);
    animation: separatorBlink 2s ease-in-out infinite;
}

.countdown-label {
    font-family: "Courier New", monospace;
    font-size: clamp(0.6rem, 1.5vw, 0.875rem);
    font-weight: 400;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

@keyframes numberPulse {
    0%,
    100% {
        opacity: 0.9;
    }
    50% {
        opacity: 1;
    }
}

@keyframes separatorBlink {
    0%,
    45%,
    55%,
    100% {
        opacity: 0.5;
    }
    50% {
        opacity: 0.2;
    }
}
</style>

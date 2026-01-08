<template>
    <div class="relative min-h-screen overflow-hidden bg-black">
        <!-- Background audio -->
        <audio ref="audioElement" src="/assets/vecnalives.mp3" loop autoplay />

        <!-- Animated background -->
        <div class="fixed inset-0 bg-gradient-to-b from-black via-red-950/5 to-black"></div>

        <!-- Scanlines overlay -->
        <div class="fixed inset-0 scanlines pointer-events-none opacity-20"></div>

        <!-- Vignette -->
        <div
            class="fixed inset-0 pointer-events-none"
            style="box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.8)"
        ></div>

        <!-- Lightning canvas -->
        <canvas
            ref="lightningCanvas"
            class="fixed inset-0 pointer-events-none"
            style="z-index: 1"
        ></canvas>

        <!-- Header -->
        <AppHeader />

        <!-- Main content -->
        <div
            class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 pt-32"
        >
            <div class="max-w-6xl w-full text-center space-y-20">
                <!-- Logo/Title -->
                <div>
                    <h1
                        ref="titleElement"
                        class="text-red-600 stranger-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 transition-transform duration-[5000ms]"
                    >
                        CONFORMITY GATE
                    </h1>
                    <p
                        class="text-red-600 text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase animate-pulse"
                    >
                        The Upside Down Awaits
                    </p>
                </div>

                <!-- Countdown or Result -->
                <div>
                    <CountdownDisplay
                        v-if="!countdownEnded"
                        :targetDate="targetDate"
                        @countdownEnd="handleCountdownEnd"
                    />
                    <ResultDisplay v-else :status="episodeStatus" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const lightningCanvas = ref<HTMLCanvasElement | null>(null);
const titleElement = ref<HTMLElement | null>(null);
const episodeStatus = ref<string | false | null>(false);

// 8. Januar 2026, 02:00 Uhr (Deine Zeitzone - CET/CEST)
const targetDate = new Date("2026-01-08T02:00:00").getTime();

// Computed: Check if countdown has ended
const countdownEnded = computed(() => new Date().getTime() >= targetDate);

const handleCountdownEnd = async () => {
    // Fetch episode status from API
    await fetchEpisodeStatus();
};

const fetchEpisodeStatus = async () => {
    try {
        const response = await fetch("/episode-status.json");
        const data = await response.json();
        episodeStatus.value = data.released;
    } catch (error) {
        console.error("Failed to fetch episode status:", error);
        episodeStatus.value = null; // Show waiting state on error
    }
};

// If countdown already ended, fetch status immediately
if (countdownEnded.value) {
    fetchEpisodeStatus();
}

onMounted(() => {
    // Konami Code Easter Egg
    let konamiCode: string[] = [];
    const konamiSequence = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "KeyB",
        "KeyA",
    ];

    const handleKonami = (e: KeyboardEvent) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(",") === konamiSequence.join(",")) {
            if (titleElement.value) {
                titleElement.value.classList.add("upside-down-mode");
                setTimeout(() => {
                    titleElement.value?.classList.remove("upside-down-mode");
                }, 5000);
            }
        }
    };

    if (typeof window !== "undefined") {
        window.addEventListener("keydown", handleKonami);
    }

    // Lightning animation
    if (!lightningCanvas.value) return;

    const canvas = lightningCanvas.value;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Lightning {
        x: number;
        y: number;
        segments: Array<{ x1: number; y1: number; x2: number; y2: number }>;
        opacity: number;
        fadeSpeed: number;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.segments = [];
            this.opacity = 1;
            this.fadeSpeed = 0.03 + Math.random() * 0.05;
            this.generate();
        }

        generate() {
            let currentX = this.x;
            let currentY = this.y;
            const segmentLength = 30 + Math.random() * 50;

            for (let i = 0; i < 15; i++) {
                const nextX = currentX + (Math.random() - 0.5) * 60;
                const nextY = currentY + segmentLength;
                this.segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
                currentX = nextX;
                currentY = nextY;
            }
        }

        draw() {
            if (!ctx) return;
            ctx.strokeStyle = `rgba(255, ${50 + Math.random() * 50}, ${50 + Math.random() * 50}, ${this.opacity})`;
            ctx.lineWidth = 2 + Math.random() * 2;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#ff0000";

            this.segments.forEach((segment) => {
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();
            });

            this.opacity -= this.fadeSpeed;
        }

        isDead() {
            return this.opacity <= 0;
        }
    }

    const lightnings: Lightning[] = [];
    let lastLightning = 0;

    const animate = (timestamp: number) => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (timestamp - lastLightning > 2000 + Math.random() * 4000) {
            lightnings.push(new Lightning());
            lastLightning = timestamp;
        }

        for (let i = lightnings.length - 1; i >= 0; i--) {
            lightnings[i].draw();
            if (lightnings[i].isDead()) {
                lightnings.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    };

    animate(0);
});

useHead({
    title: "Conformity Gate - Stranger Things Episode 9 Evidence",
    meta: [
        {
            name: "description",
            content:
                "Support group for Conformity Gate believers. Evidence chain, chatroom, timeline, and Netflix status check for the hidden Stranger Things Episode 9.",
        },
        {
            name: "keywords",
            content:
                "Stranger Things, Conformity Gate, Episode 9, Hawkins, Upside Down, Netflix, Support Group, Evidence",
        },
        // Open Graph / Facebook
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:title",
            content: "Conformity Gate - The Hidden Episode 9",
        },
        {
            property: "og:description",
            content:
                "Support group for Conformity Gate believers. We know Episode 9 exists. Join us.",
        },
        {
            property: "og:site_name",
            content: "Conformity Gate",
        },
        // Twitter
        {
            name: "twitter:card",
            content: "summary_large_image",
        },
        {
            name: "twitter:title",
            content: "Conformity Gate - The Hidden Episode 9",
        },
        {
            name: "twitter:description",
            content:
                "Support group for Conformity Gate believers. Evidence chain, timeline, and more.",
        },
        // Theme
        {
            name: "theme-color",
            content: "#000000",
        },
        {
            name: "msapplication-TileColor",
            content: "#dc2626",
        },
    ],
});
</script>

<style scoped>
/* Import custom fonts */
@font-face {
    font-family: "Stranger Things";
    src: url("/assets/Stranger Things Outlined.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

/* Scanlines effect */
.scanlines {
    background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
    );
}

/* Stranger Things title */
.stranger-title {
    font-family: "Stranger Things", cursive;
    text-shadow:
        0 0 20px rgba(220, 38, 38, 0.8),
        0 0 40px rgba(220, 38, 38, 0.5),
        0 0 60px rgba(220, 38, 38, 0.3),
        0 0 80px rgba(220, 38, 38, 0.2);
    letter-spacing: 0.05em;
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

/* Upside Down Easter Egg */
.stranger-title.upside-down-mode {
    animation: upsideDownEffect 5s ease-in-out;
}

@keyframes upsideDownEffect {
    0% {
        transform: rotate(0deg) scale(1);
        color: #dc2626;
        opacity: 1;
    }
    10% {
        color: #6b7280;
        opacity: 0.3;
    }
    15% {
        opacity: 1;
    }
    20% {
        opacity: 0.4;
    }
    25% {
        transform: rotate(180deg) scale(0.9);
        color: #6b7280;
        opacity: 1;
    }
    30% {
        opacity: 0.5;
    }
    35% {
        opacity: 1;
    }
    40% {
        opacity: 0.6;
    }
    50% {
        transform: rotate(180deg) scale(1);
        color: #6b7280;
        opacity: 1;
    }
    55% {
        opacity: 0.4;
    }
    60% {
        opacity: 1;
    }
    65% {
        opacity: 0.5;
    }
    75% {
        transform: rotate(360deg) scale(1.1);
        color: #6b7280;
        opacity: 1;
    }
    80% {
        opacity: 0.3;
    }
    85% {
        opacity: 1;
    }
    90% {
        opacity: 0.6;
    }
    100% {
        transform: rotate(360deg) scale(1);
        color: #dc2626;
        opacity: 1;
    }
}
</style>

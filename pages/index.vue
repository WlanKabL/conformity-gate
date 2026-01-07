<template>
    <div class="relative min-h-screen overflow-hidden bg-black">
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

        <!-- Main content -->
        <div
            class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20"
        >
            <div class="max-w-6xl w-full text-center space-y-20">
                <!-- Title with Stranger Things font -->
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

                <!-- Countdown - minimal style -->
                <div class="relative max-w-4xl mx-auto">
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
                            <div class="countdown-number">
                                {{ String(minutes).padStart(2, "0") }}
                            </div>
                            <div class="countdown-label">Minutes</div>
                        </div>

                        <div class="countdown-separator">:</div>

                        <!-- Seconds -->
                        <div class="countdown-unit">
                            <div class="countdown-number">
                                {{ String(seconds).padStart(2, "0") }}
                            </div>
                            <div class="countdown-label">Seconds</div>
                        </div>
                    </div>
                </div>

                <!-- Description - clean and minimal -->
                <div class="max-w-3xl mx-auto space-y-6 text-gray-400">
                    <p class="text-base sm:text-lg md:text-xl leading-relaxed">
                        This countdown is just a placeholder. Before it reaches zero, I'm building
                        something real here. Not just another "touch grass" message, but an actual
                        website.
                    </p>

                    <p class="text-sm sm:text-base md:text-lg leading-relaxed opacity-75">
                        A support group for Conformity Gate believers. A chatroom where we can
                        comfort each other if we turn out to be wrong (which won't happen, trust
                        me). The complete evidence chain from every episode pointing to Episode 9. A
                        timeline of Stranger Things from beginning to end. A submission area for new
                        clues. And when the countdown ends: a global status check whether Netflix
                        has released the new episode. If netflix.com crashes, just check here.
                    </p>

                    <p class="text-xs sm:text-sm md:text-base leading-relaxed opacity-50 italic">
                        Racing against the clock to finish the Conformity Gate support group before
                        the countdown hits zero. See you on the other side.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const lightningCanvas = ref<HTMLCanvasElement | null>(null);
const titleElement = ref<HTMLElement | null>(null);

// 8. Januar 2026, 02:00 Uhr (Deine Zeitzone - CET/CEST)
// Das entspricht 7. Januar 2026, 18:00 Uhr PT (Pacific Time)
const targetDate = new Date("2026-01-08T02:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

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
    }
};

onMounted(() => {
    updateCountdown();
    setInterval(updateCountdown, 1000);

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

@font-face {
    font-family: "Benguiat";
    src: url("/assets/Benguiat Bold.ttf") format("truetype");
    font-weight: bold;
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

/* Countdown styling - minimal and clean */
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

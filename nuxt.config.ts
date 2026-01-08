import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    ssr: false,
    spaLoadingTemplate: resolve(__dirname, "./app/spa-loading-template.html"),
    css: ["~/assets/tailwind.css"],
    devtools: { enabled: true },
    experimental: {
        typedPages: true,
    },
    app: {
        head: {
            script: [
                {
                    innerHTML: `(function(){try{const t=localStorage.getItem('conformity_gate_theme');if(t&&JSON.parse(t)==='dark'){document.documentElement.classList.add('dark');}}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
                    type: "text/javascript",
                },
            ],
        },
    },
    modules: [
        "@nuxt/eslint",
        "@nuxt/hints",
        "@nuxt/image",
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "@nuxtjs/i18n",
        "nuxt-typed-router",
        "@nuxt/icon",
        "@nuxtjs/sitemap",
    ],
    typescript: {
        strict: true,
        // tsConfig: { include: ["../.eslintrc.*"] },
        typeCheck: false,
    },
    i18n: {
        locales: [
            {
                code: "en",
                language: "en-US",
                name: "English",
                files: ["en.json"],
            },
            {
                code: "de",
                language: "de-DE",
                name: "Deutsch",
                files: ["de.json"],
            },
        ],
        defaultLocale: "en",
        detectBrowserLanguage: false,
        strategy: "no_prefix",
    },
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL || "http://localhost:3000",
        },
    },
    site: {
        url: "https://conformity-gate.com",
        name: "Conformity Gate",
        description:
            "Investigating the hidden Stranger Things Episode 9 - Evidence, community, and the truth Netflix doesn't want you to see",
        defaultLocale: "en",
    },
    sitemap: {
        strictNuxtContentPaths: true,
        autoLastmod: true,
        sources: ["/api/__sitemap__/urls"],
    },
    alias: {
        "@": resolve(__dirname, "."),
        "~": resolve(__dirname, "."),
    },
    vite: {
        build: {
            minify: true,
        },
        plugins: [tailwindcss()],
    },
});

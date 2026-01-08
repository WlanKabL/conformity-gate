import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", {
    state: () => ({
        isAdmin: false,
        token: null as string | null,
        verified: false,
    }),

    actions: {
        async login(password: string) {
            try {
                const response = await $fetch("/api/admin-login", {
                    method: "POST",
                    body: { password },
                });

                this.token = response.token;
                this.isAdmin = true;
                this.verified = true;

                // Store in localStorage
                localStorage.setItem("conformity-admin-token", response.token);

                return true;
            } catch (error) {
                console.error("Login failed:", error);
                return false;
            }
        },

        async verifyToken() {
            const storedToken = localStorage.getItem("conformity-admin-token");

            if (!storedToken) {
                this.isAdmin = false;
                this.verified = true;
                return false;
            }

            try {
                const response = await $fetch("/api/admin-verify", {
                    method: "POST",
                    body: { token: storedToken },
                });

                if (response.valid) {
                    this.token = storedToken;
                    this.isAdmin = true;
                    this.verified = true;
                    return true;
                }
            } catch (error) {
                // Invalid token - clear it
                localStorage.removeItem("conformity-admin-token");
                this.isAdmin = false;
                this.token = null;
            }

            this.verified = true;
            return false;
        },

        logout() {
            this.isAdmin = false;
            this.token = null;
            this.verified = false;
            localStorage.removeItem("conformity-admin-token");
        },
    },
});

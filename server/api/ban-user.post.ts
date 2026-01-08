import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const BANNED_USERS_FILE = join(process.cwd(), "data", "banned-users.json");
const BANNED_IPS_FILE = join(process.cwd(), "data", "banned-ips.json");

async function ensureFiles() {
    const dir = join(process.cwd(), "data");
    if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
    }
    if (!existsSync(BANNED_USERS_FILE)) {
        await writeFile(BANNED_USERS_FILE, JSON.stringify([], null, 2));
    }
    if (!existsSync(BANNED_IPS_FILE)) {
        await writeFile(BANNED_IPS_FILE, JSON.stringify([], null, 2));
    }
}

async function loadBannedUsers(): Promise<string[]> {
    await ensureFiles();
    const content = await readFile(BANNED_USERS_FILE, "utf-8");
    return JSON.parse(content);
}

async function loadBannedIPs(): Promise<string[]> {
    await ensureFiles();
    const content = await readFile(BANNED_IPS_FILE, "utf-8");
    return JSON.parse(content);
}

async function saveBannedUsers(users: string[]) {
    await writeFile(BANNED_USERS_FILE, JSON.stringify(users, null, 2));
}

async function saveBannedIPs(ips: string[]) {
    await writeFile(BANNED_IPS_FILE, JSON.stringify(ips, null, 2));
}

import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const adminPassword = process.env.ADMIN_PASSWORD || "conformity2026";
    const jwtSecret = process.env.JWT_SECRET || "conformity-gate-secret";

    // Verify admin via JWT or password
    let isAuthorized = false;

    if (body.adminToken) {
        try {
            const decoded = jwt.verify(body.adminToken, jwtSecret) as { admin: boolean };
            isAuthorized = decoded.admin === true;
        } catch (error) {
            // Invalid token
        }
    }

    if (!isAuthorized && body.password === adminPassword) {
        isAuthorized = true;
    }

    if (!isAuthorized) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized",
        });
    }

    if (!body.username) {
        throw createError({
            statusCode: 400,
            statusMessage: "Username required",
        });
    }

    try {
        const bannedUsers = await loadBannedUsers();
        const bannedIPs = await loadBannedIPs();

        // Add username to ban list
        const usernameLower = body.username.toLowerCase();
        if (!bannedUsers.includes(usernameLower)) {
            bannedUsers.push(usernameLower);
            await saveBannedUsers(bannedUsers);
        }

        // Add IP to ban list if provided
        if (body.ip && !bannedIPs.includes(body.ip)) {
            bannedIPs.push(body.ip);
            await saveBannedIPs(bannedIPs);
        }

        return {
            success: true,
            bannedUser: body.username,
            bannedIP: body.ip || null,
        };
    } catch (error) {
        console.error("Ban error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to ban user",
        });
    }
});

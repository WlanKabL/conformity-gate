import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import type { ChatMessage } from "~/types/chat";
import { BAD_WORDS } from "~/types/chat";

const MESSAGES_FILE = join(process.cwd(), "data", "messages.json");
const BANNED_USERS_FILE = join(process.cwd(), "data", "banned-users.json");
const BANNED_IPS_FILE = join(process.cwd(), "data", "banned-ips.json");
const MAX_MESSAGES = 1000;

async function ensureMessagesFile() {
    const dir = join(process.cwd(), "data");

    if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
    }

    if (!existsSync(MESSAGES_FILE)) {
        await writeFile(MESSAGES_FILE, JSON.stringify([], null, 2));
    }

    if (!existsSync(BANNED_USERS_FILE)) {
        await writeFile(BANNED_USERS_FILE, JSON.stringify([], null, 2));
    }

    if (!existsSync(BANNED_IPS_FILE)) {
        await writeFile(BANNED_IPS_FILE, JSON.stringify([], null, 2));
    }
}

async function loadMessages(): Promise<ChatMessage[]> {
    await ensureMessagesFile();
    const content = await readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(content);
}

async function saveMessages(messages: ChatMessage[]) {
    // Keep only last MAX_MESSAGES
    const trimmed = messages.slice(-MAX_MESSAGES);
    await writeFile(MESSAGES_FILE, JSON.stringify(trimmed, null, 2));
}

async function loadBannedUsers(): Promise<string[]> {
    await ensureMessagesFile();
    const content = await readFile(BANNED_USERS_FILE, "utf-8");
    return JSON.parse(content);
}

async function loadBannedIPs(): Promise<string[]> {
    await ensureMessagesFile();
    const content = await readFile(BANNED_IPS_FILE, "utf-8");
    return JSON.parse(content);
}

function containsBadWord(text: string): boolean {
    const lowerText = text.toLowerCase();
    return BAD_WORDS.some((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "i");
        return regex.test(lowerText);
    });
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.username || !body.content) {
        throw createError({
            statusCode: 400,
            statusMessage: "Username and content are required",
        });
    }

    // Extract IP address for tracking and banning
    const ip =
        getRequestHeader(event, "x-forwarded-for")?.split(",")[0].trim() ||
        getRequestHeader(event, "x-real-ip") ||
        event.node.req.socket.remoteAddress ||
        "unknown";

    // Check if username is banned
    const bannedUsers = await loadBannedUsers();
    if (bannedUsers.includes(body.username.toLowerCase())) {
        throw createError({
            statusCode: 403,
            statusMessage: "USER_BANNED",
        });
    }

    // Check if IP is banned
    const bannedIPs = await loadBannedIPs();
    if (bannedIPs.includes(ip)) {
        throw createError({
            statusCode: 403,
            statusMessage: "IP_BANNED",
        });
    }

    // Validate username
    if (body.username.length < 2 || body.username.length > 20) {
        throw createError({
            statusCode: 400,
            statusMessage: "Username must be between 2 and 20 characters",
        });
    }

    // Block developer username unless admin
    if (body.username.toLowerCase().includes("wlankabl")) {
        const jwtSecret = process.env.JWT_SECRET || "conformity-gate-secret";
        const authHeader = getRequestHeader(event, "authorization");
        const token = authHeader?.replace("Bearer ", "") || body.adminToken;

        let isAdmin = false;
        if (token) {
            try {
                const decoded = jwt.verify(token, jwtSecret) as { admin: boolean };
                isAdmin = decoded.admin === true;
            } catch (error) {
                // Invalid token
            }
        }

        if (!isAdmin) {
            throw createError({
                statusCode: 400,
                statusMessage: "This username is reserved for the developer",
            });
        }
    }

    // Validate content
    if (body.content.length < 1 || body.content.length > 500) {
        throw createError({
            statusCode: 400,
            statusMessage: "Message must be between 1 and 500 characters",
        });
    }

    // Check for bad words
    if (containsBadWord(body.content) || containsBadWord(body.username)) {
        throw createError({
            statusCode: 400,
            statusMessage: "BAD_WORD_DETECTED",
        });
    }

    try {
        const messages = await loadMessages();

        const newMessage: ChatMessage = {
            id: nanoid(),
            username: body.username.trim(),
            content: body.content.trim(),
            timestamp: Date.now(),
            deleted: false,
            ip: ip,
            userAgent: getRequestHeader(event, "user-agent") || "unknown",
        };

        messages.push(newMessage);
        await saveMessages(messages);

        // Return message without sensitive metadata
        const { ip: _, userAgent: __, ...publicMessage } = newMessage;
        return publicMessage;
    } catch (error) {
        console.error("Error saving message:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to save message",
        });
    }
});

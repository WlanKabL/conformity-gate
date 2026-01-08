import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { nanoid } from "nanoid";
import type { ChatMessage } from "~/types/chat";
import { BAD_WORDS } from "~/types/chat";

const MESSAGES_FILE = join(process.cwd(), "data", "messages.json");
const MAX_MESSAGES = 1000;

async function ensureMessagesFile() {
    const dir = join(process.cwd(), "data");

    if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
    }

    if (!existsSync(MESSAGES_FILE)) {
        await writeFile(MESSAGES_FILE, JSON.stringify([], null, 2));
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

    // Validate username
    if (body.username.length < 2 || body.username.length > 20) {
        throw createError({
            statusCode: 400,
            statusMessage: "Username must be between 2 and 20 characters",
        });
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
        };

        messages.push(newMessage);
        await saveMessages(messages);

        return newMessage;
    } catch (error) {
        console.error("Error saving message:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to save message",
        });
    }
});

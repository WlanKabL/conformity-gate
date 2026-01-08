import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import type { ChatMessage } from "~/types/chat";

const MESSAGES_FILE = join(process.cwd(), "data", "messages.json");
const MAX_MESSAGES = 1000; // Keep last 1000 messages

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

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const since = query.since as string | undefined;
    const before = query.before as string | undefined;
    const limit = parseInt(query.limit as string) || 100;

    try {
        const messages = await loadMessages();

        let filteredMessages = messages;

        if (since) {
            // Get messages AFTER this ID (for polling newer messages)
            const sinceIndex = messages.findIndex((m) => m.id === since);
            if (sinceIndex !== -1) {
                filteredMessages = messages.slice(sinceIndex + 1);
            }
        } else if (before) {
            // Get messages BEFORE this ID (for loading older messages)
            const beforeIndex = messages.findIndex((m) => m.id === before);
            if (beforeIndex !== -1) {
                filteredMessages = messages.slice(0, beforeIndex);
            }
        }

        // Get last N messages in chronological order (oldest -> newest)
        const result = filteredMessages.slice(-limit);

        return {
            messages: result,
            hasMore: before ? filteredMessages.length > limit : messages.length > result.length,
            total: messages.length,
        };
    } catch (error) {
        console.error("Error loading messages:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to load messages",
        });
    }
});

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
    const limit = parseInt(query.limit as string) || 100;

    try {
        const messages = await loadMessages();

        // Filter by since ID if provided
        let filteredMessages = messages;
        if (since) {
            const sinceIndex = messages.findIndex((m) => m.id === since);
            if (sinceIndex !== -1) {
                filteredMessages = messages.slice(sinceIndex + 1);
            }
        }

        // Get last N messages (newest first, then reverse for chronological order)
        const result = filteredMessages.slice(-limit).reverse();

        return {
            messages: result,
            hasMore: messages.length > limit && !since,
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

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import jwt from "jsonwebtoken";
import type { ChatMessage } from "~/types/chat";

const MESSAGES_FILE = join(process.cwd(), "data", "messages.json");

async function loadMessages(): Promise<ChatMessage[]> {
    const content = await readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(content);
}

async function saveMessages(messages: ChatMessage[]) {
    await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const jwtSecret = process.env.JWT_SECRET || "conformity-gate-secret";

    // Verify admin via JWT
    let isAuthorized = false;

    if (body.adminToken) {
        try {
            const decoded = jwt.verify(body.adminToken, jwtSecret) as { admin: boolean };
            isAuthorized = decoded.admin === true;
        } catch (error) {
            // Invalid token
        }
    }

    if (!isAuthorized) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized",
        });
    }

    if (!body.messageId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Message ID required",
        });
    }

    try {
        const messages = await loadMessages();
        const message = messages.find((m) => m.id === body.messageId);

        if (!message) {
            throw createError({
                statusCode: 404,
                statusMessage: "Message not found",
            });
        }

        // Mark as deleted (keep original content for admin view)
        message.deleted = true;

        await saveMessages(messages);

        return {
            success: true,
            messageId: body.messageId,
        };
    } catch (error) {
        console.error("Delete error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to delete message",
        });
    }
});

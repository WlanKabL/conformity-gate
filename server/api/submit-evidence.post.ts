export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Discord Webhook URL - configure this in .env or here
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

    if (!DISCORD_WEBHOOK_URL) {
        throw createError({
            statusCode: 500,
            statusMessage: "Discord webhook not configured",
        });
    }

    // Validate required fields
    if (!body.title || !body.category || !body.description || !body.details) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing required fields",
        });
    }

    // Create Discord embed
    const embed = {
        title: `🔍 New Evidence: ${body.title}`,
        color: 0xdc2626, // Red color
        fields: [
            {
                name: "📂 Category",
                value: body.category,
                inline: true,
            },
            {
                name: "⭐ Credibility",
                value: `${"★".repeat(body.credibility)}${"☆".repeat(5 - body.credibility)}`,
                inline: true,
            },
            {
                name: "👤 Submitted By",
                value: body.submittedBy,
                inline: true,
            },
            {
                name: "📝 Description",
                value: body.description,
            },
            {
                name: "📊 Detailed Analysis",
                value:
                    body.details.length > 1000
                        ? body.details.substring(0, 1000) + "..."
                        : body.details,
            },
            {
                name: "🔑 Key Evidence",
                value: body.evidence.map((e: string, i: number) => `${i + 1}. ${e}`).join("\n"),
            },
        ],
        footer: {
            text: `Conformity Gate Evidence Submission`,
        },
        timestamp: new Date().toISOString(),
    };

    // Add optional fields
    if (body.season && body.episode) {
        embed.fields.splice(3, 0, {
            name: "📺 Reference",
            value: `Season ${body.season}, Episode ${body.episode}`,
            inline: false,
        });
    }

    if (body.tags && body.tags.length > 0) {
        embed.fields.push({
            name: "🏷️ Tags",
            value: body.tags.map((t: string) => `#${t}`).join(", "),
            inline: false,
        });
    }

    // Send to Discord
    try {
        await $fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            body: {
                embeds: [embed],
            },
        });

        return {
            success: true,
            message: "Evidence submitted successfully",
        };
    } catch (error) {
        console.error("Discord webhook error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to submit evidence to Discord",
        });
    }
});

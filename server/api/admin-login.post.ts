import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const adminPassword = process.env.ADMIN_PASSWORD || "conformity2026";
    const jwtSecret = process.env.JWT_SECRET || "conformity-gate-secret";

    if (!body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Password required",
        });
    }

    if (body.password !== adminPassword) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid password",
        });
    }

    // Generate JWT without expiry
    const token = jwt.sign(
        {
            admin: true,
            iat: Date.now(),
        },
        jwtSecret,
    );

    return {
        success: true,
        token,
    };
});

import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const jwtSecret = process.env.JWT_SECRET || "conformity-gate-secret";

    if (!body.token) {
        throw createError({
            statusCode: 400,
            statusMessage: "Token required",
        });
    }

    try {
        const decoded = jwt.verify(body.token, jwtSecret) as { admin: boolean };

        if (!decoded.admin) {
            throw createError({
                statusCode: 401,
                statusMessage: "Invalid token",
            });
        }

        return {
            valid: true,
            admin: true,
        };
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid or expired token",
        });
    }
});

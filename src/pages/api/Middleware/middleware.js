import jwt from "jsonwebtoken";

export async function verifyAuth(req) {
    const token =
        req.cookies?.authToken ||
        req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return {
            error: "Unauthorized: Token required",
            status: 401,
        };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);        
        req.user = decoded;
        return null;
    } catch (error) {
        return {
            error: "Unauthorized: Invalid token",
            status: 403,
        };
    }
}

export async function verifyRole(req, role) {
    if (!req.user) {
        return { error: "Unauthorized: Token required", status: 401 };
    }
    if (!role.includes(req.user.role)) {
        return { error: `Forbidden: Access denied for ${role}`, status: 403 };
    }
    return null;
}


export function generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    return token;
}
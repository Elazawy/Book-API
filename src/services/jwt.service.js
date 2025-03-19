import jwt from 'jsonwebtoken';

export const generateToken = (name, email, id) => {
    const payload = { name, email, id };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET must be defined in environment variables");
    }
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
};
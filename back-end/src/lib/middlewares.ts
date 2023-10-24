import { rateLimit } from 'express-rate-limit';
import jwt from 'jsonwebtoken';

export const verifyJwt = (req, res, next)=> {
    const token = req.headers["x-api-key"];
    if (!token) {
        return res.status(401).json({ error: "No JWT provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.sub;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid JWT" });
    }
}

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
});
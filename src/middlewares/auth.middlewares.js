import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401);
        }

        const parts = authorization.split(' ');

        if (parts.length !== 2) {
            return res.status(401);
        }

        const [scheme, token] = parts;

        if (scheme !== 'Bearer') {
            return res.status(401);
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid token' });
            }

            const user = await userService.findByIdService(decoded.id);

            if (!user) {
                return res.status(401).send({ message: 'User not found' });
            }

            req.userId = user.id;

            return next();
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

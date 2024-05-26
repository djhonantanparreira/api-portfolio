import { findByIdService } from "../services/user.service.js";

export const isAdmin = async (req, res, next) => {
    try {
        const user = await findByIdService(req.userId);
        if (user.role === 'admin') {
            return next();
        }
        return res.status(403).json({ message: 'Admin permission required' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
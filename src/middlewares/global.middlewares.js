import mongoose from 'mongoose';
import { findByIdService } from '../services/user.service.js';

export const validId = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    next();
}

export const validUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await findByIdService(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    req.id = id;
    req.user = user;

    next();
}
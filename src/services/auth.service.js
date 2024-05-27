import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginService = (email) => User.findOne({ email }).select('+password');

export const generateTokens = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 86400 });
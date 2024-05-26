import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginService = (email) => User.findOne({ email }).select('+password');

export const generateTokens = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
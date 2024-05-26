import User from '../models/User.js';

export const createService = (body) => User.create(body);
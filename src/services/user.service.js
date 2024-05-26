import User from '../models/User.js';

export const createService = (body) => User.create(body);

export const findAllService = () => User.find();

export const findByIdService = (id) => User.findById(id);

export const updateService = (id, name, email, password) => User.findOneAndUpdate({ _id: id }, { name, email, password });
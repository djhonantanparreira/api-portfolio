import Project from '../models/Project.js';

export const createProjectService = (body) => Project.create(body);

export const findAllProjectsService = (offset, limit) => Project.find().sort({ createdAt: -1 }).skip(offset).limit(limit);

export const countProjectsService = () => Project.countDocuments();
import Project from '../models/Project.js';

export const createProjectService = (body) => Project.create(body);

export const findAllProjectsService = (offset, limit) => Project.find().sort({ createdAt: -1 }).skip(offset).limit(limit);

export const countProjectsService = () => Project.countDocuments();

export const findByIdProjectService = (id) => Project.findById(id).populate('user');

export const updateProjectService = (id, title, description, technologies, link, image) => Project.findOneAndUpdate(
    { _id: id },
    { title, description, technologies, link, image },
    { rawResult: true }
);

export const deleteProjectService = (id) => Project.findByIdAndDelete({ _id: id });

export const likeProjectService = async (idProject, userId) => Project.findOneAndUpdate(
    { _id: idProject, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } }
);

export const unlikeProjectService = async (idProject, userId) => Project.findOneAndUpdate(
    { _id: idProject },
    { $pull: { likes: { userId } } }
);
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

export const addCommentProjectService = async (idProject, userId, comment) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);
    return Project.findOneAndUpdate(
        { _id: idProject },
        { $push: { comments: { idComment, userId, comment, createdAt: new Date() } } }
    );
}

export const delCommentProjectService = async (idProject, idComment, userId) => Project.findOneAndUpdate(
    { _id: idProject },
    { $pull: { comments: { idComment, userId } } });
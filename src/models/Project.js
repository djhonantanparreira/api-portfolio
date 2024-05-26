import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    text: {
        type: String,
        required: [true, "Text is required"]
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
    title: {},
    description: {},
    technologies: {},
    link: {},
    image: {},
    likes: {},
    comments: [commentSchema]
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
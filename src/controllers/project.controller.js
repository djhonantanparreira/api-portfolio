import { createProjectService, findAllProjectsService, countProjectsService, findByIdProjectService, updateProjectService, deleteProjectService } from '../services/project.service.js';

export const createProject = async (req, res) => {
    try {
        const { title, description, technologies, link, image } = req.body;

        if (!title || !description || !technologies || !image) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const project = await createProjectService({
            title,
            description,
            technologies,
            link,
            image,
            user: req.userId
        })

        if (!project) {
            return res.status(500).json({ message: 'Error creating project' });
        }

        res.status(201).json({
            message: 'Project created successfully',
            project
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const findAllProjects = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 10;
        }

        if (!offset) {
            offset = 0;
        }

        const projects = await findAllProjectsService(offset, limit);
        const total = await countProjectsService();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl =
            next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl =
            previous != null
                ? `${currentUrl}?limit=${limit}&offset=${previous}`
                : null;

        if (!projects) {
            return res.status(404).json({ message: 'Projects not found' });
        }

        res.status(200).json({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: projects.map((project) => ({
                id: project.id,
                title: project.title,
                description: project.description,
                technologies: project.technologies,
                link: project.link,
                image: project.image,
                user: project.user
            }))
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const findByIdProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await findByIdProjectService(id);

        return res.send({
            project: {
                id: project.id,
                title: project.title,
                description: project.description,
                technologies: project.technologies,
                link: project.link,
                image: project.image
            }
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, technologies, link, image } = req.body;

        if (!title && !description && !technologies && !link && !image) {
            return res.status(400).json({ message: 'Submit at least one field to update' });
        }

        const project = await findByIdProjectService(id);

        if (String(project.user._id) !== req.userId) {
            return res.status(403).json({ message: 'You are not allowed to update this project' });
        }

        await updateProjectService(id, title, description, technologies, link, image);

        return res.send({ message: 'Project updated!' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await findByIdProjectService(id);

        if (String(project.user._id) !== req.userId) {
            return res.status(403).json({ message: 'You are not allowed to delete this project' });
        }

        await deleteProjectService(id);

        return res.send({ message: 'Project deleted!' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
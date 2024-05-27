import { createProjectService, findAllProjectsService, countProjectsService, findByIdService } from '../services/project.service.js';

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

        const next = offset + limit;
        const nextUrl = next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null;

        const prev = offset - limit < 0 ? null : offset - limit;
        const prevUrl = prev !== null ? `${currentURL}?limit=${limit}&offset=${prev}` : null;

        if (!projects) {
            return res.status(404).json({ message: 'Projects not found' });
        }

        res.status(200).json({
            nextUrl,
            prevUrl,
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

export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await findByIdService(id);

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
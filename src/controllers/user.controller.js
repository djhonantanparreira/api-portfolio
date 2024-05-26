import { createService, findAllService, findByIdService, updateService } from '../services/user.service.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        // Create new user
        const user = await createService(req.body);

        // Check if user was created
        if (!user) {
            return res.status(400).json({ message: 'Error creating user' });
        }

        // Response if user successfully registered
        res.status(201).json({
            message: 'User registered successfully',
            user: { name, email }
        });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export const findAll = async (req, res) => {
    try {
        const users = await findAllService();

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).send({
            message: 'Users found successfully',
            users
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const findById = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).send({
            message: 'User found successfully',
            user
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const { id, user } = req;

        await updateService(id, name, email, password);

        res.status(200).send({
            message: 'User updated'
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
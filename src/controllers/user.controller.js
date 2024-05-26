export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
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
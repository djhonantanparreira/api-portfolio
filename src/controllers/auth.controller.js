import bcrypt from "bcrypt";
import { loginService, generateTokens } from "../services/auth.service.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginService(email);

        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const passwordIsValid = bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const token = generateTokens(user.id);

        res.send({ token })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
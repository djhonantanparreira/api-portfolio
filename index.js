import express from 'express';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';

import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';

dotenv.config();

const app = express();

connectDatabase();
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);
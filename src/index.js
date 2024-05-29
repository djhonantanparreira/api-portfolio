import express from 'express';
import connectDatabase from './database/db.js';
import dotenv from 'dotenv';

import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import projectRoute from './routes/project.route.js';
import swaggerRoute from './routes/swagger.route.js';

dotenv.config();

const app = express();

connectDatabase();
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/docs', swaggerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);
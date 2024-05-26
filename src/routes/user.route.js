import { Router } from 'express';
const router = Router();

import { register, findAll } from '../controllers/user.controller.js';

router.post('/register', register);
router.get('/', findAll);

export default router;
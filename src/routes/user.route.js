import { Router } from 'express';
const router = Router();

import { register, findAll, findById } from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';

router.post('/register', register);
router.get('/', findAll);
router.get('/:id', validId, validUser, findById);


export default router;
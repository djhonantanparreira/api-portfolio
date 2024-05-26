import { Router } from 'express';
const router = Router();

import { register, findAll, findById, update } from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';

router.post('/register', register);
router.get('/', findAll);
router.get('/:id', validId, validUser, findById);
router.patch('/:id', validId, validUser, update);

export default router;
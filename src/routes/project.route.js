import { Router } from "express";
const router = Router();

import { createProject, findAllProjects, findById } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/admin.middlewares.js";

router.post("/", authMiddleware, isAdmin, createProject);
router.get("/", findAllProjects);
router.get("/:id", authMiddleware, findById);

export default router;
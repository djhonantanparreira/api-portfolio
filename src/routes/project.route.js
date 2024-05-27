import { Router } from "express";
const router = Router();

import { createProject, findAllProjects, findByIdProject, updateProject } from "../controllers/project.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/admin.middlewares.js";

router.post("/", authMiddleware, isAdmin, createProject);
router.get("/", findAllProjects);
router.get("/:id", authMiddleware, findByIdProject);
router.patch("/:id", authMiddleware, isAdmin, updateProject);

export default router;